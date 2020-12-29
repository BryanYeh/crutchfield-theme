import * as images from "@shopify/theme-images";
import * as cart from '../theme-cart';
import '../dropdown';
import * as toast from '../alert-toast';

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  let search_element = document.getElementById("search_results");

  const delay_by_in_ms = 700;  // delay querying shopify search for 700ms
  let scheduled_function = false;

  // search callback function
  let search_call = function (search_term) {
    if (search_term != "") {
      fetch(
        "/search/suggest.json?q=" +
          search_term +
          "&resources[type]=product&resources[options][unavailable_products]=last"
      )
        .then((response) => response.json())
        .then((suggestions) => {
          // search results
          const productSuggestions = suggestions.resources.results.products;

          // make sure that are search results
          if (productSuggestions.length > 0) {
            const container = document.getElementById("search_results"); // search results container
            const template = document.querySelector("#search_results_template"); // search results template

            // empty the search results container, in case there were results before
            container.innerHTML = "";
            
            // for each search result, use the search results template and display it
            productSuggestions.forEach((el) => {
              const clone = template.content.cloneNode(true); // copy the empty template
              clone.querySelector("a").href = el.url; // set the link
              // set the image
              if (el.image) {
                clone.querySelector("img").src = images.getSizedImageUrl(
                  el.image,
                  "70x70"
                );
                clone.querySelector("img").alt = el.title;
              }

              clone.querySelector("div").children[0].textContent = el.title; // set the title
              // set the price
              clone.querySelector("div").children[1].textContent =
                "$" + el.price;

              // append the cloned element to the results container
              container.appendChild(clone);
            });
            container.classList.toggle("hidden");
          }
        });
    }
  };

  // if predictive search is enabled, detect input in search box
  if (typeof search_element != "undefined" && search_element != null) {
    document.querySelector(".search-field").addEventListener("keyup", (e) => {
      // empty the search results and hide it
      document.getElementById("search_results").innerHTML = "";
      document.getElementById("search_results").classList.add("hidden");

      // get the search input
      const search_term = document.querySelector(".search-field").value;
      // clear the timeout out for querying shopify
      if (scheduled_function) {
        clearTimeout(scheduled_function);
      }
      // reschedule the query
      scheduled_function = setTimeout(search_call, delay_by_in_ms, search_term);
    });
  }

  // add to cart
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.target.textContent = 'Adding to Cart';
      e.target.setAttribute('disabled',true);
      let quantity = 1;
      cart.addItem(Number(e.target.closest('[data-id]').dataset.id), {quantity: quantity}).then(result => {
        if(result.status == 422){
          toast.showToast('error',result.message,result.description);
        }
        else{
          toast.showToast('success','Successfully added to cart',quantity + " " + result.title);
        }
      })

      e.target.removeAttribute('disabled');
      e.target.textContent = 'Add to Cart';      
    })
  })

  document.querySelector('.alert-toast').addEventListener('click', (e)=>{
    toast.hideToast();
  })

});
