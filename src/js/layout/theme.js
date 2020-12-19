import * as images from "@shopify/theme-images";

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  let search_element = document.getElementById("search_results");

  const delay_by_in_ms = 700;
  let scheduled_function = false;

  let search_call = function (search_term) {
    if (search_term != "") {
      fetch(
        "/search/suggest.json?q=" +
          search_term +
          "&resources[type]=product&resources[options][unavailable_products]=last"
      )
        .then((response) => response.json())
        .then((suggestions) => {
          const productSuggestions = suggestions.resources.results.products;

          if (productSuggestions.length > 0) {
            const container = document.getElementById("search_results");
            const template = document.querySelector("#search_results_template");

            container.innerHTML = "";
            productSuggestions.forEach((el) => {
              const clone = template.content.cloneNode(true);
              clone.querySelector("a").href = el.url;
              if (el.image) {
                clone.querySelector("img").src = images.getSizedImageUrl(
                  el.image,
                  "70x70"
                );
                clone.querySelector("img").alt = el.title;
              }

              clone.querySelector("div").children[0].textContent = el.title;
              clone.querySelector("div").children[1].textContent =
                "$" + el.price;

              container.appendChild(clone);
            });
            container.classList.toggle("hidden");
          }
        });
    }
  };

  if (typeof search_element != "undefined" && search_element != null) {
    document.querySelector(".search-field").addEventListener("keyup", (e) => {
      document.getElementById("search_results").innerHTML = "";
      document.getElementById("search_results").classList.add("hidden");

      const search_term = document.querySelector(".search-field").value;
      if (scheduled_function) {
        clearTimeout(scheduled_function);
      }
      scheduled_function = setTimeout(search_call, delay_by_in_ms, search_term);
    });
  }
});
