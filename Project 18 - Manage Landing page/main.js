const mobileMenu = document.querySelector('.humb-menu')
const mobileMenuImage = document.querySelector('.humb-menu img')
const menuList = document.querySelector('.menu')

console.log(mobileMenuImage)

mobileMenu.addEventListener('click', ()=> {
    mobileMenuImage.src = mobileMenuImage.src.includes('hamburger') ? "images/icon-close.svg" : "images/icon-hamburger.svg";

    if(menuList.classList.contains('hide-menu')) {
        console.log("menu is closed")
        menuList.classList.remove('hide-menu')
        menuList.classList.add('show-menu')
    }else {
        menuList.classList.remove('show-menu')
        menuList.classList.add('hide-menu')
    }
})