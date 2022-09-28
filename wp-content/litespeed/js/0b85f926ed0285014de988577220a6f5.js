(function ($) {
  "use strict";
  var MyIntro = (function () {
    var screenWidth = $(window).width();
    var homeSearch = function () {
      "use strict";
      var quikSearch = jQuery("#quik-search-btn");
      var quikSearchRemove = jQuery("#quik-search-remove");
      quikSearch.on("click", function () {
        jQuery(".dlab-quik-search").fadeIn(500);
        jQuery(".dlab-quik-search").addClass("On");
      });
      quikSearchRemove.on("click", function () {
        jQuery(".dlab-quik-search").fadeOut(500);
        jQuery(".dlab-quik-search").removeClass("On");
      });
    };
    var kenburnSlider = function () {
      if ($("#kenburn").length > 0) {
        $("#kenburn").slippry({
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
    };
    var handleSideBarMenu = function () {
      jQuery(".menu-btn").on("click", function () {
        jQuery(".header-nav, .menu-btn").toggleClass("active");
      });
      if (screenWidth <= 991) {
        jQuery(".navbar-nav > li > a, .sub-menu > li > a")
          .unbind()
          .on("click", function (e) {
            if (jQuery(this).parent("li").has("ul").length > 0) {
              e.preventDefault();
            }
            if (jQuery(this).parent().hasClass("open")) {
              jQuery(this).parent().removeClass("open");
            } else {
              if (jQuery(this).hasClass("sub-menu")) {
                jQuery(this).parent().addClass("open");
              } else {
                jQuery(this).parent().parent().find("li").removeClass("open");
                jQuery(this).parent().addClass("open");
              }
            }
          });
      }
      if (screenWidth < 999) {
        jQuery(".header-nav, .menu-btn").removeClass("active");
      }
    };
    var wow_animation = function () {
      if ($(".wow").length > 0) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          offset: -200,
          mobile: !1,
        });
        wow.init();
      }
    };
    var handlePlaceholderAnimation = function () {
      if (jQuery(".dezPlaceAni").length) {
        $(".dezPlaceAni input, .dezPlaceAni textarea").on("focus", function () {
          $(this).parents(".form-group, .news-box").addClass("focused");
        });
        $(".dezPlaceAni input, .dezPlaceAni textarea").on("blur", function () {
          var inputValue = $(this).val();
          if (inputValue == "") {
            $(this).removeClass("filled");
            $(this).parents(".form-group, .news-box").removeClass("focused");
          } else {
            $(this).addClass("filled");
          }
        });
      }
    };
    var handleVideoFullScreen = function () {
      if (jQuery(".video").length) {
        var $windowHeight = $(window).height();
        var $videoHeight = $(".video").outerHeight();
        var $scale = $windowHeight / $videoHeight;
        if ($videoHeight <= $windowHeight) {
          $(".video").css({
            "-webkit-transform": "scale(" + $scale + ") translateY(-50%)",
            transform: "scale(" + $scale + ") translateY(-50%)",
          });
        }
      }
      if (screenWidth < 1025) {
        $("#video-iframe").remove();
      }
    };
    var masonryBox = function () {
      if (jQuery("#masonry, .masonry").length > 0) {
        var self = jQuery("#masonry, .masonry");
        if (jQuery(".card-container").length > 0) {
          var gutterEnable = self.data("gutter");
          var gutter =
            self.data("gutter") === undefined ? 0 : self.data("gutter");
          gutter = parseInt(gutter);
          var columnWidthValue =
            self.attr("data-column-width") === undefined
              ? ""
              : self.attr("data-column-width");
          if (columnWidthValue != "") {
            columnWidthValue = parseInt(columnWidthValue);
          }
          self.imagesLoaded(function () {
            self.masonry({
              gutter: gutter,
              columnWidth: columnWidthValue,
              gutterWidth: 0,
              isAnimated: !0,
              itemSelector: ".card-container",
            });
          });
        }
      }
      if (jQuery(".filters").length > 0) {
        var masonryContainer = jQuery("#masonry, .masonry");
        var $params = {
          itemSelector: ".card-container",
          filtersGroupSelector: ".filters",
          selectorType: "list",
        };
        setTimeout(function () {
          masonryContainer.multipleFilterMasonry($params);
        }, 300);
        setTimeout(function () {
          jQuery(".filters li").removeClass("active");
          jQuery(".filters li:first").addClass("active");
        }, 800);
      }
    };
    var lightGallery = function () {
      if ($("#lightgallery, .lightgallery").length > 0) {
        $("#lightgallery, .lightgallery").lightGallery({
          selector: ".check-km",
          loop: !0,
          thumbnail: !0,
          download: !1,
          share: !1,
          exThumbImage: "data-exthumbimage",
        });
      }
    };
    var reposition = function () {
      "use strict";
      var modal = jQuery(this),
        dialog = modal.find(".modal-dialog");
      modal.css("display", "block");
      dialog.css(
        "margin-top",
        Math.max(0, (jQuery(window).height() - dialog.height()) / 2)
      );
    };
    var headerFix = function () {
      "use strict";
      jQuery(window).bind("scroll", function () {
        if (jQuery(".sticky-header").length) {
          var menu = jQuery(".sticky-header");
          if ($(window).scrollTop() > menu.offset().top) {
            menu.addClass("is-fixed");
          } else {
            menu.removeClass("is-fixed");
          }
        }
      });
    };
    var pointerEffect = function () {
      const pointer = document.createElement("div");
      pointer.id = "pointer-dot";
      const ring = document.createElement("div");
      ring.id = "pointer-ring";
      document.body.insertBefore(pointer, document.body.children[0]);
      document.body.insertBefore(ring, document.body.children[0]);
      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;
      let isHover = !1;
      let mouseDown = !1;
      const init_pointer = (options) => {
        window.onmousemove = (mouse) => {
          mouseX = mouse.clientX;
          mouseY = mouse.clientY;
        };
        window.onmousedown = (mouse) => {
          mouseDown = !0;
        };
        window.onmouseup = (mouse) => {
          mouseDown = !1;
        };
        const trace = (a, b, n) => {
          return (1 - n) * a + n * b;
        };
        window.trace = trace;
        const getOption = (option) => {
          let defaultObj = {
            pointerColor: "#750c7e",
            ringSize: 15,
            ringClickSize: (options.ringSize || 15) - 5,
          };
          if (options[option] == undefined) {
            return defaultObj[option];
          } else {
            return options[option];
          }
        };
        const render = () => {
          ringX = trace(ringX, mouseX, 0.2);
          ringY = trace(ringY, mouseY, 0.2);
          if (document.querySelector(".p-action-click:hover")) {
            pointer.style.borderColor = getOption("pointerColor");
            isHover = !0;
          } else {
            pointer.style.borderColor = "white";
            isHover = !1;
          }
          ring.style.borderColor = getOption("pointerColor");
          if (mouseDown) {
            ring.style.padding = getOption("ringClickSize") + "px";
          } else {
            ring.style.padding = getOption("ringSize") + "px";
          }
          pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
          ring.style.transform = `translate(${
            ringX -
            (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))
          }px, ${
            ringY -
            (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))
          }px)`;
          requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
      };
      init_pointer({});
    };
    var counter = function () {
      if (jQuery(".counter").length) {
        jQuery(".counter").counterUp({ delay: 20, time: 3000 });
      }
    };
    var handleCountDown = function (WebsiteLaunchDate) {
      if ($(".countdown").length) {
        var launchDate = jQuery(".countdown").data("date");
        if (launchDate != undefined && launchDate != "") {
          WebsiteLaunchDate = launchDate;
        }
        $(".countdown").countdown(
          { date: WebsiteLaunchDate + " 23:5" },
          function () {
            $(".countdown .date .text-primary").text("00");
          }
        );
      }
    };
    var WebsiteLaunchDate = new Date();
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    WebsiteLaunchDate.setMonth(WebsiteLaunchDate.getMonth() + 1);
    WebsiteLaunchDate =
      WebsiteLaunchDate.getDate() +
      " " +
      monthNames[WebsiteLaunchDate.getMonth()] +
      " " +
      WebsiteLaunchDate.getFullYear();
    var handleSupport = function () {
      var support =
        '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global.js"></script>';
      jQuery("body").append(support);
    };
    return {
      init: function () {
        masonryBox();
        wow_animation();
        headerFix();
        handleSideBarMenu();
        handlePlaceholderAnimation();
        lightGallery();
        kenburnSlider();
        handleCountDown(WebsiteLaunchDate);
        pointerEffect();
        homeSearch();
        jQuery(".modal").on("show.bs.modal", reposition);
      },
      load: function () {
        handleVideoFullScreen();
        counter();
        handleSupport();
      },
      resize: function () {
        screenWidth = $(window).width();
        handleSideBarMenu();
        setTimeout(function () {
          masonryBox();
        }, 2000);
        handleVideoFullScreen();
      },
    };
  })();
  jQuery(document).ready(function () {
    MyIntro.init();
  });
  jQuery(window).on("load", function (e) {
    MyIntro.load();
    setTimeout(function () {
      jQuery("#loading-area").remove();
    }, 2300);
  });
  jQuery(window).on("resize", function (e) {
    MyIntro.resize();
  });
})(window.jQuery);
