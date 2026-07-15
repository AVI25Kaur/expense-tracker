const navButtons = document.querySelectorAll("nav button");
console.log(navButtons);

const views = document.querySelectorAll(".view");
console.log(views);

navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    console.log(button.dataset.view);
  });
});
