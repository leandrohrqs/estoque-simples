document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const editButton = document.getElementById("edit-product-button");
  const deleteButton = document.getElementById("delete-product-button");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  function displayProduct(product) {
    productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="category">${
          product.category_name || "Produto sem categoria"
        }</p>
        <p>Quantidade: ${product.quantity}</p>
        <p>Preço: R$ ${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
      `;

    editButton.onclick = () => {
      window.location.href = `cadastrar_produto.html?id=${product.id}`;
    };

    deleteButton.onclick = () => {
      if (confirm("Tem certeza que deseja deletar este produto?")) {
        fetch(`/api/products/${productId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            window.location.href = "index.html";
          })
          .catch((error) => console.error("Erro ao deletar produto:", error));
      }
    };
  }

  fetch(`/api/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na rede");
      }
      return response.json();
    })
    .then((data) => {
      displayProduct(data);
    })
    .catch((error) => {
      console.error("Erro ao buscar produto:", error);
      const messageElement = document.createElement("div");
      messageElement.classList.add("no-products-message");
      messageElement.innerText = "Erro ao buscar produto.";
      productContainer.appendChild(messageElement);
    });
});
