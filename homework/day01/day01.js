const alertContent1 = "회원가입을 축하합니다.\n";
const date = new Date();
const getYear = date.getFullYear();
const getMonth = date.getMonth() + 1;
const getDate = date.getDate();
const signUpDate = "(가입일시:"+getYear+"-"+getMonth+"-"+getDate+")";

function addNewStudent() {
    const studentList = document.getElementById("student_list");
    document.getElementsByClassName("sign_box")[0].innerHTML = "";

    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const pw = document.getElementById("inputPw").value;
    const phoneNumber = document.getElementById("inputPhone").value;
    const sex = document.querySelector("input[name='sexRadio']:checked").value;
    const introduce = document.getElementById("introduce_textarea").value;
    const isCheck = document.getElementById("동의하기체크").value;
    const encryptionPw = "*".repeat(pw.length);
    const parts = phoneNumber.split("-");
    parts[1] = "*".repeat(4);
    const encryptionPhoneNumber = `${parts[0]}-${parts[1]}-${parts[2]}`;
    const student = {
        이름: name,
        이메일: email,
        비밀번호: encryptionPw,
        성별: sex,
        전화번호: encryptionPhoneNumber,
        동의여부: isCheck,
        자기소개: introduce,
        가입날짜: signUpDate
    };

    const newSignBox = document.createElement("div");
    newSignBox.id= "new_sign_box";
    newSignBox.innerHTML = `
    <div class="new_studentList">
        <div class="new_student_box"
            data-이름 = ${student.이름}
            data-이메일 = ${student.이메일}
            data-비밀번호 = ${student.비밀번호}
            data-성별 = ${student.성별}
            data-전화번호 = ${student.전화번호}
            data-동의여부 = ${student.동의여부}
            data-자기소개 = ${student.자기소개}
            data-가입일시 = ${student.가입날짜}
            onclick="selectStudent(this)"
        >
            <img src="./img/프로필 이미지_B.png" alt="">
            <div class="student_name">${student.이름}</div>
        </div>
    </div>
    `;
    studentList.appendChild(newSignBox);
}

//학생맴버 선택 시 해당 학생정보 alert로 나타내는 함수
function selectStudent(element){
    const studentInfo = element.dataset;
    console.log(studentInfo);
    alert(`이름: ${studentInfo.이름}
이메일: ${studentInfo.이메일}
비밀번호: ${studentInfo.비밀번호}
성별: ${studentInfo.성별}
전화번호: ${studentInfo.전화번호}
동의여부: ${studentInfo.동의여부}
자기소개: ${studentInfo.자기소개}
${studentInfo.가입일시}
`);
}

function certified() {
    const randomNumber = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    document.getElementById("랜덤번호").innerText = randomNumber;

    let restTime = 10;
    const newTimerBox = document.createElement("div");
    newTimerBox.id = "newTimerBox";
    document.body.appendChild(newTimerBox);

    document.getElementById("certified_button_box").prepend(newTimerBox);
    document.getElementById("인증하기버튼").style = "background-color: #491449";
    let timer = setInterval(function() {
        let minutes = Math.floor(restTime / 60);
        let seconds = String(restTime % 60).padStart(2, "0");
        document.getElementById("newTimerBox").innerText = `${minutes}:${seconds}`;
        restTime--;

        if (restTime < 0) {
            clearInterval(timer);
            document.getElementById("인증하기버튼").disabled = true;
            document.getElementById("인증하기버튼").style = "background-color: #c7c7c7";
            newTimerBox.style.color = "#D5BCE4";
        }
    }, 1000);
}

function validateEmail(email) {
    const allowedEmails = ["naver.com", "gmail.com", "hanmail.net", "kakao.com"];
    const emailParts = email.split('@');
    return emailParts.length === 2 && allowedEmails.includes(emailParts[1]);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function formInvalid() {
    const signButton = document.getElementById("sign_button");

    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const pw = document.getElementById("inputPw").value;
    const checkPw = document.getElementById("inputCheckPw").value;
    const phoneNumber = document.getElementById("inputPhone").value;
    const sex = document.querySelector("input[name='sexRadio']:checked");
    const introduce = document.getElementById("introduce_textarea").value;
    const isCheck = document.getElementById("동의하기체크").checked;

    const isName = name !== "";
    const isEmail = validateEmail(email);
    const isPw = pw !== "";
    const isCheckPw = checkPw !== "";
    const isCellPhone = validatePhoneNumber(phoneNumber);
    const isIntroduce = introduce !== "";
    const isRadio = sex !== null;
    const isCheckbox = isCheck;

    document.getElementById("emailError").style.display = isEmail ? "none" : "block";
    document.getElementById("pwError").style.display = isCheckPw ? "none" : "block";
    document.getElementById("phoneError").style.display = isCellPhone ? "none" : "block";

    console.log(isName, isEmail, isPw, isCheckPw, isCellPhone, isIntroduce, isRadio, isCheckbox);

    if (!isName || !isEmail || !isPw || !isCheckPw || !isCellPhone || !isIntroduce || !isRadio || !isCheckbox) {
        signButton.style.backgroundColor = "#c7c7c7";
        signButton.disabled = true;
    } else {
        signButton.style.backgroundColor = "#491449";
        signButton.disabled = false;
        addNewStudent();
        alert(`${alertContent1 + signUpDate}`);
    }
}
