var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

//// shopify image resize
function preload(images, size) {
  if (typeof images === 'string') {
    images = [images];
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    loadImage(getSizedImageUrl(image, size));
  }
}

function loadImage(path) {
  new Image().src = path;
}

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

ready(() => {
  //// Navbar
  function closeDropdown() {
    document.querySelectorAll('.subnav').forEach(subnavLink => {
      subnavLink.classList.remove('border-red-600')
      subnavLink.classList.remove('border-solid')
      subnavLink.classList.remove('border-b-3')
      subnavLink.querySelector('span>i').classList.remove('transform')
      subnavLink.querySelector('span>i').classList.remove('rotate-180')
      subnavLink.querySelector('div').classList.add('hidden')
    })
  }

  document.querySelectorAll('.subnav').forEach(subnavLink => {
    subnavLink.addEventListener('click', (e) => {
      let shouldOpen = e.target.parentNode.classList.contains('subnav') && e.target.parentNode.querySelector('div').classList.contains('hidden')
      closeDropdown()

      let parent = e.target.parentNode
      if (parent.classList.contains('subnav') && shouldOpen) {
        parent.classList.add('border-red-600')
        parent.classList.add('border-solid')
        parent.classList.add('border-b-3')
        parent.querySelector('span>i').classList.toggle('transform')
        parent.querySelector('span>i').classList.toggle('rotate-180')
        parent.querySelector('div').classList.toggle('hidden')
      }
    })
  })

  var search_element = document.getElementById('search_results');

  window.onclick = function (e) {
    if (!e.target.matches('.subnav>span')) {
      closeDropdown()
    }

    if (typeof (search_element) != 'undefined' && search_element != null && !e.target.matches('#search_field')) {
      document.getElementById('search_results').innerHTML = ''
      document.getElementById('search_results').classList.add('hidden')
    }
  }

  //// navbar toggle
  document.querySelector('.las.la-bars').addEventListener('click', (e) => {
    document.querySelector('body').parentNode.classList.toggle('overflow-hidden')
    document.querySelector('nav').parentNode.classList.toggle('hidden')
  })

  //// predictive search
  const delay_by_in_ms = 700
  let scheduled_function = false


  let search_call = function (search_term) {
    fetch('/search/suggest.json?q=' + search_term + '&resources[type]=product&resources[options][unavailable_products]=last')
      .then(response => response.json())
      .then(suggestions => {
        const productSuggestions = suggestions.resources.results.products;

        if (productSuggestions.length > 0) {
          const container = document.getElementById('search_results')
          const template = document.querySelector('#search_results_template')

          container.innerHTML = ''
          productSuggestions.forEach(el => {
            const clone = template.content.cloneNode(true)
            clone.querySelector('a').href = el.url
            if (el.image) {
              clone.querySelector('img').src = getSizedImageUrl(el.image, '70x70')
              clone.querySelector('img').alt = el.title
            }

            clone.querySelector('div').children[0].textContent = el.title
            clone.querySelector('div').children[1].textContent = '$' + el.price

            container.appendChild(clone)
          })
          container.classList.toggle('hidden')
        }
      })
  }

  if (typeof (search_element) != 'undefined' && search_element != null) {
    document.querySelector('.search-field').addEventListener('keyup', (e) => {
      document.getElementById('search_results').innerHTML = ''
      document.getElementById('search_results').classList.add('hidden')

      const search_term = document.querySelector('.search-field').value
      if (scheduled_function) {
        clearTimeout(scheduled_function)
      }
      scheduled_function = setTimeout(search_call, delay_by_in_ms, search_term)
    })
  }

})