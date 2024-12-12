// 시간 업데이트
function updateTime() {
    const timeElement = document.getElementById("time-display");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {
        const audio = new Audio();
        audio.src = `sounds/${slider.dataset.sound}`;
        audio.loop = true;

        // 슬라이더 값에 따라 오디오 볼륨 변경
        slider.addEventListener("input", () => {
            const volume = parseFloat(slider.value);
            audio.volume = volume;

            if (volume > 0 && audio.paused) {
                audio.play();
            } else if (volume === 0) {
                audio.pause();
            }
        });
    });
});

const timerPopup = document.getElementById("timer-popup");
const startTimerBtn = document.getElementById("start-timer");
const minutesInput = document.getElementById("minutes");
const taskNameInput = document.getElementById("task-name");
const timerDisplay = document.getElementById("timer-display");
const timerContainer = document.getElementById("timer-container");

let timerInterval;
let taskName = "";

// 페이지 로드 시 타이머 팝업 보이기
window.addEventListener("load", () => {
    timerPopup.style.display = "block";
});

// 타이머 시작
startTimerBtn.addEventListener("click", () => {
    const minutes = parseInt(minutesInput.value, 10);
    taskName = taskNameInput.value.trim() || "작업";

    if (!isNaN(minutes) && minutes > 0) {
        startCountdown(minutes * 60);
        timerPopup.style.display = "none";
        timerContainer.style.display = "block";
    }
});

// 카운트다운 시작 함수
function startCountdown(duration) {
    clearInterval(timerInterval);
    let remainingTime = duration;

    updateTimerDisplay(remainingTime);

    timerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert(`${taskName} 타이머가 종료되었습니다!`);
            timerContainer.style.display = "none";
            timerPopup.style.display = "block";
        }
    }, 1000);
}

// 타이머 표시 업데이트 함수
function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${taskName} ${mins}:${secs.toString().padStart(2, "0")}`;
}

// To-Do List 관련 코드
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

// 할 일 추가 버튼 클릭 시
addTodoBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        addTodoItem(todoText);
        todoInput.value = ""; // 입력란 비우기
    }
});

// 할 일 항목 추가 함수
function addTodoItem(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", () => {
        li.remove(); // 할 일 삭제
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}