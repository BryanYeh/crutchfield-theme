/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/alert-toast.js":
/*!*******************************!*\
  !*** ./src/js/alert-toast.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/******/ 	__webpack_require__("./src/js/alert-toast.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;