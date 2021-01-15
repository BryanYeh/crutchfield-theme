/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@shopify/theme-currency/currency.js":
/*!**********************************************************!*\
  !*** ./node_modules/@shopify/theme-currency/currency.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatMoney": () => /* binding */ formatMoney
/* harmony export */ });
/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

const moneyFormat = '${{amount}}';

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */
function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || moneyFormat;

  function formatWithDelimiters(
    number,
    precision = 2,
    thousands = ',',
    decimal = '.'
  ) {
    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`
    );
    const centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
}


/***/ }),

/***/ "./node_modules/@shopify/theme-images/images.js":
/*!******************************************************!*\
  !*** ./node_modules/@shopify/theme-images/images.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "preload": () => /* binding */ preload,
/* harmony export */   "loadImage": () => /* binding */ loadImage,
/* harmony export */   "imageSize": () => /* binding */ imageSize,
/* harmony export */   "getSizedImageUrl": () => /* binding */ getSizedImageUrl,
/* harmony export */   "removeProtocol": () => /* binding */ removeProtocol
/* harmony export */ });
/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * https://github.com/Shopify/slate.git.
 *
 */

/**
 * Preloads an image in memory and uses the browsers cache to store it until needed.
 *
 * @param {Array} images - A list of image urls
 * @param {String} size - A shopify image size attribute
 */

function preload(images, size) {
  if (typeof images === 'string') {
    images = [images];
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    loadImage(getSizedImageUrl(image, size));
  }
}

/**
 * Loads and caches an image in the browsers cache.
 * @param {string} path - An image url
 */
function loadImage(path) {
  new Image().src = path;
}

/**
 * Find the Shopify image attribute size
 *
 * @param {string} src
 * @returns {null}
 */
function imageSize(src) {
  const match = src.match(
    /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
  );

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

/**
 * Adds a Shopify size attribute to a URL
 *
 * @param src
 * @param size
 * @returns {*}
 */
function getSizedImageUrl(src, size) {
  if (size === null) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    const prefix = src.split(match[0]);
    const suffix = match[0];

    return removeProtocol(`${prefix[0]}_${size}${suffix}`);
  } else {
    return null;
  }
}

function removeProtocol(path) {
  return path.replace(/http(s)?:/, '');
}


/***/ }),

/***/ "./src/js/alert-toast.js":
/*!*******************************!*\
  !*** ./src/js/alert-toast.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideToast": () => /* binding */ hideToast,
/* harmony export */   "showToast": () => /* binding */ showToast
/* harmony export */ });
var clearToast = function clearToast() {
  var alert_title = document.querySelector('.alert-title');
  var alert_text = document.querySelector('.alert-text');
  var alert_toast = document.querySelector('.alert-toast');
  alert_title.classList.remove('text-red-600');
  alert_title.classList.remove('text-green-600');
  alert_title.innerHTML = '';
  alert_text.innerHTML = '';
  alert_text.classList.remove('text-red-500');
  alert_text.classList.remove('text-green-500');
  alert_toast.classList.remove('border-red-600');
  alert_toast.classList.remove('border-green-600');
};
/**
 * Clears the notification toast then hides it
 */


var hideToast = function hideToast() {
  clearToast();
  var alert_toast = document.querySelector('.alert-toast');
  alert_toast.classList.add('hidden');
};
/**
 * Shows the notification toast given params
 * @param {string} notification_type Either success or error
 * @param {string} title The title to show
 * @param {string} description Short description
 */


var showToast = function showToast(notification_type, title, description) {
  clearToast();
  var alert_title = document.querySelector('.alert-title');
  var alert_text = document.querySelector('.alert-text');
  var alert_toast = document.querySelector('.alert-toast');
  alert_title.innerHTML = title;
  alert_text.innerHTML = description;

  if (notification_type == 'error') {
    alert_title.classList.add('text-red-600');
    alert_text.classList.add('text-red-500');
    alert_toast.classList.add('border-red-600');
  } else {
    alert_title.classList.add('text-green-600');
    alert_text.classList.add('text-green-500');
    alert_toast.classList.add('border-green-600');
  }

  alert_toast.classList.remove('hidden');
};



/***/ }),

/***/ "./src/js/dropdown.js":
/*!****************************!*\
  !*** ./src/js/dropdown.js ***!
  \****************************/
/***/ (() => {

function closeDropdown() {
  document.querySelectorAll(".subnav").forEach(function (subnavLink) {
    subnavLink.classList.remove("border-red-600");
    subnavLink.classList.remove("border-solid");
    subnavLink.classList.remove("border-b-3");

    if (typeof subnavLink.querySelector(".la-angle-down") != "undefined" && subnavLink.querySelector(".la-angle-down") != null) {
      subnavLink.querySelector(".la-angle-down").classList.remove("transform");
      subnavLink.querySelector(".la-angle-down").classList.remove("rotate-180");
    } // subnavLink.querySelector('div').classList.add('hidden')


    subnavLink.lastElementChild.classList.add("hidden");
  });
}

document.querySelectorAll(".subnav").forEach(function (subnavLink) {
  subnavLink.addEventListener("click", function (e) {
    var shouldOpen = e.target.parentNode.classList.contains("subnav") && e.target.parentNode.lastElementChild.classList.contains("hidden") || e.target.parentNode.parentNode.classList.contains("subnav") && e.target.parentNode.parentNode.lastElementChild.classList.contains("hidden");
    closeDropdown();
    var parent = e.target.parentNode;

    if (parent.classList.contains("subnav") && shouldOpen) {
      console.log(parent);
      parent.classList.add("border-red-600");
      parent.classList.add("border-solid");
      parent.classList.add("border-b-3");

      if (typeof parent.querySelector(".la-angle-down") != "undefined" && parent.querySelector(".la-angle-down") != null) {
        parent.querySelector(".la-angle-down").classList.toggle("transform");
        parent.querySelector(".la-angle-down").classList.toggle("rotate-180");
      }

      parent.lastElementChild.classList.toggle("hidden");
    }

    parent = parent.parentNode;

    if (parent.classList.contains("subnav") && shouldOpen) {
      console.error(parent);
      parent.classList.add("border-red-600");
      parent.classList.add("border-solid");
      parent.classList.add("border-b-3");

      if (typeof parent.querySelector(".la-angle-down") != "undefined" && parent.querySelector(".la-angle-down") != null) {
        parent.querySelector(".la-angle-down").classList.toggle("transform");
        parent.querySelector(".la-angle-down").classList.toggle("rotate-180");
      }

      parent.lastElementChild.classList.toggle("hidden");
    }
  });
});
var search_element = document.getElementById('search_results');

window.onclick = function (e) {
  if (!e.target.matches(".subnav>span") && !e.target.matches(".subnav>span>i") && !e.target.matches(".subnav>div.text-center") && !e.target.matches(".subnav>div.text-center>i")) {
    closeDropdown();
  }

  if (typeof search_element != "undefined" && search_element != null && !e.target.matches("#search_field")) {
    search_element.innerHTML = "";
    search_element.classList.add("hidden");
  }
};

document.querySelector('.la-bars').addEventListener('click', function (e) {
  document.querySelector('body').parentNode.classList.toggle('overflow-hidden');
  document.querySelector('nav').parentNode.classList.toggle('hidden');
});

/***/ }),

/***/ "./src/js/layout/theme.js":
/*!********************************!*\
  !*** ./src/js/layout/theme.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-images */ "./node_modules/@shopify/theme-images/images.js");
/* harmony import */ var _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-currency */ "./node_modules/@shopify/theme-currency/currency.js");
/* harmony import */ var _theme_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../theme-cart */ "./src/js/theme-cart.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dropdown */ "./src/js/dropdown.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _alert_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../alert-toast */ "./src/js/alert-toast.js");






var ready = function ready(callback) {
  if (document.readyState != "loading") callback();else document.addEventListener("DOMContentLoaded", callback);
};

ready(function () {
  var search_element = document.getElementById("search_results");
  var delay_by_in_ms = 700; // delay querying shopify search for 700ms

  var scheduled_function = false; // search callback function

  var search_call = function search_call(search_term) {
    if (search_term != "") {
      fetch("/search/suggest.json?q=" + search_term + "&resources[type]=product&resources[options][unavailable_products]=last").then(function (response) {
        return response.json();
      }).then(function (suggestions) {
        // search results
        var productSuggestions = suggestions.resources.results.products; // make sure that are search results

        if (productSuggestions.length > 0) {
          var container = document.getElementById("search_results"); // search results container

          var template = document.querySelector("#search_results_template"); // search results template
          // empty the search results container, in case there were results before

          container.innerHTML = ""; // for each search result, use the search results template and display it

          productSuggestions.forEach(function (el) {
            var clone = template.content.cloneNode(true); // copy the empty template

            clone.querySelector("a").href = el.url; // set the link
            // set the image

            if (el.image) {
              clone.querySelector("img").src = _shopify_theme_images__WEBPACK_IMPORTED_MODULE_0__.getSizedImageUrl(el.image, "70x70");
              clone.querySelector("img").alt = el.title;
            }

            clone.querySelector("div").children[0].textContent = el.title; // set the title
            // set the price

            clone.querySelector("div").children[1].textContent = "$" + el.price; // append the cloned element to the results container

            container.appendChild(clone);
          });
          container.classList.toggle("hidden");
        }
      });
    }
  }; // if predictive search is enabled, detect input in search box


  if (typeof search_element != "undefined" && search_element != null) {
    document.querySelector(".search-field").addEventListener("keyup", function (e) {
      // empty the search results and hide it
      document.getElementById("search_results").innerHTML = "";
      document.getElementById("search_results").classList.add("hidden"); // get the search input

      var search_term = document.querySelector(".search-field").value; // clear the timeout out for querying shopify

      if (scheduled_function) {
        clearTimeout(scheduled_function);
      } // reschedule the query


      scheduled_function = setTimeout(search_call, delay_by_in_ms, search_term);
    });
  } // add to cart


  document.querySelectorAll(".add-to-cart").forEach(function (button) {
    button.addEventListener("click", function (e) {
      if (!button.classList.contains('sold-out')) {
        e.target.textContent = "Adding to Cart";
        e.target.setAttribute("disabled", true);
        var quantity = 1;
        _theme_cart__WEBPACK_IMPORTED_MODULE_2__.addItem(Number(e.target.closest("[data-id]").dataset.id), {
          quantity: quantity
        }).then(function (result) {
          if (result.status == 422) {
            _alert_toast__WEBPACK_IMPORTED_MODULE_4__.showToast("error", result.message, result.description);
          } else {
            _alert_toast__WEBPACK_IMPORTED_MODULE_4__.showToast("success", "Successfully added to cart", quantity + " " + result.title);
          }
        });
        e.target.removeAttribute("disabled");
        e.target.textContent = "Add to Cart";
      }
    });
  }); // close notification toast

  document.querySelector(".alert-toast").addEventListener("click", function (e) {
    _alert_toast__WEBPACK_IMPORTED_MODULE_4__.hideToast();
  }); // edit variation

  document.querySelectorAll(".variation-select").forEach(function (variationSelect) {
    variationSelect.addEventListener("change", function (e) {
      var product_card = e.target.closest("[data-handle]");
      var product_handle = product_card.dataset.handle;
      var product_card_variations = [];
      product_card.querySelectorAll(".variation-select").forEach(function (variation) {
        product_card_variations.push(variation.value);
      });
      fetch("/products/" + product_handle + ".js").then(function (response) {
        return response.json();
      }).then(function (product) {
        product.variants.forEach(function (variation) {
          if (product_card_variations.every(function (i) {
            return variation.options.includes(i);
          })) {
            // update prices
            product_card.querySelector('.price').innerHTML = _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney(variation.price);

            if (variation.compare_at_price != null) {
              product_card.querySelector('.price-original').innerHTML = _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney(variation.compare_at_price);
              product_card.querySelector('.discount-amount').innerHTML = _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney(variation.compare_at_price - variation.price) + ' Discount';
            } else {
              product_card.querySelector('.price-original').innerHTML = "";
              product_card.querySelector('.discount-amount').innerHTML = "";
            }

            var available_classes = ["bg-red-600", "text-white", "hover:bg-white", "hover:text-red-600", "add-to-cart"];
            var unavailable_classes = ["bg-white", "text-red-600", "cursor-not-allowed", "sold-out"];

            if (variation.available) {
              available_classes.forEach(function (a_class) {
                product_card.querySelector("button").classList.add(a_class);
              });
              unavailable_classes.forEach(function (u_class) {
                product_card.querySelector("button").classList.remove(u_class);
              });
              product_card.querySelector("button").innerHTML = "Add to Cart";
              product_card.querySelector(".availability").classList.add("la-check-circle");
              product_card.querySelector(".availability").classList.remove("la-times-circle");
              product_card.querySelector(".availability_text").innerHTML = "In Stock";
            } else {
              unavailable_classes.forEach(function (u_class) {
                product_card.querySelector("button").classList.add(u_class);
              });
              available_classes.forEach(function (a_class) {
                product_card.querySelector("button").classList.remove(a_class);
              });
              product_card.querySelector("button").innerHTML = "Sold Out";
              product_card.querySelector(".availability").classList.remove("la-check-circle");
              product_card.querySelector(".availability").classList.add("la-times-circle");
              product_card.querySelector(".availability_text").innerHTML = "Out of Stock";
            }

            product_card.querySelector("a").href = product.url + "?variant=" + variation.id;

            if (variation.featured_image) {
              var _variation$featured_i;

              product_card.querySelector("img").src = _shopify_theme_images__WEBPACK_IMPORTED_MODULE_0__.getSizedImageUrl(variation.featured_image.src, "500x500");
              product_card.querySelector("img").alt = (_variation$featured_i = variation.featured_image.alt) !== null && _variation$featured_i !== void 0 ? _variation$featured_i : "";
            }

            product_card.querySelector(".sku").innerHTML = variation.sku ? "Item #: " + variation.sku : "";
            product_card.dataset.id = variation.id;
          }
        });
      });
    });
  });
});

/***/ }),

/***/ "./src/js/templates/account.js":
/*!*************************************!*\
  !*** ./src/js/templates/account.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout/theme.js */ "./src/js/layout/theme.js");


/***/ }),

/***/ "./src/js/theme-cart.js":
/*!******************************!*\
  !*** ./src/js/theme-cart.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function getDefaultRequestConfig() {
  return JSON.parse(JSON.stringify({
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;'
    }
  }));
}

function fetchJSON(url, config) {
  return fetch(url, config).then(function (response) {
    // if (!response.ok) {
    //   throw response;
    // }
    return response.json();
  });
}

function cart() {
  return fetchJSON('/cart.js', getDefaultRequestConfig());
}

function cartAdd(id, quantity, properties) {
  var config = getDefaultRequestConfig();
  config.method = 'POST';
  config.body = JSON.stringify({
    id: id,
    quantity: quantity,
    properties: properties
  });
  return fetchJSON('/cart/add.js', config);
}

function cartAddFromForm(formData) {
  var config = getDefaultRequestConfig();
  delete config.headers['Content-Type'];
  config.method = 'POST';
  config.body = formData;
  return fetchJSON('/cart/add.js', config);
}

function cartChange(line, options) {
  var config = getDefaultRequestConfig();
  options = options || {};
  config.method = 'POST';
  config.body = JSON.stringify({
    line: line,
    quantity: options.quantity,
    properties: options.properties
  });
  return fetchJSON('/cart/change.js', config);
}

function cartClear() {
  var config = getDefaultRequestConfig();
  config.method = 'POST';
  return fetchJSON('/cart/clear.js', config);
}

function cartUpdate(body) {
  var config = getDefaultRequestConfig();
  config.method = 'POST';
  config.body = JSON.stringify(body);
  return fetchJSON('/cart/update.js', config);
}

function cartShippingRates() {
  return fetchJSON('/cart/shipping_rates.json', getDefaultRequestConfig());
}

function key(key) {
  if (typeof key !== 'string' || key.split(':').length !== 2) {
    throw new TypeError('Theme Cart: Provided key value is not a string with the format xxx:xxx');
  }
}

function quantity(quantity) {
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    throw new TypeError('Theme Cart: An object which specifies a quantity or properties value is required');
  }
}

function id(id) {
  if (typeof id !== 'number' || isNaN(id)) {
    throw new TypeError('Theme Cart: Variant ID must be a number');
  }
}

function properties(properties) {
  if (_typeof(properties) !== 'object') {
    throw new TypeError('Theme Cart: Properties must be an object');
  }
}

function form(form) {
  if (!(form instanceof HTMLFormElement)) {
    throw new TypeError('Theme Cart: Form must be an instance of HTMLFormElement');
  }
}

function options(options) {
  if (_typeof(options) !== 'object') {
    throw new TypeError('Theme Cart: Options must be an object');
  }

  if (typeof options.quantity === 'undefined' && typeof options.properties === 'undefined') {
    throw new Error('Theme Cart: You muse define a value for quantity or properties');
  }

  if (typeof options.quantity !== 'undefined') {
    quantity(options.quantity);
  }

  if (typeof options.properties !== 'undefined') {
    properties(options.properties);
  }
}
/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

/**
 * Returns the state object of the cart
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */


function getState() {
  return cart();
}
/**
 * Returns the index of the cart line item
 * @param {string} key The unique key of the line item
 * @returns {Promise} Resolves with the index number of the line item
 */


function getItemIndex(key$$1) {
  key(key$$1);
  return cart().then(function (state) {
    var index = -1;
    state.items.forEach(function (item, i) {
      index = item.key === key$$1 ? i + 1 : index;
    });

    if (index === -1) {
      return Promise.reject(new Error('Theme Cart: Unable to match line item with provided key'));
    }

    return index;
  });
}
/**
 * Fetches the line item object
 * @param {string} key The unique key of the line item
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */


function getItem(key$$1) {
  key(key$$1);
  return cart().then(function (state) {
    var lineItem = null;
    state.items.forEach(function (item) {
      lineItem = item.key === key$$1 ? item : lineItem;
    });

    if (lineItem === null) {
      return Promise.reject(new Error('Theme Cart: Unable to match line item with provided key'));
    }

    return lineItem;
  });
}
/**
 * Add a new line item to the cart
 * @param {number} id The variant's unique ID
 * @param {object} options Optional values to pass to /cart/add.js
 * @param {number} options.quantity The quantity of items to be added to the cart
 * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */


function addItem(id$$1, options$$1) {
  options$$1 = options$$1 || {};
  id(id$$1);
  return cartAdd(id$$1, options$$1.quantity, options$$1.properties);
}
/**
 * Add a new line item to the cart from a product form
 * @param {object} form DOM element which is equal to the <form> node
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */


function addItemFromForm(form$$1) {
  form(form$$1);
  var formData = new FormData(form$$1);
  id(parseInt(formData.get('id'), 10));
  return cartAddFromForm(formData);
}
/**
 * Changes the quantity and/or properties of an existing line item.
 * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)
 * @param {object} options Optional values to pass to /cart/add.js
 * @param {number} options.quantity The quantity of items to be added to the cart
 * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */


function updateItem(key$$1, options$$1) {
  key(key$$1);
  options(options$$1);
  return getItemIndex(key$$1).then(function (line) {
    return cartChange(line, options$$1);
  });
}
/**
 * Removes a line item from the cart
 * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */


function removeItem(key$$1) {
  key(key$$1);
  return getItemIndex(key$$1).then(function (line) {
    return cartChange(line, {
      quantity: 0
    });
  });
}
/**
 * Sets all quantities of all line items in the cart to zero. This does not remove cart attributes nor the cart note.
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */


function clearItems() {
  return cartClear();
}
/**
 * Gets all cart attributes
 * @returns {Promise} Resolves with the cart attributes object
 */


function getAttributes() {
  return cart().then(function (state) {
    return state.attributes;
  });
}
/**
 * Sets all cart attributes
 * @returns {Promise} Resolves with the cart state object
 */


function updateAttributes(attributes) {
  return cartUpdate({
    attributes: attributes
  });
}
/**
 * Clears all cart attributes
 * @returns {Promise} Resolves with the cart state object
 */


function clearAttributes() {
  return getAttributes().then(function (attributes) {
    for (var key$$1 in attributes) {
      attributes[key$$1] = '';
    }

    return updateAttributes(attributes);
  });
}
/**
 * Gets cart note
 * @returns {Promise} Resolves with the cart note string
 */


function getNote() {
  return cart().then(function (state) {
    return state.note;
  });
}
/**
 * Sets cart note
 * @returns {Promise} Resolves with the cart state object
 */


function updateNote(note) {
  return cartUpdate({
    note: note
  });
}
/**
 * Clears cart note
 * @returns {Promise} Resolves with the cart state object
 */


function clearNote() {
  return cartUpdate({
    note: ''
  });
}
/**
 * Get estimated shipping rates.
 * @returns {Promise} Resolves with response of /cart/shipping_rates.json (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates)
 */


function getShippingRates() {
  return cartShippingRates();
}

exports.getState = getState;
exports.getItemIndex = getItemIndex;
exports.getItem = getItem;
exports.addItem = addItem;
exports.addItemFromForm = addItemFromForm;
exports.updateItem = updateItem;
exports.removeItem = removeItem;
exports.clearItems = clearItems;
exports.getAttributes = getAttributes;
exports.updateAttributes = updateAttributes;
exports.clearAttributes = clearAttributes;
exports.getNote = getNote;
exports.updateNote = updateNote;
exports.clearNote = clearNote;
exports.getShippingRates = getShippingRates;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/templates/account.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;