document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.getElementById("categories-container");

  function fetchCategories() {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => displayCategories(categories))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }

  function displayCategories(categories) {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
      const categoryRow = document.createElement("tr");

      categoryRow.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${new Date(category.updated_at).toLocaleDateString()}</td>
        <td>${new Date(category.created_at).toLocaleDateString()}</td>
        <td>
          <button class="edit-category-button" onclick="editCategory(${
            category.id
          }, '${category.name}')">Editar</button>
          <button class="delete-category-button" onclick="deleteCategory(${
            category.id
          })">Deletar</button>
        </td>
      `;

      categoriesContainer.appendChild(categoryRow);
    });
  }

  window.editCategory = function (id, name) {
    const newName = prompt("Editar nome da categoria:", name);
    if (newName) {
      fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      })
        .then((response) => response.json())
        .then(() => fetchCategories())
        .catch((error) => console.error("Erro ao editar categoria:", error));
    }
  };

  window.deleteCategory = function (id) {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => fetchCategories())
        .catch((error) => console.error("Erro ao deletar categoria:", error));
    }
  };

  fetchCategories();
});
