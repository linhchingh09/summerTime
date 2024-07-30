
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000);
}


let iconCart = document.querySelectorAll('.shopping i');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.flightChild');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.quantity');
let products = [];
let cart = [];
let anItem = [
  {
    "id": 1,
    "img":"./img/hoianvnam.png ",
    "title":"Đà Nẵng - 4N3Đ"
    },
    {
    "id": 6,
    "img":"./img/england.jpg ",
    "title":"London - 7N6Đ"
    },
    {
    "id": 9,
    "img":"./img/sanitaly.jpg ",
    "title":"San Fruttuoso - 5N4Đ"
    },
    {
      "id": 4,
      "img":"./img/qlchina.jpg ",
      "title":"Quế Lâm - 6N5Đ"
    },
    {
      "id": 5,
      "img":"./img/dalatvietnam.jpg ",
      "title":"Đà Lạt - 3N2Đ"
    },
    {
      "id": 2,
      "img":"./img/tggchina.jpg ",
      "title":"Trương Gia Giới - 6N5Đ"
    },
    {
      "id": 7,
      "img":"./img/cornwalluk.jpg ",
      "title":"Cornwall - 5N4Đ"
    },
    {
      "id": 8,
      "img":"./img/biarritzfrance.jpg ",
      "title":"Biarritz - 6N5Đ"
    },
    {
      "id": 3,
      "img":"./img/cinqueterreitaly.jpg ",
      "title":"Cinque Terre - 7N6Đ"
    }
];

// Chuyển đổi hiển thị giỏ hàng
iconCart.forEach(icon => {
  icon.addEventListener('click', () => body.classList.toggle('purchase'));
});

closeCart.addEventListener('click', () => body.classList.remove('purchase'));



const addDataToHTML = () => {
  listProductHTML.innerHTML = ''; 

  if (products.length > 0) { 
    products.forEach(product => {
      let newItem = document.createElement('div');
      newItem.classList.add('item'); 
      let anItemMatch = anItem.find(item => item.id == product.id);
      if (anItemMatch) {
        newItem.dataset.id = anItemMatch.id;
        newItem.innerHTML =`<div class="appear">
                            <img src="${anItemMatch.img}" alt="">
                            <div class="overlay5"></div>
                            <h4 >${anItemMatch.title}</h4>
                            </div>`;
      }
      
      let hiddenDiv = document.createElement('div');
      hiddenDiv.dataset.id = product.id;
      hiddenDiv.classList.add('hidden'); 
      hiddenDiv.innerHTML = `
        <h5>${product.name}</h5>
        <a href="">${product.country}</a>
        <p>${product.attribute}</p>
        <h6 class="price" style="text-align: center;">$${product.price}</h6>
        <button class="addCart">Add to Cart</button>`;
      
      newItem.appendChild(hiddenDiv); 
      
      listProductHTML.appendChild(newItem); 
    });
  }
};

listProductHTML.addEventListener('click', event => {
  if (event.target.classList.contains('addCart')) {
    let id_product = event.target.parentElement.dataset.id;
    addToCart(id_product);
  }
});

const addToCart = product_id => {
  let positionThisProductInCart = cart.findIndex(item => item.product_id == product_id);
  if (positionThisProductInCart === -1) {
    cart.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    cart[positionThisProductInCart].quantity++;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity += item.quantity;
      let newItem = document.createElement('div');
      newItem.classList.add('cartItem');
      newItem.dataset.id = item.product_id;
      let positionProduct = products.findIndex(product => product.id == item.product_id);
      if (positionProduct !== -1) {
        let info = products[positionProduct];
        newItem.innerHTML = `
          <div class="name" style="padding-left:30px ;">${info.name}</div>
          <div class="price">$${info.price * item.quantity}</div>
          <div class="number">
            <span class="minus"><</span>
            <span>${item.quantity}</span>
            <span class="plus">></span>
          </div>`;
        listCartHTML.appendChild(newItem);
      }
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', event => {
  if (event.target.classList.contains('minus') || event.target.classList.contains('plus')) {
    let product_id = event.target.closest('.cartItem').dataset.id;
    let type = event.target.classList.contains('plus') ? 'plus' : 'minus';
    changeQuantityCart(product_id, type);
  }
});

const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(item => item.product_id == product_id);
  if (positionItemInCart >= 0) {
    let item = cart[positionItemInCart];
    if (type === 'plus') {
      item.quantity++;
    } else {
      item.quantity--;
      if (item.quantity <= 0) {
        cart.splice(positionItemInCart, 1);
      }
    }
    addCartToHTML();
    addCartToMemory();
  }
};

const initApp = () => {
  fetch('./json/booking.json')
  .then(response => response.json())
  .then(data => {
      products = data;
      addDataToHTML();

      if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart'));
          addCartToHTML();
      }
  })

}

initApp();



