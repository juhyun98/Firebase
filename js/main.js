// Firebase 프로젝트 연동에 필요한 정보 초기화
const firebaseConfig = {
    apiKey: "AIzaSyAyQeiK1LZur5c8p6yjivtUDSiPvBPEfDI",
    authDomain: "test-1-9b171.firebaseapp.com",
    projectId: "test-1-9b171",
    storageBucket: "test-1-9b171.firebasestorage.app",
    messagingSenderId: "981678553236",
    appId: "1:981678553236:web:c6ac95debf59a84ab91c81",
    measurementId: "G-JD985DBP7F",
    databaseURL: "https://test-1-9b171-default-rtdb.firebaseio.com"
};

// Firebase 객체 생성 (Initialize Firebase)
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// Firebase Auth 객체 생성
const auth = firebase.auth();
const database = firebase.database(); // 실시간 데이터베이스 객체 생성

/* 
    [Auth - 기능 정의]
    1. 로그인/회원가입 버튼 클릭 시, login.html 로 이동한다.
    2. 로그인이 성공했을 때, 로그인섹션은 숨김처리하고 CRUD섹션을 보여준다.
    3. 로그인 상태를 확인하고 이메일 계정을 출력한다.

    [Realtime Database - 기능 정의]
    1. 사용자가 키, 값을 입력한 후 버튼을 누른다.
    2. 누른 버튼에 따라 데이터베이스에 추가/조회/수정/삭제 기능이 동작한다.
    3. 어떤 버튼을 누르더라도 '데이터 목록'에 실시간 출력을 한다.

*/


// DOM 요소 참조
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginSectionEl = document.getElementById("loginSection");
const crudSectionEl = document.getElementById("crudSection");

const userEmailEl = document.getElementById("userEmail");
const keyEl = document.getElementById("key");
const valueEl = document.getElementById("value");

const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const itemEl = document.getElementById("items");


/* ---------------------------------------------------------------- */

// 데이터 저장 기능 구현
const createItem = () => {
    // 1. 사용자가 입력한 키, 값 가져오기
    // trim(): 텍스트의 양쪽 공백을 없애주는 함수
    let key = keyEl.value.trim();
    let value = valueEl.value.trim();

    console.log(key, value);

    // 2. 실시간 데이터베이스에 데이터 저장하기 ( ref(), set() 함수 활용)
    if (key) { // key 값이 있는 경우
        database.ref("items/"+key).set({test:value, createAt: Date.now()});
    } else {
        alert("key값을 입력해주세요!")
        return;
    }

    // 3. 입력 요소 초기화하기
    keyEl.value = "";
    valueEl.value = "";

}

// 데이터 조회하는 기능 구현
const readItem = () => {
    // 데이터 조회에 필요한 값은?
    database.ref("items").on("value", (snapshot) => {
        // console.log(snapshot.val().msg);

        let resultHTML = "";

        snapshot.forEach((child) => {
            console.log("Key값:", child.Key, "Value값:", child.val());
            resultHTML += `
              <li>Key: ${child.key} | Value: ${child.val().test} | CreateAt: ${child.val().createAt}</li>
            `;
        });

        itemEl.innerHTML = resultHTML;

    });
}

// 데이터 수정 기능 구현
const updateItem = () => {

    // 1. 수정할 데이터와 키값 가져오기
    let key = keyEl.value.trim();
    let value = valueEl.value.trim();

    // 2. 데이터 수정하기 ( ref(), update() )
    database.ref("items/"+key).update();

    // 3. 입력 요소 초기화

}





createBtn.addEventListener("click", createItem);
readBtn.addEventListener("click", readItem);
updateBtn.addEventListener("click", updateItem);



// Firebase 인증 상태 변화를 감지하는 함수
auth.onAuthStateChanged((user) => {
  if (user) {
    // 로그인 상태일 때
    loginSectionEl.style.display = "none";
    crudSectionEl.style.display = "block";
    userEmailEl.innerText = user.email;

  } else {
    // 로그아웃 상태일 때

  }
});


loginBtn.addEventListener("click", () => {

    // location : 브라우저의 주소 관련된 정보를 가지고 있는 객체
    // href속성 : 현재 브라우저의 주소값 반환. 
    //            다른 URL로 초기화할 경우 -> 페이지 이동
    location.href = "login.html";
})

logoutBtn.addEventListener("click", () => {
    auth.signOut();
    location.href = location.href;
});