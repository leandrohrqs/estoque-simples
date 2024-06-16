document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");
  const paginationContainer = document.getElementById("pagination-container");
  const productsPerPage = 10;
  let products = [];
  let currentPage = 1;

  function displayProducts(filteredProducts) {
    productsContainer.innerHTML = "";
    if (!filteredProducts || filteredProducts.length === 0) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("no-products-message");
      messageElement.innerText = "Não há produtos cadastrados.";
      productsContainer.appendChild(messageElement);
    } else {
      const start = (currentPage - 1) * productsPerPage;
      const end = start + productsPerPage;
      const productsToShow = filteredProducts.slice(start, end);

      productsToShow.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.onclick = () => {
          window.location.href = `produto.html?id=${product.id}`;
        };

        const categoryName = product.category_name || "Produto sem categoria";

        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p class="category">${categoryName}</p>
          <p>Quantidade: ${product.quantity}</p>
          <p>Preço: R$ ${product.price.toFixed(2)}</p>
        `;

        productsContainer.appendChild(productElement);
      });
      displayPagination(filteredProducts.length);
    }
  }

  function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) &&
        (selectedCategory === "" ||
          product.category_id === parseInt(selectedCategory))
    );
    displayProducts(filteredProducts);
  }

  function displayPagination(totalProducts) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerText = i;
      pageButton.classList.add("pagination-button");
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        currentPage = i;
        filterProducts();
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  searchBar.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  fetch("/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na rede");
      }
      return response.json();
    })
    .then((data) => {
      products = data;
      filterProducts();
    })
    .catch((error) => {
      console.error("Erro ao buscar produtos:", error);
      const messageElement = document.createElement("div");
      messageElement.classList.add("no-products-message");
      messageElement.innerText = "Erro ao buscar produtos.";
      productsContainer.appendChild(messageElement);
    });

  fetch("/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na rede");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar categorias:", error);
    });
});
