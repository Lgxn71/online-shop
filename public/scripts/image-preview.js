const imagePickerElement = document.querySelector("#image-upload-preview input");
const imagePreviewElement = document.querySelector("#image-upload-preview img");
imagePickerElement.addEventListener("change", () => {
  const files = imagePickerElement.files;
  // array of files, but in our case it will look for 1 only
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }
  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
  //generate a url on users pc to show picture which was selected by user
});
