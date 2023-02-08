const addToCartBtnElement = document.querySelector("#product-details button");
const spanCnts = document.querySelectorAll("#links-container .cart-cnt");

addToCart = async () => {
  const productId = addToCartBtnElement.dataset.productid;
  const csrfToken = addToCartBtnElement.dataset.csrf;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productid: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if (!response.ok) {
    alert("something went wrong");
    return;
  }

  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  for (const spanCnt of spanCnts) {
    spanCnt.textContent = newTotalQuantity;
  }
};
addToCartBtnElement.addEventListener("click", addToCart);
