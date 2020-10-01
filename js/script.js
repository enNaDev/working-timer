let workMinutes = document.querySelector("#workMinutes");
let breakMinutes = document.querySelector("#breakMinutes");
let buttons = document.querySelectorAll(".time__box-button");
let clockTime = document.querySelector(".clock-time");
let playBtn = document.querySelector(".clock__btn__play");
let pauseBtn = document.querySelector(".clock__btn__pause");
let resetBtn = document.querySelector(".clock__btn__reset");
let clockSession = document.querySelector(".clock-session");
let displaySessionsCount = document.querySelector(".clock-session__count");
let countTime;
let notification;
let sessionsCountWork = 1;
let sessionsCountBreak = 0;
let workSession = 25;
let breakSession = 5;
let zero = "0";
let seconds = 60;
let minutes = workSession;

// Work and break session settings //
function setTime() {
  let clickedBtn = [].slice.call(buttons);
  clickedBtn.map(function (button) {
    button.addEventListener("click", function (e) {
      let workBtnData = e.target.dataset.workBtn;
      let breakBtnData = e.target.dataset.breakBtn;
      let workMinutesVal = parseInt(workMinutes.textContent);
      let breakMinutesVal = parseInt(breakMinutes.textContent);

      clearInterval(countTime);
      clockSession.innerHTML = "Work";
      seconds = 60;

      // add and substract - work time
      if (workBtnData == "-" && workMinutesVal > 5) {
        workSession = workMinutesVal - 5;
        displayTime(workSession, 0);
        workMinutes.innerHTML = workSession + "m";
      } else if (workBtnData == "+" && workMinutesVal < 60) {
        workSession = workMinutesVal + 5;
        displayTime(workSession, 0);
        workMinutes.innerHTML = workSession + "m";

        // add and substract - break time
      } else if (breakBtnData == "-" && breakMinutesVal > 1) {
        breakSession = breakMinutesVal - 1;
        breakMinutes.innerHTML = breakSession + "m";
      } else if (breakBtnData == "+" && breakMinutesVal < 30) {
        breakSession = breakMinutesVal + 1;
        breakMinutes.innerHTML = breakSession + "m";
      }
    });
  });
}
setTime();

// Display time //
function displayRunningTime(sessionName, min, sec) {
  if (min < 10) {
    min = zero + sessionName;
    clockTime.innerHTML = [min, sec].join(":");
  } else if (sec < 10) {
    sec = zero + seconds;
    clockTime.innerHTML = [min, sec].join(":");
  } else {
    clockTime.innerHTML = [min, sec].join(":");
  }
}

function displayTime(min, sec) {
  if (min < 10) {
    min = zero + min;
    if (sec < 10) {
      sec = zero + sec;
      clockTime.innerHTML = [min, sec].join(":");
    } else {
      clockTime.innerHTML = [min, sec].join(":");
    }
  } else if (sec < 10) {
    sec = zero + sec;
    clockTime.innerHTML = [min, sec].join(":");
  } else {
    clockTime.innerHTML = [min, sec].join(":");
  }
}

// Reset Clock //
function resetClock(min) {
  seconds = 60;
  sessionsCountBreak = 0;
  sessionsCountWork = 4;
  clockSession.innerHTML = "Work";
  if (min < 10) {
    min = zero + min;
    clockTime.innerHTML = [min, "00"].join(":");
  } else {
    clockTime.innerHTML = [min, "00"].join(":");
  }
}

// Clock //
function runClock() {
  countdown();
  displaySessionsCount.innerHTML = "Session " + sessionsCountWork;
}

// Countdown
function countdown() {
  if (minutes == 0 && seconds == 0) {
    // Work session finished
    if (clockSession.textContent == "Work") {
      sessionsCountBreak++;
      breakSession = parseInt(breakMinutes.textContent);
      minutes = breakSession;
      displayRunningTime(breakSession, minutes, seconds);
      clockSession.innerHTML = "Break";
      notification = new Audio("sounds/break_sound.mp3");
      notification.play();
      //Break session finished
    } else if (clockSession.textContent == "Break") {
      sessionsCountWork++;
      workSession = parseInt(workMinutes.textContent);
      minutes = workSession;
      displayRunningTime(workSession, minutes, seconds);
      clockSession.innerHTML = "Work";
      notification = new Audio("sounds/work_sound.mp3");
      notification.play();
    }
  } else if (seconds > 0) {
    seconds--;
    displayTime(minutes, seconds);
    if (minutes > 0) {
      minutes = workSession;
      minutes--;
      displayTime(minutes, seconds);
    }
  } else {
    workSession = minutes;
    seconds = 60;
    seconds--;
    minutes--;
    displayTime(minutes, seconds);
  }
}

// Clock buttons //
// start clock
playBtn.addEventListener("click", function () {
  workSession = parseInt(workMinutes.textContent);
  sessionsCountWork = 1;
  clearInterval(countTime);
  countTime = setInterval(runClock, 1000);
});
// pause clock
pauseBtn.addEventListener("click", function () {
  clearInterval(countTime);
});
// reset clock
resetBtn.addEventListener("click", function () {
  clearInterval(countTime);
  seconds = 60;
  workSession = 25;
  workMinutes.textContent = 25 + "m";
  breakMinutes.textContent = 5 + "m";
  displaySessionsCount.innerHTML = "Session 1";
  displayTime(workSession, 0);
});
