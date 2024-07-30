
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
let listFlightHTML = document.querySelector('.flightChild');
let listHotelHTML = document.querySelector('.essentialChild');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.quantity');
let flights = [];
let hotels = [];
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

const addFlightsToHTML = () => {
  listFlightHTML.innerHTML = '';

  if (flights.length > 0) {
    flights.forEach(flight => {
      let newItem = document.createElement('div');
      newItem.classList.add('item'); 
      let anItemMatch = anItem.find(item => item.id == flight.id);
      if (anItemMatch) {
        newItem.dataset.id = anItemMatch.id;
        newItem.innerHTML =`<div class="appear">
                            <img src="${anItemMatch.img}" alt="">
                            <div class="overlay5"></div>
                            <h4 >${anItemMatch.title}</h4>
                            </div>`;
      }
      let hiddenDiv = document.createElement('div');
      hiddenDiv.dataset.id = flight.id;
      hiddenDiv.classList.add('hidden'); 
      hiddenDiv.innerHTML = `
        <h5>${flight.name}</h5>
        <a href="">${flight.country}</a>
        <p>${flight.attribute}</p>
        <h6 class="price" style="text-align: center;">$${flight.price}</h6>
        <button class="addCart">Add to Cart</button>`;
      
      newItem.appendChild(hiddenDiv); 
      
      listFlightHTML.appendChild(newItem); // Thay thế 'list' bằng 'listFlightHTML'
    });
  }
}

const addHotelsToHTML = () => {
  listHotelHTML.innerHTML = '';

  if (hotels.length > 0) {
    hotels.forEach(hotel => {
      let newItem = document.createElement('div');
      newItem.classList.add('inside');
      newItem.dataset.id = hotel.id;
      newItem.innerHTML = `
              <img src="${hotel.img}" alt="">
              <div class="content">
              <h4>${hotel.name}</h4>
              <h5>$${hotel.price}</h5>
              <button class="addCart">Add to Cart</button>
              </div>`;
      listHotelHTML.appendChild(newItem);
    });
  }
}

listFlightHTML.addEventListener('click', event => {
  if (event.target.classList.contains('addCart')) {
    let id_product = event.target.parentElement.dataset.id;
    addToCart(id_product);
  }
});

listHotelHTML.addEventListener('click', event => {
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
      let positionProduct = flights.findIndex(product => product.id == item.product_id);
      let info;
      if (positionProduct === -1) {
        positionProduct = hotels.findIndex(product => product.id == item.product_id);
        info = hotels[positionProduct];
      } else {
        info = flights[positionProduct];
      }
      if (info) {
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
      flights = data.flights;
      hotels = data.hotels;
      addFlightsToHTML();
      addHotelsToHTML();

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    });
}

initApp();