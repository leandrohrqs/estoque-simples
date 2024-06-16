document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");
  const categorySelect = document.getElementById("category");
  const formTitle = document.getElementById("form-title");
  const productIdField = document.getElementById("product-id");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

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
        categorySelect.appendChild(option);
      });

      if (productId) {
        fetch(`/api/products/${productId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erro na rede");
            }
            return response.json();
          })
          .then((product) => {
            formTitle.textContent = "Editar Produto";
            productIdField.value = product.id;
            form.name.value = product.name;
            form.description.value = product.description;
            form.category_id.value = product.category_id;
            form.quantity.value = product.quantity;
            form.price.value = product.price;
          })
          .catch((error) => {
            console.error("Erro ao buscar produto:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar categorias:", error);
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const method = productId ? "PUT" : "POST";
    const endpoint = productId ? `/api/products/${productId}` : "/api/products";

    fetch(endpoint, {
      method: method,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar produto");
        }
        return response.json();
      })
      .then((data) => {
        alert("Produto salvo com sucesso!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
      });
  });
});
