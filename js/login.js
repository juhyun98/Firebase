// Firebase 프로젝트 연동에 필요한 정보 초기화
const firebaseConfig = {
    apiKey: "AIzaSyAyQeiK1LZur5c8p6yjivtUDSiPvBPEfDI",
    authDomain: "test-1-9b171.firebaseapp.com",
    projectId: "test-1-9b171",
    storageBucket: "test-1-9b171.firebasestorage.app",
    messagingSenderId: "981678553236",
    appId: "1:981678553236:web:c6ac95debf59a84ab91c81",
    measurementId: "G-JD985DBP7F",
    databaseURL: "https://test-1-9b171-default-rtdb.firebaseio.com/"
};

// Firebase 객체 생성 (Initialize Firebase)
const app = firebase.initializeApp(firebaseConfig);

/* 
    [기능정의]
    1. 회원가입 버튼 클릭 시, Firebase Authentication에 저장한다.
    2. 로그인 버튼 클릭 시, 저장된 이메일/비밀번호를 확인한다.
    3. 결과에 따른 처리
     - 성공 시 : "로그인 성공!" 메시지 출력 후 index.html로 이동
     - 실패 시 : "실패 관련 내용" 메시지 출력
*/

// Initialize Firebase Authentication and get a reference to the service
// Firebase Auth 객체 생성
const auth = firebase.auth();


// DOM 요소 참조
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");
const backBtn = document.getElementById("backBtn");
const messageEl = document.getElementById("message");


// 회원가입 기능 구현
const signUp = () => {
    // 이메일, 패스워드 가져오기
    let email = emailEl.value;
    let password = passwordEl.value;

    console.log(email,password);
    
    // 입력값 검증
    if(!email || !password) {
        alert("이메일 또는 비밀번호를 입력해 주세요.")
        return;
    }
    if(password.length < 6) {
        alert("비밀번호를 최소 6자 이상 입력해주세요!")
        return;
    }

    // Firebase에 계정생성하기
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showMessage("회원가입 성공! 로그인 해주세요!", "success");
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(errorCode, errorMessage);

            showMessage(errorMessage, "error");
        });
}


// 로그인 기능 구현
const login = () => {
    // 이메일, 패스워드 가져오기
    let email = emailEl.value;
    let password = passwordEl.value;

    // Firebase 사용자 로그인
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            showMessage("로그인 성공!", "success");

            setTimeout(() => {
                location.href = "index.html";
            }, 1500);

        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(errorCode, errorMessage);
            showMessage(errorMessage, "error");
        });

}


// 메인으로 돌아가기
const goBack = () => {
    location.href = "index.html";
}

// 상태 메시지 출력 기능 구현
// msg : 실행 결과 메시지
// type : 성공(success) or 실패(error)
const showMessage = (msg, type) => {
    messageEl.innerText = msg;
    messageEl.classList.remove("success", "error"); // class속성값 초기화
    messageEl.classList.add(type);

    // 설정한 시간이 지난 후 실행하는 함수
    setTimeout(() => {
        messageEl.classList.remove(type);
    }, 3000);

}


// 회원가입 버튼에 클릭 이벤트
signUpBtn.addEventListener("click", signUp);
// 로그인 버튼 클릭 이벤트
loginBtn.addEventListener("click", login);
// 메인으로 버튼 클릭 이벤트
backBtn.addEventListener("click", goBack);

