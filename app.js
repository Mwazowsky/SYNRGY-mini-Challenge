const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartSubTotal = document.getElementById('cart-subtotal');

const discInfo = document.getElementById("discount-info");

const inputPromoCode = document.getElementById('promo-code');
const submitButton = document.getElementById("submitButton");
const cartTotal = document.getElementById('cart-total');

const checkoutButtonPriceText = document.getElementById("checkout-total");

const cartItems = [];

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

submitButton.addEventListener("click", function () {
  const inputValue = inputPromoCode.value;
  const subtotal = calculateTotal(cartItems);

  let discount_amount = 0;
  let total = subtotal;

  switch (inputValue) {
    case promo[0].label:
      discount_amount = promo[0].value;
      total = subtotal - (subtotal * discount_amount);
      discInfo.textContent = `${discount_amount*100}%`
      cartTotal.textContent = `Rp. ${total}`;
      checkoutButtonPriceText.textContent = `Rp. ${total} - `;
      break;

    case promo[1].label:
      discount_amount = promo[0].value;
      total = subtotal - (subtotal * discount_amount);
      discInfo.textContent = `${discount_amount*100}%`
      cartTotal.textContent = `Rp. ${total}`;
      checkoutButtonPriceText.textContent = `Rp. ${total} - `;
      break;

    case promo[2].label:
      discount_amount = promo[0].value;
      total = subtotal - (subtotal * discount_amount);
      discInfo.textContent = `${discount_amount*100}%`
      cartTotal.textContent = `Rp. ${total}`;
      checkoutButtonPriceText.textContent = `Rp. ${total} - `;
      break;

    default:
      discInfo.textContent = `0%`
      cartTotal.textContent = `Rp. ${total}`;
      checkoutButtonPriceText.textContent = `Rp. ${total} - `;
      
  }
});

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    addToCart(name, price);
  });
});

function addToCart(name, price) {
  cartItems.push({ name, price });
  calculateTotal(cartItems);
  displayCart();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  displayCart();
}

function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  cartItems.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
            <div class="card mb-3">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <div>
                      <img
                        src="https://picsum.photos/200"
                        class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                    </div>
                    <div class="ms-3">
                      <h5>${product.name}</h5>
                      <p class="small mb-0">256GB, Navy Blue</p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <div style="width: 80px;">
                      <h5 class="mb-0">Rp. ${product.price}</h5>
                    </div>
                    <button class="remove-button" onclick="removeFromCart(${index})">
                      <i class="fas fa-trash-alt"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
    cartContainer.appendChild(cartItem);
  });
}

function calculateTotal(cartItems_) {
  let pricesArr = cartItems_.map(product => product.price);

  let subtotal = pricesArr.reduce((a, b) => a + b, 0);

  cartSubTotal.textContent = `Rp. ${subtotal}`;

  return subtotal;
}
