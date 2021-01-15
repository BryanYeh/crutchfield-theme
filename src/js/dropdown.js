function closeDropdown() {
  document.querySelectorAll(".subnav").forEach((subnavLink) => {
    subnavLink.classList.remove("border-red-600");
    subnavLink.classList.remove("border-solid");
    subnavLink.classList.remove("border-b-3");
    if (
      typeof subnavLink.querySelector(".la-angle-down") != "undefined" &&
      subnavLink.querySelector(".la-angle-down") != null
    ) {
      subnavLink.querySelector(".la-angle-down").classList.remove("transform");
      subnavLink.querySelector(".la-angle-down").classList.remove("rotate-180");
    }
    // subnavLink.querySelector('div').classList.add('hidden')
    subnavLink.lastElementChild.classList.add("hidden");
  });
}

document.querySelectorAll(".subnav").forEach((subnavLink) => {
  subnavLink.addEventListener("click", (e) => {
    let shouldOpen =
      (e.target.parentNode.classList.contains("subnav") &&
        e.target.parentNode.lastElementChild.classList.contains("hidden")) ||
      (e.target.parentNode.parentNode.classList.contains("subnav") &&
        e.target.parentNode.parentNode.lastElementChild.classList.contains(
          "hidden"
        ));
    closeDropdown();

    let parent = e.target.parentNode;
    if (parent.classList.contains("subnav") && shouldOpen) {
      console.log(parent);
      parent.classList.add("border-red-600");
      parent.classList.add("border-solid");
      parent.classList.add("border-b-3");
      if (
        typeof parent.querySelector(".la-angle-down") != "undefined" &&
        parent.querySelector(".la-angle-down") != null
      ) {
        parent.querySelector(".la-angle-down").classList.toggle("transform");
        parent.querySelector(".la-angle-down").classList.toggle("rotate-180");
      }
      parent.lastElementChild.classList.toggle("hidden");
    }

    parent = parent.parentNode;
    if (parent.classList.contains("subnav") && shouldOpen) {
      console.error(parent)
      parent.classList.add("border-red-600");
      parent.classList.add("border-solid");
      parent.classList.add("border-b-3");
      if (
        typeof parent.querySelector(".la-angle-down") != "undefined" &&
        parent.querySelector(".la-angle-down") != null
      ) {
        parent.querySelector(".la-angle-down").classList.toggle("transform");
        parent.querySelector(".la-angle-down").classList.toggle("rotate-180");
      }
      parent.lastElementChild.classList.toggle("hidden");
    }
  });
});

var search_element = document.getElementById('search_results')

window.onclick = function (e) {
  if (
    !e.target.matches(".subnav>span") &&
    !e.target.matches(".subnav>span>i") &&
    !e.target.matches(".subnav>div.text-center") &&
    !e.target.matches(".subnav>div.text-center>i") 
  ) {
    closeDropdown();
  }

  if (
    typeof search_element != "undefined" &&
    search_element != null &&
    !e.target.matches("#search_field")
  ) {
    search_element.innerHTML = "";
    search_element.classList.add("hidden");
  }
};

document.querySelector('.la-bars').addEventListener('click', (e) => {
  document
    .querySelector('body')
    .parentNode.classList.toggle('overflow-hidden')
  document.querySelector('nav').parentNode.classList.toggle('hidden')
})
