const navButtons = document.querySelectorAll("nav button");
console.log(navButtons);

const views = document.querySelectorAll(".view");
console.log(views);

navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    
    views.forEach(function (view) {
      view.classList.add("hidden");
    });
    document.getElementById(button.dataset.view + "-view").classList.remove("hidden");
  });
});
