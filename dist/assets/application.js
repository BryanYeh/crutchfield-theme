var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

//// shopify image resize
function resizeImg(src, size) {
  if (size === null) {
    return src;
  }

  if (size === "master") {
    return removeProtocol(src);
  }

  const match = src.match(
    /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
  );

  if (match) {
    const prefix = src.split(match[0]);
    const suffix = match[0];

    return removeProtocol(`${prefix[0]}_${size}${suffix}`);
  } else {
    return null;
  }
}

function removeProtocol(path) {
  return path.replace(/http(s)?:/, "");
}

//// close nav dropdown
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
    subnavLink.querySelector("div").classList.add("hidden");
  });
}

//// add to cart
function addToCart(id) {
  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
      quantity: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

ready(() => {
  //// Navbar
  //// open/close nav
  document.querySelectorAll(".subnav").forEach((subnavLink) => {
    subnavLink.addEventListener("click", (e) => {
      let shouldOpen =
        (e.target.parentNode.classList.contains("subnav") &&
          e.target.parentNode
            .querySelector("div")
            .classList.contains("hidden")) ||
        (e.target.parentNode.parentNode.classList.contains("subnav") &&
          e.target.parentNode.parentNode
            .querySelector("div")
            .classList.contains("hidden"));
      closeDropdown();

      let parent = e.target.parentNode;
      if (parent.classList.contains("subnav") && shouldOpen) {
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
        parent.querySelector("div").classList.toggle("hidden");
      }

      parent = parent.parentNode;
      if (parent.classList.contains("subnav") && shouldOpen) {
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
        parent.querySelector("div").classList.toggle("hidden");
      }
    });
  });

  var search_element = document.getElementById("search_results");

  //// close any dropdown
  window.onclick = function (e) {
    if (
      !e.target.matches(".subnav>span") &&
      !e.target.matches(".subnav>span>i")
    ) {
      closeDropdown();
    }

    if (
      typeof search_element != "undefined" &&
      search_element != null &&
      !e.target.matches("#search_field")
    ) {
      document.getElementById("search_results").innerHTML = "";
      document.getElementById("search_results").classList.add("hidden");
    }
  };

  //// mobile navbar toggle
  document.querySelector(".las.la-bars").addEventListener("click", (e) => {
    document
      .querySelector("body")
      .parentNode.classList.toggle("overflow-hidden");
    document.querySelector("nav").parentNode.classList.toggle("hidden");
  });

  //// predictive search
  const delay_by_in_ms = 700;
  let scheduled_function = false;

  let search_call = function (search_term) {
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
              clone.querySelector("img").src = resizeImg(el.image, "70x70");
              clone.querySelector("img").alt = el.title;
            }

            clone.querySelector("div").children[0].textContent = el.title;
            clone.querySelector("div").children[1].textContent = "$" + el.price;

            container.appendChild(clone);
          });
          container.classList.toggle("hidden");
        }
      });
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

  //// variation select from products in collections
  document.querySelectorAll(".variation-select").forEach((variationSelect) => {
    variationSelect.addEventListener("change", (e) => {
      let product_card = e.target.closest("[data-handle]");
      let product_handle = product_card.dataset.handle;

      let product_card_variations = [];
      product_card
        .querySelectorAll(".variation-select")
        .forEach((variation) => {
          product_card_variations.push(variation.value);
        });

      fetch("/products/" + product_handle + ".js")
        .then((response) => response.json())
        .then((product) => {
          console.log(product);
          product.variants.forEach((variation) => {
            if (
              product_card_variations.every((i) =>
                variation.options.includes(i)
              )
            ) {
              let available_classes = [
                "bg-red-600",
                "text-white",
                "hover:bg-white",
                "hover:text-red-600",
                "add-to-cart",
              ];
              let unavailable_classes = [
                "bg-white",
                "text-red-600",
                "cursor-not-allowed",
              ];
              if (variation.available) {
                available_classes.forEach((a_class) => {
                  product_card.querySelector("button").classList.add(a_class);
                });
                unavailable_classes.forEach((u_class) => {
                  product_card
                    .querySelector("button")
                    .classList.remove(u_class);
                });
                product_card.querySelector("button").innerHTML = "Add to Cart";
                product_card
                  .querySelector(".availability")
                  .classList.add("la-check-circle");
                product_card
                  .querySelector(".availability")
                  .classList.remove("la-times-circle");
                product_card.querySelector(".availability_text").innerHTML =
                  "In Stock";
              } else {
                unavailable_classes.forEach((u_class) => {
                  product_card.querySelector("button").classList.add(u_class);
                });
                available_classes.forEach((a_class) => {
                  product_card
                    .querySelector("button")
                    .classList.remove(a_class);
                });
                product_card.querySelector("button").innerHTML = "Sold Out";
                product_card
                  .querySelector(".availability")
                  .classList.remove("la-check-circle");
                product_card
                  .querySelector(".availability")
                  .classList.add("la-times-circle");
                product_card.querySelector(".availability_text").innerHTML =
                  "Out of Stock";
              }
              product_card.querySelector("a").href =
                product.url + "?variant=" + variation.id;
              if (variation.featured_image) {
                product_card.querySelector("img").src = resizeImg(
                  variation.featured_image.src,
                  "500x500"
                );
                product_card.querySelector("img").alt =
                  variation.featured_image.alt ?? "";
              }
              product_card.querySelector(".sku").innerHTML = variation.sku
                ? "Item #: " + variation.sku
                : "";
              product_card.dataset.id = variation.id;
            }
          });
        });
    });
  });

  //// add to cart
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(e.target.closest("[data-id]").dataset.id);
      addToCart(e.target.closest("[data-id]").dataset.id);
    });
  });
});
