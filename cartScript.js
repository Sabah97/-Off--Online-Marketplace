let products = [];
var count = 0;
var modalCount = 0;

if (window.localStorage.getItem('count')) {
  modalCount = JSON.parse(window.localStorage.getItem('count'));
}

if (window.localStorage.getItem('row')) {
  products = JSON.parse(window.localStorage.getItem('row'));
}

if (products.length != 0) {
  products.forEach(element => {
    let product = $(' <div class="col-lg-4 col-sm-6">\
        <a data-target="#modal-' + modalCount + ' " data-toggle="modal">\
        <div class= "shop-item">\
        <div class="thumbnail">\
        <img class="img-item" src=' + element.url + ' style="width:100%" >\
        </a>\
        <div class="card">\
        <span class="Item-Title">' + element.name + '</span>\
        <h2>' + element.description + '</h2>\
      <span class="price-item">' + element.price + '</span>\
        <span>High quality fabric</span>\
     <span><button  class=" btn shop-item-button " type="button">Add to Cart <i class="fas fa-shopping-cart"></i></button></span>\
        </div>\
    </div>\
    </div>\
  </div>');

    $('#list').append(product);

    let product2 = $('<div class="modal" id="modal-' + modalCount + '">\
      < div class= "modal-dialog view-modal-dialog modal-sm" >\
      <div class="modal-content view-modal-content">\
        <div class="modal-header">\
          <div class="row">\
            <h3 class="modal-title ml-3 pr-4">' + element.name + '</h3>\
          </div>\
          <button class="close" data-dismiss="modal">&times;</button>\
        </div>\
        <div class="modal-body">\
          <div class="row">\
            <div class="col-5">\
              <img class="modal-img img-fluid" src="' + element.url + '" alt="" />\
            </div>\
            <div class="col-7">\
              <div class="col">\
                <p class="modal-description lead"> ' + element.description + '</p>\
                <p>In Stock</p>\
              </div>\
              <div class="col">\
                <p>Price: ' + element.price + '</p>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="modal-footer">\
          <button class="btn btn-secondary" data-dismiss="modal">Close</button>\
        </div>\
      </div>\
      </div >\
    </div >');

    $('#modal-description').append(product2);
    modalCount++;
  });
}
if (window.localStorage.getItem('count')) {
  modalCount = JSON.parse(window.localStorage.getItem('count'));
}

$(document).on('click', '#add', function() {
  var name = $('#name').val();
  var description = $('#description').val();
  var url = $('#url').val();
  var quantity = $('#quantity').val();
  var price = $('#price').val();
  if (name && description && url && quantity && price) {
    let product = $(' <div class="col-lg-4 col-sm-6">\
        <a data-target="#modal-' + modalCount + ' " data-toggle="modal">\
        <div class= "shop-item">\
        <div class="thumbnail">\
        <img class="img-item" src=' + url + ' style="width:100%" >\
        </a>\
        <div class="card">\
        <span class="Item-Title">' + name + '</span>\
        <h2>' + description + '</h2>\
      <span class="price-item">' + price + '</span>\
        <span>High quality fabric</span>\
     <span><button  class=" btn shop-item-button " type="button">Add to Cart <i class="fas fa-shopping-cart"></i></button></span>\
        </div>\
    </div>\
    </div>\
  </div>');

    $('#list').append(product);

    products.push({ name: name, description: description, url: url, quantity: quantity, price: price });
    window.localStorage.setItem('row', JSON.stringify(products));

    $('#form')[0].reset();

    let product2 = $('<div class="modal" id="modal-' + modalCount + '">\
      < div class= "modal-dialog view-modal-dialog modal-sm" >\
      <div class="modal-content view-modal-content">\
        <div class="modal-header">\
          <div class="row">\
            <h3 class="modal-title ml-3 pr-4">' + name + '</h3>\
          </div>\
          <button class="close" data-dismiss="modal">&times;</button>\
        </div>\
        <div class="modal-body">\
          <div class="row">\
            <div class="col-5">\
              <img class="modal-img img-fluid" src="' + url + '" alt="" />\
            </div>\
            <div class="col-7">\
              <div class="col">\
                <p class="modal-description lead"> ' + description + '</p>\
                <p>In Stock</p>\
              </div>\
              <div class="col">\
                <p>Price: $' + price + '</p>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="modal-footer">\
          <button class="btn btn-secondary" data-dismiss="modal">Close</button>\
        </div>\
      </div>\
      </div >\
    </div >');

    $('#modal-description').append(product2);

    location.reload();

    modalCount++;
    window.localStorage.setItem('count', JSON.stringify(modalCount));
  } else {
    alert('Fields Empty!!');
    console.log('Fields Empty!!');
  }
});

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  // TO REMOVE ITEMS from cart
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input = addEventListener('change', quantityChanged);
  }
  var AddToCartButtons = document.getElementsByClassName('shop-item-button');
  for (var i = 0; i < AddToCartButtons.length; i++) {
    var button = AddToCartButtons[i];
    button.addEventListener('click', AddToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

// PUCHASE BUTTON

function purchaseClicked() {
  alert('Happy Shopping!');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  count--;
  $('#counter').attr('data-count', count);
}
// TO REMOVE ITEMS from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  count--;
  $('#counter').attr('data-count', count);
}
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function AddToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var imageParent = shopItem.parentElement;
  var title = shopItem.getElementsByClassName('Item-Title')[0].innerText;
  var price = shopItem.getElementsByClassName('price-item')[0].innerText;
  var imageSrc = imageParent.getElementsByClassName('img-item')[0].src;

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
  count++;
  $('#counter').attr('data-count', count);
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');

  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('You have already added this item!! Increase the quantity if you want more !');
      return;
    }
  }
  var cartRowContents = `
                    <div class="cart-item cart-column">
                     <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
                    <span class="cart-item-title">${title}</span>

                        </div>
                        <span class="cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input"  type="number" value="1">
                            <button class="btn btn-danger" type="button"> Remove </button>

                        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

//  UPDATE CART TOTAL

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ' '));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
