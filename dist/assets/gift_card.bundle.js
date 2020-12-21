/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

var ready = function ready(callback) {
  if (document.readyState != "loading") callback();else document.addEventListener("DOMContentLoaded", callback);
};

ready(function () {
  document.querySelectorAll(".subnav").forEach(function (subnavLink) {
    subnavLink.addEventListener("click", function (e) {
      var shouldOpen = e.target.parentNode.classList.contains("subnav") && e.target.parentNode.lastElementChild.classList.contains("hidden") || e.target.parentNode.parentNode.classList.contains("subnav") && e.target.parentNode.parentNode.lastElementChild.classList.contains("hidden");
      closeDropdown();
      var parent = e.target.parentNode;

      if (parent.classList.contains("subnav") && shouldOpen) {
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
  }; // maybe redo mobile nav


  var position_y = 0;
  var open = false;
  document.querySelector('.las.la-bars').addEventListener('click', function (e) {
    if (open === false) {
      position_y = window.scrollY;
    }

    document.querySelector('body').parentNode.classList.toggle('overflow-hidden');
    document.querySelector('nav').parentNode.classList.toggle('hidden');

    if (open === true) {
      window.scrollTo(0, position_y);
    }

    open = !open;
  });
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
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dropdown */ "./src/js/dropdown.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dropdown__WEBPACK_IMPORTED_MODULE_1__);



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
  }
});

/***/ }),

/***/ "./src/js/templates/gift_card.js":
/*!***************************************!*\
  !*** ./src/js/templates/gift_card.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout/theme.js */ "./src/js/layout/theme.js");


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
/******/ 	__webpack_require__("./src/js/templates/gift_card.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;