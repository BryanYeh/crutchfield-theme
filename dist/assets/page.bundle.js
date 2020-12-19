/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@shopify/theme-images/images.js":
/*!******************************************************!*\
  !*** ./node_modules/@shopify/theme-images/images.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/js/layout/theme.js":
/*!********************************!*\
  !*** ./src/js/layout/theme.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-images */ "./node_modules/@shopify/theme-images/images.js");


var ready = function ready(callback) {
  if (document.readyState != "loading") callback();else document.addEventListener("DOMContentLoaded", callback);
};

ready(function () {
  var search_element = document.getElementById("search_results");
  var delay_by_in_ms = 700;
  var scheduled_function = false;

  var search_call = function search_call(search_term) {
    if (search_term != "") {
      fetch("/search/suggest.json?q=" + search_term + "&resources[type]=product&resources[options][unavailable_products]=last").then(function (response) {
        return response.json();
      }).then(function (suggestions) {
        var productSuggestions = suggestions.resources.results.products;

        if (productSuggestions.length > 0) {
          var container = document.getElementById("search_results");
          var template = document.querySelector("#search_results_template");
          container.innerHTML = "";
          productSuggestions.forEach(function (el) {
            var clone = template.content.cloneNode(true);
            clone.querySelector("a").href = el.url;

            if (el.image) {
              clone.querySelector("img").src = _shopify_theme_images__WEBPACK_IMPORTED_MODULE_0__.getSizedImageUrl(el.image, "70x70");
              clone.querySelector("img").alt = el.title;
            }

            clone.querySelector("div").children[0].textContent = el.title;
            clone.querySelector("div").children[1].textContent = "$" + el.price;
            container.appendChild(clone);
          });
          container.classList.toggle("hidden");
        }
      });
    }
  };

  if (typeof search_element != "undefined" && search_element != null) {
    document.querySelector(".search-field").addEventListener("keyup", function (e) {
      document.getElementById("search_results").innerHTML = "";
      document.getElementById("search_results").classList.add("hidden");
      var search_term = document.querySelector(".search-field").value;

      if (scheduled_function) {
        clearTimeout(scheduled_function);
      }

      scheduled_function = setTimeout(search_call, delay_by_in_ms, search_term);
    });
  }
});

/***/ }),

/***/ "./src/js/templates/page.js":
/*!**********************************!*\
  !*** ./src/js/templates/page.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/******/ 	__webpack_require__("./src/js/templates/page.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;