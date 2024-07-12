const container = document.querySelector('.container');
const content = document.querySelectorAll('.containe');
const mail = document.querySelector('input');
const btn = document.querySelector('.form button');
const successMessage = document.querySelector('.Success-Message');
const alertMessage = document.querySelector('.form .alert');
const successBtn = document.querySelector('.Success-Message button');

let mailReg = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

btn.addEventListener('click', ()=> {
    if(mail.value == "" || !mail.value.match(mailReg)) {
        console.log("not matching")
        mail.classList.add('error');
        alertMessage.classList.add('show')
        return false;
    }else {
        content.forEach(div => {
            div.classList.add('hidde');
            
        });
        container.style.cssText = "width:360px;padding:2rem";
        successMessage.classList.add('show');
        successMessage.classList.remove('hidde');
    }
})

successBtn.addEventListener('click', ()=> {
    container.remove()
})