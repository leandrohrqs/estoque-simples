document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("category-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar categoria");
        }
        return response.json();
      })
      .then((data) => {
        alert("Categoria cadastrada com sucesso!");
        window.location.href = "categorias.html";
      })
      .catch((error) => {
        console.error("Erro ao cadastrar categoria:", error);
      });
  });
});
