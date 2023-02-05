const passwordField = document.getElementById("password");
const buttonToRevealPassword = document.getElementById("revealButton");

buttonToRevealPassword.addEventListener("click", () => {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    buttonToRevealPassword.innerHTML = "Hide";
  } else {
    passwordField.type = "password";
    buttonToRevealPassword.innerHTML = "Reveal";
  }
});
