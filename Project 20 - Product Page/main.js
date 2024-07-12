// Cart 
const cartIcon = document.querySelector('.checkout');
const cart = document.querySelector('.cart');
const cartMessage = document.querySelector('.cart-message')
const cartBody = document.querySelector('.item-container')
const cartRemoveIcon = document.querySelector('#remove-btn')
const cartPrice = document.querySelector('.cart .product-price')

// Side menu
const mainMenu = document.querySelector('.menu')
const openMenu = document.querySelector('.mobile-menu')
const closeMenu = document.querySelector('.menu .close')

// Price & add to cart
const price = document.querySelector('.price')
const addProductBtn = document.querySelector('#add')
const removeProductBtn = document.querySelector('#min')
const productCounterDOM = document.querySelector('#product-counter')
const addToCartBtn = document.querySelector('#add-to-cart')


// slider
const mainImage = document.querySelector('.bigg-image img')
const thumbnails = Array.from(document.querySelectorAll('.thumbnails .containe'))

// init values
let productPrice = 125;
let productCounter = 0;
let sliderCounter = 0;
addToCart()

// Event Listeners
openMenu.addEventListener('click', ()=> {
    if(!mainMenu.classList.contains('active')) {
        mainMenu.classList.add('active')
    }
})

closeMenu.addEventListener('click', ()=> {
    if(mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active')
    }
})
cartIcon.addEventListener('click', ()=> {
    if(cart.classList.contains('hide')) {
        cart.classList.remove('hide')
    }else {
        cart.classList.add('hide')
    }
})
addToCartBtn.addEventListener('click', ()=> {
    if(productCounter != 0) {
        cart.classList.remove('hide')
    }
})
addProductBtn.addEventListener('click', addProduct)
removeProductBtn.addEventListener('click', removeProduct)
cartRemoveIcon.addEventListener('click', deleteProduct)
mainImage.addEventListener('click', ()=> {
    if(window.innerWidth > 375) {
        modalSlider()
    }
})

// add to cart function
function addToCart() {
    productCounterDOM.innerHTML = productCounter

    if(productCounter === 0) {
        cartMessage.classList.remove('hide')
        cartIcon.classList.remove('active')
        cartBody.classList.add('hide')
    }else {
        let total = productCounter * productPrice
        cartMessage.classList.add('hide')
        cartBody.classList.remove('hide')
        cartIcon.classList.add('active')
        cartIcon.style.setProperty('--content', `"${productCounter}"`)
        cartPrice.innerHTML = `$${productPrice.toFixed(2)} x ${productCounter}  <b class="total">$${total.toFixed(2)}</b>`
    }
}

function addProduct() {
    productCounter++
    addToCart()
}
function removeProduct() {
    
    if(productCounter > 0) {
        productCounter--
        addToCart()
    }
}

function deleteProduct() {
    productCounter = 0
    addToCart()
}

// slider part
function slider(mainImageElement, thumbnailsContainer) {
    const thumbnails = thumbnailsContainer.querySelectorAll('img')
    
    thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.remove('active')
        
        thumbnail.addEventListener('click', ()=> {
            mainImageElement.src = thumbnail.src.replace('-thumbnail', '')
            thumbnails.forEach(thumb => thumb.classList.remove('active'))
            thumbnail.classList.add('active');
            sliderCounter = i
        })
    })

    thumbnails[sliderCounter].classList.add('active')
}
thumbnails.forEach(thumbnail => { 
    thumbnail.addEventListener('click', ()=> slider(mainImage, document.querySelector('.thumbnails')))
})


function modalSlider() {
    const mainModalBox = document.createElement('div')
    mainModalBox.className = 'overlay';

    const closeBtn = document.createElement('div')
    closeBtn.className = 'close-modal'
    closeBtn.innerHTML = `<svg class="close-modal-icon" width="14" height="15"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#fff" fill-rule="evenodd"/>
                        </svg>`

    const arrows = document.createElement('div')
    arrows.className = 'arrows'
    const rightArrorw = document.createElement('div')
    rightArrorw.className = 'right'
    rightArrorw.innerHTML = `<svg width="12" height="18"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/>
                            </svg>`

    const leftArrorw = document.createElement('div')
    leftArrorw.className = 'left'
    leftArrorw.innerHTML = `<svg width="13" height="18"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/>
                            </svg>`

    const mainImageModalContainer = document.createElement('div')
    mainImageModalContainer.className = 'bigg-image'
    const mainImageModal = document.createElement('img')
    mainImageModal.src = 'images/image-product-1.jpg'

    arrows.appendChild(rightArrorw)
    arrows.appendChild(leftArrorw)

    const thumbnailsContainer = document.createElement('div')
    thumbnailsContainer.className = 'thumbnails'
    for(i = 1; i <= 4; i++) {
        const thumbnailImage = document.createElement('img')
        thumbnailImage.className = 'containe'
        thumbnailImage.src = `images/image-product-${i}-thumbnail.jpg`

        thumbnailsContainer.appendChild(thumbnailImage)
    }
    
    mainImageModalContainer.appendChild(arrows)
    mainImageModalContainer.appendChild(mainImageModal)
    mainModalBox.appendChild(closeBtn)
    mainModalBox.appendChild(mainImageModalContainer)
    mainModalBox.appendChild(thumbnailsContainer)
    document.body.appendChild(mainModalBox);

    slider(mainImageModal, thumbnailsContainer)

    leftArrorw.addEventListener('click', ()=> {
        sliderCounter = (sliderCounter + 1) % thumbnailsContainer.children.length
        mainImageModal.src = thumbnailsContainer.children[sliderCounter].src.replace('-thumbnail', '')
        updateActiveThumbnail(thumbnailsContainer, sliderCounter)
    })

    rightArrorw.addEventListener('click', ()=> {
        sliderCounter = (sliderCounter - 1 + thumbnailsContainer.children.length) % thumbnailsContainer.children.length
        mainImageModal.src = thumbnailsContainer.children[sliderCounter].src.replace('-thumbnail', '')
        updateActiveThumbnail(thumbnailsContainer, sliderCounter)
    })

    document.addEventListener('click', (e)=> {
        if(e.target == mainModalBox) {
            console.log(e.target)
            document.body.removeChild(mainModalBox)
        }

        if(e.target.classList.contains('close-modal-icon')) {
            console.log('this is close btn ICON')
            document.body.removeChild(mainModalBox)
        }
    })
}

function updateActiveThumbnail(container, i) {
    const thumbnails = container.querySelectorAll('img');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnails[i].classList.add('active')
}

slider(mainImage, document.querySelector('.thumbnails'))