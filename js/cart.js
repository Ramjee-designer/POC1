// Sample product list in JSON format
const products = [
  { title: "Black Bay Chrono", price: 45.23, image: "images/p1.png" },
  { title: "Automatic Engineer 40", price: 25.23, image: "images/p2.png" },
  { title: "Automatic Engineer 22", price: 453.23, image: "images/p3.png" },
  { title: "Automatic Engineer 35", price: 35.23, image: "images/p4.png" },
  { title: "Black Bay Chrono21", price: 45.23, image: "images/p1.png" },
  { title: "Automatic Engineer 20", price: 25.23, image: "images/p2.png" },
  { title: "Automatic Engineer 23", price: 453.23, image: "images/p3.png" },
  { title: "Automatic Engineer 25", price: 35.23, image: "images/p4.png" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countSpan = document.getElementById("cartCount");
  if (!countSpan) return;
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  countSpan.innerText = totalCount;
}

function addToCart(title, price, image) {
  const existing = cart.find((item) => item.title === title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ title, price, image, quantity: 1 });
  }
  saveCart();
  renderDrawer();
  updateCartCount();
  openDrawer();
}

function removeFromCart(title) {
  cart = cart.filter((item) => item.title !== title);
  saveCart();
  renderDrawer();
  renderCartDetails(); // for cart.html
  updateCartCount();
}

function renderDrawer() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  container.innerHTML = "";
  cart.forEach((item) => {
    container.innerHTML += `
      <li class="cart-item">
        <div class="product-image">
                    <img src="${item.image}" alt="Product" title="Product">
        </div>
        <div class="product-content">
                    <a href="#">
                        <h3 class="p-title">${item.title}</h3>
                    </a>
                    <div class="p-price">$${item.price}</div>
                    <div class="quantity-container">
                            <div class="quantity-t">Quantity : ${item.quantity}</div>
                            <button class="remove-btn" onclick="removeFromCart('${item.title}')"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C14.327 3 15 3.673 15 4.5V5H19V6H18V17.5C18 18.879 16.878 20 15.5 20H7.5C6.122 20 5 18.879 5 17.5V6H4V5H8V4.5C8 3.673 8.673 3 9.5 3H13.5ZM17 6H6V17.5C6 18.327 6.673 19 7.5 19H15.5C16.327 19 17 18.327 17 17.5V6ZM10 9V16H9V9H10ZM14 9V16H13V9H14ZM13.5 4H9.5C9.224 4 9 4.225 9 4.5V5H14V4.5C14 4.225 13.776 4 13.5 4Z" fill="black"></path>
                            </svg>
                            </button>
                    </div>
         </div>
      </li>
    `;
  });
}

function openDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.add("active");
  document.body.classList.add("cart-open");
}

function closeDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.remove("active");
  document.body.classList.remove("cart-open");
}

// function toggleDrawer() {
//   const drawer = document.getElementById('cartDrawer');
//   if (drawer) drawer.classList.toggle('active');
// }

function toggleDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) {
    const isActive = drawer.classList.toggle("active");
    if (isActive) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }
  }
}

function goToCart() {
  window.location.href = "cart.html";
}

function renderCartDetails() {
  const container = document.getElementById("cartDetails");
  const totalElement = document.getElementById("cartTotal");
  if (!container || !totalElement) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    container.innerHTML += `
<li>
<div class="product-head-con">
    <a href="#">
    <div class="product-image">
        <img src="${item.image}" alt="Product" title="Product">
    </div>
    </a>
    <div class="product-content">
    <a href="#">
        <h3 class="p-title">${item.title}</h3>
    </a>
    <div class="p-price">$${item.price}</div>
    
    </div>
</div>
<div class="product-quantity-con">
    <div class="quantity-container">
            <div class="number">
                <span class="minus">-</span>
                <input type="text" value="${item.quantity}">
                <span class="plus">+</span>
            </div>
            
    </div>
</div>
<div class="product-subtotal-con">
    <div class="p-price">$${item.price}</div>
    <button class="remove-btn" onclick="removeFromCart('${item.title}')"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C14.327 3 15 3.673 15 4.5V5H19V6H18V17.5C18 18.879 16.878 20 15.5 20H7.5C6.122 20 5 18.879 5 17.5V6H4V5H8V4.5C8 3.673 8.673 3 9.5 3H13.5ZM17 6H6V17.5C6 18.327 6.673 19 7.5 19H15.5C16.327 19 17 18.327 17 17.5V6ZM10 9V16H9V9H10ZM14 9V16H13V9H14ZM13.5 4H9.5C9.224 4 9 4.225 9 4.5V5H14V4.5C14 4.225 13.776 4 13.5 4Z" fill="black"></path>
            </svg>
            </button>
</div>
        </li>
    `;
  });

  totalElement.innerText = total;
}

function checkout() {
  window.location.href = "thankyou.html";
}

function renderProducts() {
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";
  products.forEach((product) => {
    container.innerHTML += `
      <div class="swiper-slide">
<div class="product-grid">
                            <div class="product-img">
                                <a href="product.html">
                                    <img src="${product.image}" alt="Black Bay Chrono" title="Black Bay Chrono">
                                </a>
                                <ul class="button-set">
                                    <li>
                                        <a href="#" class="btn">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                                    stroke="#fff" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>

                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="btn" onclick="addToCart('${product.title}', ${product.price}, '${product.image}')">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                                                    stroke="#fff" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>

                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="product-grid-content">
                                <a href="#">
                                    <h2 class="product-title">
                                        ${product.title}
                                    </h2>
                                </a>
                                <div class="sale-price">
                                    <span class="amount-prie">$${product.price}</span>
                                    <span class="del-price">$${product.price}</span>
                                </div>
                                <ul class="grid-swatches">
                                    <li class="swatch-brown"></li>
                                    <li class="swatch-yellow"></li>
                                    <li class="swatch-black"></li>
                                </ul>
                            </div>
                        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderDrawer();
  renderCartDetails();
  updateCartCount();

  // Attach click to open cart drawer
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleDrawer);
  }

  // Attach click to close cart drawer on close button
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }
});
