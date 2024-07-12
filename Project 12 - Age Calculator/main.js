const submitBtn = document.querySelector(".submit");
const titles = document.querySelectorAll(".box .title");

const resultYear = document.querySelector("#resultYear p");
const resultMonth = document.querySelector("#resultMonth p");
const resultDay = document.querySelector("#resultDay p");

function myBirthday() {
  const myYear = document.querySelector(".year input").value;
  const myMonth = document.querySelector(".month input").value;
  const myDay = document.querySelector(".day input").value;

  const today = new Date();
  let currentDay = today.getDate();
  let currentMonth = 1 + today.getMonth();
  let currentYear = today.getFullYear();

  const titleDay = document.querySelector(".day");
  const titleMonth = document.querySelector(".month");
  const titleYear = document.querySelector(".year");
  const error = document.querySelector(".error");

  if ((myDay && myMonth && myYear) == "") {
    console.log("empty values");

    error.classList.add("show");
    titleDay.classList.add("errorInput");
    titleMonth.classList.add("errorInput");
    titleYear.classList.add("errorInput");

    return false;
  }

  if (myMonth < 1 && myMonth > 12) {
    const errorMsgMonth = document.querySelector(".month .error");
    console.log(errorMsgMonth);
    errorMsgMonth.innerHTML = "Must be a valid month";
    return false;
  }

  if (myYear > today.getFullYear()) {
    const errorMsg = document.querySelector(".year .error");
    errorMsg.innerHTML = "Must be in the past";
    return false;
  }

  if (myDay < 1 || (myDay > 31 && myMonth < 1) || myMonth > 12) {
    const errorMsgDay = document.querySelector(".day .error");
    const errorMsgMonth = document.querySelector(".month .error");

    titleDay.classList.add("errorInput");
    errorMsgDay.innerHTML = "Must be a valid day";

    titleMonth.classList.add("errorInput");
    errorMsgMonth.innerHTML = "Must be a valid month";
    return false;
  }

  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (myDay > currentDay) {
    currentDay = currentDay + months[currentMonth - 1];
    currentMonth = currentMonth - 1;
  }

  if (myMonth > currentMonth) {
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  let day = currentDay - myDay;
  let month = currentMonth - myMonth;
  let year = currentYear - myYear;

  resultYear.innerHTML = year;
  resultMonth.innerHTML = month;
  resultDay.innerHTML = day;
}

submitBtn.addEventListener("click", myBirthday);
