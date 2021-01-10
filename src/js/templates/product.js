import "../layout/theme.js";
import * as currency from '@shopify/theme-currency';

var thumbnails = (document.querySelector(".gallery-thumbs img") !== null) ? '.gallery-thumbs img' : '.gallery-thumbs svg';
var mainImage = (document.querySelector(".gallery-top img") !== null) ? '.gallery-top img' : '.gallery-top svg';

// add swiperjs main picture
var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 1,
  initialSlide: document.querySelector("[data-default-slide]").dataset
    .defaultSlide,
  centerInsufficientSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      var realIndex = this.realIndex;
      // make border black to the current thumbail
      document.querySelector(thumbnails).classList.remove("border-black");
      document.querySelector(thumbnails).classList.add("border-gray-400");
      document.querySelectorAll(thumbnails).forEach((img) => {
        if (img.dataset.thumbsIndex == realIndex) {
          img.classList.add("border-black");
          img.classList.remove("border-gray-400");
        }
      });
    },
    // everytime the main image changes, update to the current thumbnail
    slideChange: function () {
      var realIndex = this.realIndex;
      document.querySelectorAll(thumbnails).forEach((img) => {
        // make border black to the current thumbail
        if (img.dataset.thumbsIndex == realIndex) {
          img.classList.add("border-black");
          img.classList.remove("border-gray-400");
        } else {
          img.classList.remove("border-black");
          img.classList.add("border-gray-400");
        }
      });
    },
  },
});

// clicking each thumbnail will switch the main image
document.querySelectorAll(thumbnails).forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    galleryTop.slideToLoop(thumbnail.dataset.thumbsIndex);
  });
});

// create photoswipe
var openPhotoSwipe = function () {
  var pswpElement = document.querySelectorAll(".pswp")[0];
  var items = [];

  // get all big pictures and sizes
  document.querySelectorAll(mainImage).forEach((img) => {
    items.push({
      src: img.src,
      w: img.naturalWidth,
      h: img.naturalHeight,
    });
  });

  var options = {
    history: false,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
    index: galleryTop.realIndex, // match the current big product image
  };

  var gallery = new PhotoSwipe(
    pswpElement,
    PhotoSwipeUI_Default,
    items,
    options
  );

  // keep photoswipe and swiperjs images in sync
  gallery.listen("afterChange", function () {
    galleryTop.slideToLoop(gallery.getCurrentIndex());
  });

  // activate photoswipe
  gallery.init();
};

// open photoswipe when big picture is clicked
if(mainImage === ".gallery-top img"){
  document.querySelectorAll(".zoom i, " + mainImage).forEach((img) => {
    img.addEventListener("click", (e) => {
      openPhotoSwipe();
    });
  });
}


// update on selecting variation
document
  .querySelectorAll(".variation-option-select")
  .forEach((optionSelect) => {
    optionSelect.addEventListener("change", (e) => {
      let product_options = [];

      document.querySelectorAll(".variation-option-select")
        .forEach((option) => {
          product_options.push(option.value);
        });

      // get product json stored on product page 'v_json'
      let variant_json = JSON.parse(
        document.getElementById("v_json").innerHTML
      );

      // update id to selected variation
      variant_json.forEach((option) => {
        if (product_options.every((v, i) => option.options.includes(v))) {
          e.target.closest("[data-id]").dataset.id = option.id;

          // update prices
          document.querySelector('.price').innerHTML = currency.formatMoney(option.price);
          if(option.compare_at_price != null){
            document.querySelector('.price-original').innerHTML = currency.formatMoney(option.compare_at_price);
            document.querySelector('.discount-amount').innerHTML = currency.formatMoney(option.compare_at_price - option.price) + ' Discount';
          }
          else{
            document.querySelector('.price-original').innerHTML = "";
            document.querySelector('.discount-amount').innerHTML = "";
          }

          // tw classes to use for sold out and in stock
          let available_classes = [
            "bg-red-600",
            "text-white",
            "hover:bg-white",
            "hover:text-red-600",
          ];
          let unavailable_classes = [
            "bg-white",
            "text-red-600",
            "cursor-not-allowed",
            "sold-out"
          ];

          // get add to cart button
          const cart_btn = document.querySelector(".add-to-cart");

          if(option.available){
            // update add to cart button
            available_classes.forEach((a_class) => {
              cart_btn.classList.add(a_class);
            });
            unavailable_classes.forEach((u_class) => {
              cart_btn.classList.remove(u_class);
            });
            cart_btn.innerHTML = "Add to Cart";

            // update availablity text
            document.querySelector(".availability").classList.add("la-check-circle");
            document.querySelector(".availability").classList.remove("la-times-circle");
            document.querySelector(".availability_text").innerHTML = "In Stock";
          }
          else{
            // update button
            unavailable_classes.forEach((u_class) => {
              cart_btn.classList.add(u_class);
            });
            available_classes.forEach((a_class) => {
              cart_btn.classList.remove(a_class);
            });
            cart_btn.innerHTML = "Sold Out";

            // update availablity text
            document.querySelector(".availability").classList.remove("la-check-circle");
            document.querySelector(".availability").classList.add("la-times-circle");
            document.querySelector(".availability_text").innerHTML = "Out of Stock";
          }

          // there is an image for the option, update the swiperjs slider
          if(option.featured_image){
            galleryTop.slideToLoop(option.featured_image.position-1); // swiperjs starts with index 0
          }
        }
      });
    });
  });

  // product tabs switching for desktop
  document.querySelectorAll('.product-tab').forEach((tab) =>{
    tab.addEventListener('click', (e) =>{
      document.querySelectorAll('.product-tab').forEach((pTab) =>{
        pTab.classList.remove('bg-gray-300')
      })
      e.target.classList.add('bg-gray-300')

      document.querySelectorAll('.product-tab-content').forEach((tContent) => {
        tContent.classList.add('hidden')
        tContent.classList.remove('block')
      })

      document.querySelector('#' + e.target.dataset.href).classList.add('block')
      document.querySelector('#' + e.target.dataset.href).classList.remove('hidden')
    })
  })

  // product tabs switching for mobile
  document.querySelectorAll('.product-tab-mobile').forEach((tab) =>{
    tab.addEventListener('click', (e) =>{
      document.querySelectorAll('.product-tab-mobile').forEach((i) =>{
        i.querySelector('i').classList.remove('transform')
        i.querySelector('i').classList.remove('rotate-180')
      })
      e.target.querySelector('i').classList.add('transform')
      e.target.querySelector('i').classList.add('rotate-180')

      document.querySelectorAll('.product-tab-content').forEach((tContent) => {
        tContent.classList.add('hidden')
        tContent.classList.remove('block')
      })

      document.querySelector('#' + e.target.dataset.href).classList.add('block')
      document.querySelector('#' + e.target.dataset.href).classList.remove('hidden')
    })
  })