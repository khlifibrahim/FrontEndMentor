const days = document.querySelector('.days p');
const hours = document.querySelector('.hours p');
const min = document.querySelector('.min p');
const sec = document.querySelector('.sec p');

// console.log(days, hours, min, sec)

let dateCounter = new Date("Oct 31, 2023 23:59:59").getTime();
// console.log(timeNow)

let counter = setInterval(() => {
    
    let timeNow = new Date().getTime()
    
    let counterDown = dateCounter - timeNow;
    
    let daysCountDown = Math.floor(counterDown / (1000 * 60 * 60 * 24));
    days.innerHTML = daysCountDown;
    
    let hoursCountDown = Math.floor(counterDown % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    hours.innerHTML = hoursCountDown < 10 ? `0${hoursCountDown}` : hoursCountDown;
    
    let minCountDown = Math.floor(counterDown % (1000 * 60 * 60) / (1000 * 60));
    min.innerHTML = minCountDown < 10 ? `0${minCountDown}` : minCountDown;
    
    let secCountDown = Math.floor(counterDown % (1000 * 60) / (1000));
    sec.innerHTML = secCountDown < 10 ? `0${secCountDown}` : secCountDown;

}, 1000);