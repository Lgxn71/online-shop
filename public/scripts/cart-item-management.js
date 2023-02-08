const cartItemUpdateFormElement = document.querySelectorAll(
  ".cart-item-management"
);

const cartTotalPriceElement = document.getElementById("cart-total-price");
const spanCnts = document.querySelectorAll("#links-container .cart-cnt");
for (const formElement of cartItemUpdateFormElement) {
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;

    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;
    let response;
    try {
      response = await fetch("/cart/items", {
        method: "PATCH",
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
          _csrf: csrfToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert("something went wrong!");
      return;
    }
    if (!response.ok) {
      alert("something went wrong!");
      return;
    }
    const responseData = await response.json(); //extract data from req

    if (responseData.updatedCartData.updatedItemPrice === 0) {
      form.parentElement.parentElement.remove();
    } else {
      const cartItemTotalPriceElement =
        form.parentElement.querySelector(".cart-item-price");
      cartItemTotalPriceElement.textContent =
        responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }
    //update value

    cartTotalPriceElement.textContent =
      responseData.updatedCartData.newTotalPrice.toFixed(2);
    for (const spanCnt of spanCnts) {
      spanCnt.textContent =
        responseData.updatedCartData.newTotalQuantity.toFixed(0);
    }
  });
}
