'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getDefaultRequestConfig() {
  return JSON.parse(
    JSON.stringify({
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;'
      }
    })
  );
}

function fetchJSON(url, config) {
  return fetch(url, config).then(function(response) {
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
    throw new TypeError(
      'Theme Cart: Provided key value is not a string with the format xxx:xxx'
    );
  }
}

function quantity(quantity) {
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    throw new TypeError(
      'Theme Cart: An object which specifies a quantity or properties value is required'
    );
  }
}

function id(id) {
  if (typeof id !== 'number' || isNaN(id)) {
    throw new TypeError('Theme Cart: Variant ID must be a number');
  }
}

function properties(properties) {
  if (typeof properties !== 'object') {
    throw new TypeError('Theme Cart: Properties must be an object');
  }
}

function form(form) {
  if (!(form instanceof HTMLFormElement)) {
    throw new TypeError('Theme Cart: Form must be an instance of HTMLFormElement');
  }
}

function options(options) {
  if (typeof options !== 'object') {
    throw new TypeError('Theme Cart: Options must be an object');
  }

  if (
    typeof options.quantity === 'undefined' &&
    typeof options.properties === 'undefined'
  ) {
    throw new Error(
      'Theme Cart: You muse define a value for quantity or properties'
    );
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

  return cart().then(function(state) {
    var index = -1;

    state.items.forEach(function(item, i) {
      index = item.key === key$$1 ? i + 1 : index;
    });

    if (index === -1) {
      return Promise.reject(
        new Error('Theme Cart: Unable to match line item with provided key')
      );
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

  return cart().then(function(state) {
    var lineItem = null;

    state.items.forEach(function(item) {
      lineItem = item.key === key$$1 ? item : lineItem;
    });

    if (lineItem === null) {
      return Promise.reject(
        new Error('Theme Cart: Unable to match line item with provided key')
      );
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

  return getItemIndex(key$$1).then(function(line) {
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

  return getItemIndex(key$$1).then(function(line) {
    return cartChange(line, { quantity: 0 });
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
  return cart().then(function(state) {
    return state.attributes;
  });
}

/**
 * Sets all cart attributes
 * @returns {Promise} Resolves with the cart state object
 */
function updateAttributes(attributes) {
  return cartUpdate({ attributes: attributes });
}

/**
 * Clears all cart attributes
 * @returns {Promise} Resolves with the cart state object
 */
function clearAttributes() {
  return getAttributes().then(function(attributes) {
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
  return cart().then(function(state) {
    return state.note;
  });
}

/**
 * Sets cart note
 * @returns {Promise} Resolves with the cart state object
 */
function updateNote(note) {
  return cartUpdate({ note: note });
}

/**
 * Clears cart note
 * @returns {Promise} Resolves with the cart state object
 */
function clearNote() {
  return cartUpdate({ note: '' });
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
