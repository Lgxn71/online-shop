const mobileMenuBtnElement = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
let btnIsClicked;
mobileMenuBtnElement.addEventListener("click", () => {
  if (btnIsClicked) {
    mobileMenu.style.display = "none";
    btnIsClicked = false;
    return;
  }
  mobileMenu.style.display = "flex";
  btnIsClicked = true;
});
