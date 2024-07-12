const counter = document.querySelector('.counter');
const allAsRead = document.querySelector('#all-read')

let allNotifications = [...document.querySelectorAll('.notification')];
let notReadNotifications = [...document.querySelectorAll('.read')];

function counterEl() {
    let notifications = [...document.querySelectorAll('.new')];
    counter.innerHTML = notifications.length;
}

allNotifications.forEach(el => {
    el.addEventListener('click', ()=> {
    if(el.classList.contains('read')) {
            el.classList.remove('read');
            el.classList.add('new')
        }else {
            el.classList.remove('new');
            el.classList.add('read')
        }
        counterEl();
    })
})

allAsRead.addEventListener('click', ()=> {
    allNotifications.forEach(el => {
        el.classList.remove('new');
    })
    counterEl();
})