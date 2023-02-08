const productDeleteBtnElements = document.querySelectorAll(
  ".product-item button"
);

for (const productDeleteBtnElement of productDeleteBtnElements) {
  productDeleteBtnElement.addEventListener("click", async (event) => {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch(
      "http://localhost:3000/admin/products/" +
        productId +
        "?_csrf=" +
        csrfToken,
      //fetch wants a domain where to send id
      {
        method: "DELETE",
        //configure fetch
      }
    );
    if (!response.ok) {
      alert("Something went wrong");
      return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
  });
}
