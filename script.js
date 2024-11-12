const API_URL = "https://fakestoreapi.com";

// полчение товаров с сервера
async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error("all is bad");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.log(error.message);
  }
}

// отображение товаров
function displayProducts(products) {
  const productsList = document.querySelector(".products__items");
  productsList.innerHTML = "";
  products.forEach((product) => {
    const productItem = document.createElement("article");
    productItem.classList.add("products__item");
    productItem.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="products__item_img">
    <h3 class="products__item_title">${product.title}</h3>
    <p class="products__item_price">${product.price} $</p>
    <button onclick="deleteProduct(${product.id})" class="products__item_btn">Удалить</button>
    
    `;
    productsList.appendChild(productItem);
  });
}

// добавление нового товара
async function addProduct(event) {
  event.preventDefault();
  const newProduct = {
    title: document.querySelector(".add__title").value,
    price: parseFloat(document.querySelector(".add__price").value),
    category: document.querySelector(".add__category").value,
    description: document.querySelector(".add__description").value,
    image: document.querySelector(".add__img").value,
  };

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) throw new Error("response is not ok");
    const addedProduct = await response.json();
    console.log(addedProduct);
    showMessage("Товар успешно добавлен", ".messageAdd");
    getProducts();
  } catch (error) {
    showMessage("Ошибка добавления товара:" + error.message, ".messageAdd");
  }
}

// удаление товара
async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("response is not ok");
    showMessage("Товар успешно удален", ".messageDelete");
    getProducts();
  } catch (error) {
    showMessage("Ошибка удаления товара:" + error.message, ".messageDelete");
  }
}

// сообщение о статусе добавления товара
function showMessage(message, classAdd) {
  const elemMessage = document.querySelector(classAdd);
  elemMessage.textContent = message;
  elemMessage.style.display = "block";
  setTimeout(() => (elemMessage.style.display = "none"), 3000);
}

// событие добавления товата
document.querySelector(".add").addEventListener("submit", addProduct);

// инициализация
getProducts();
