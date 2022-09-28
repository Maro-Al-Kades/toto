function handletestimonialSlider() {
  if (jQuery(".testimonial-one").length > 0) {
    jQuery(".testimonial-one").owlCarousel({
      loop: !0,
      autoplaySpeed: 3000,
      navSpeed: 3000,
      paginationSpeed: 3000,
      slideSpeed: 3000,
      smartSpeed: 3000,
      autoplay: 3000,
      margin: 40,
      nav: !1,
      dots: !0,
      navText: [
        '<i class="ti-arrow-left"></i>',
        '<i class="ti-arrow-right"></i>',
      ],
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        767: { items: 1 },
        1200: { items: 2 },
      },
    });
  }
}
function handleKenburnSlider() {
  if (jQuery("#kenburn").length > 0) {
    jQuery("#kenburn").slippry({
      transition: "kenburns",
      useCSS: !1,
      speed: 3000,
      pause: 3000,
      auto: !0,
      kenZoom: 105,
      preload: "visible",
      autoHover: !1,
    });
  }
}
function handlePostSwiper() {
  if (jQuery(".post-swiper").length > 0) {
    var swiper = new Swiper(".post-swiper", {
      speed: 1500,
      parallax: !0,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: !0,
      autoplay: { delay: 3000 },
      navigation: {
        nextEl: ".next-post-swiper-btn",
        prevEl: ".prev-post-swiper-btn",
      },
    });
  }
}
function handlePostSlider2() {
  if (jQuery(".post-swiper-thumb").length > 0) {
    var galleryTop = new Swiper(".post-swiper-thumb", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: !0,
      loopedSlides: 4,
    });
    var galleryThumbs = new Swiper(".post-swiper-thumbs", {
      spaceBetween: 10,
      centeredSlides: !0,
      slidesPerView: "auto",
      touchRatio: 0.2,
      slideToClickedSlide: !0,
      loop: !0,
      loopedSlides: 4,
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
  }
}
function handleServiceSlider2() {
  if (jQuery(".service-swiper").length > 0) {
    var swiper = new Swiper(".service-swiper", {
      speed: 1500,
      parallax: !0,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: !0,
      autoplay: { delay: 3000 },
      navigation: {
        nextEl: ".next-service-swiper-btn",
        prevEl: ".prev-service-swiper-btn",
      },
    });
  }
}
jQuery(window).on("load", function () {
  handletestimonialSlider();
  handlePostSlider2();
  handleServiceSlider2();
  handleKenburnSlider();
});
