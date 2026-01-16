const firebaseConfig = {
    apiKey: "AIzaSyDQzvuDuzU_egZ6Y_2O2vyXOdVCBm-IGWk",
    authDomain: "fir-est-exam0114.firebaseapp.com",
    databaseURL: "https://fir-est-exam0114-default-rtdb.firebaseio.com/",
    projectId: "fir-est-exam0114",
    storageBucket: "fir-est-exam0114.firebasestorage.app",
    messagingSenderId: "541923918626",
    appId: "1:541923918626:web:5a5082276dd67167151b7b",
    measurementId: "G-D9J1KS3CM1"
  };

// firebase객체, storage객체 생성
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// DOM 요소 참조
const fileInputEl = document.getElementById("fileInput"); // 파일 선택
const uploadBtn = document.getElementById("uploadBtn"); // 업로드 버튼
const loadBtn = document.getElementById("loadBtn"); // 조회 버튼
const previewEl = document.getElementById("preview"); // 이미지 출력
const fileread = document.getElementById("filereadBtn");

// 파일 업로드 기능 구현
const uploadImg = () => {
    // 1. 사용자가 선택한 파일 정보 가져오기
    let file = fileInputEl.files[0];

    console.log(file);
    
    // 2. Firebase Storage에 저장할 경로 설정하기
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${file.name}`);

    // 3. 파일 업로드하기
    // - Javascript File 객체 업로드를 지원하고 있음.
    imageRef.put(file)
    .then((snapshot) => {
        console.log("업로드 성공!");
    })
    .catch((error) => {
        console.log("업로드 실패:", error);
    });
}

// 이미지 파일 조회 기능 구현
const loadImg = () => {

    // 1. 조회할 파일(이미지)의 경로 생성
    const imageRef = storage.ref(`images/${fileInputEl.files[0].name}`);

    // 2. 접근경로를 통해서 URL 조회 후 img요소의 src속성에 초기화 -> 웹 페이지에 이미지 출력
    imageRef.getDownloadURL() // storageRef.child('images/stars.jpg').getDownloadURL()
        .then((url) => {
            previewEl.setAttribute('src', url);
        })
        .catch((error) => {
            alert("이미지를 찾을 수 없습니다.")
            console.log(error);
    });
}


const listReadBtn = document.getElementById("listReadBtn");
const fileListEl = document.getElementById("fileList");

//파일 전체 목록 조회
const getFileList = async () => {

    const storageRef = storage.ref("images");

    const res = await storageRef.listAll();

    const promises = res.items.map(item=>
        storage.ref(item.fullPath).getDownloadURL()
        .then(url => ({
            name:item.name,
            path:url
        }))
    );

    const fileList = await Promise.all(promises);

    console.log("파일크기:", fileList.length);

    const resultHTML  = fileList.map(file => 
         `<div style="border-radius:10px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
             <p>파일명:${file.name}</p>
             <img src="${file.path}" style="width:150px; height:150px;" loading="lazy" />
         </div>`
        ).join("");

    fileListEl.innerHTML = resultHTML;

}

listReadBtn.addEventListener("click", getFileList);
uploadBtn.addEventListener("click", uploadImg);
loadBtn.addEventListener("click", loadImg);