(function ($) {
  "use strict";
  var DZWPScript = (function () {
    var screenWidth = jQuery(window).width();
    if (typeof myintro_js_data == "undefined") {
      var siteUrl = "/";
      var cart_on_mobile = !1;
      var rtl_on = !1;
      var login_on_mobile = !1;
      var register_on_mobile = !1;
      var header_social_link_on_mobile = !1;
    } else {
      var siteUrl = myintro_js_data.template_directory_uri + "/";
      var cart_on_mobile = myintro_js_data.cart_on_mobile;
      var rtl_on = myintro_js_data.rtl_on;
      var login_on_mobile = myintro_js_data.login_on_mobile;
      var register_on_mobile = myintro_js_data.register_on_mobile;
      var header_social_link_on_mobile =
        myintro_js_data.header_social_link_on_mobile;
    }
    var themeWorkOnMobile = function () {
      if (screenWidth <= 991) {
        if (login_on_mobile == "No") {
          jQuery(".dz-login-btn").hide();
        }
        if (register_on_mobile == "No") {
          jQuery(".dz-register-btn").hide();
        }
        if (header_social_link_on_mobile == "No") {
          jQuery(".dz-social-link").hide();
        }
      } else {
        jQuery(".dz-login-btn, .dz-register-btn, .dz-social-link").show();
      }
    };
    var handleMegaMenu = function () {
      function load_mega_menu_posts() {
        var cat_slug = jQuery(this).attr("id").split("st_")[1];
        var posts_per_page = parseInt(jQuery(this).data("posts-per-page"));
        var cat_id = parseInt(jQuery(this).data("cat-id"));
        var images_only = jQuery(this).data("images-only");
        var data = {
          action: "load_mega_menu_posts_by_ajax",
          page: 1,
          posts_per_page: posts_per_page,
          posts_in_categories: cat_id,
          mega_menu_images_only: images_only,
          security: myintro_js_data.ajax_security_nonce,
        };
        jQuery.ajax({
          method: "POST",
          url: myintro_js_data.admin_ajax_url,
          type: "JSON",
          data: data,
          beforeSend: function (xhr) {
            jQuery("#" + cat_slug).html("<div class='dz-menu-loading' ></div>");
          },
          success: function (response) {
            if (response) {
              jQuery("#" + cat_slug).html(response);
            }
          },
          complete: function () {
            header_blog_carousel();
          },
        });
      }
      if (jQuery("a.post-tabs").length > 0) {
        jQuery("a.post-tabs").off("mouseover", load_mega_menu_posts);
        jQuery("a.post-tabs").on("mouseover", load_mega_menu_posts);
      }
    };
    var handleLoadMore = function () {
      function load_more_posts() {
        jQuery("a.dz-load-more").on("click", function () {
          jQuery(this).addClass("active");
          var loadMoreBtnId = jQuery(this).attr("id");
          var post_type = jQuery(this).data("post-type");
          var ajax_container = jQuery(this).data("ajax-container");
          var blog_view = jQuery(this).data("blog-view");
          var max_num_pages = parseInt(jQuery(this).data("max-num-pages"));
          var posts_per_page = parseInt(jQuery(this).data("posts-per-page"));
          var posts_image_preference = jQuery(this).data("image-preference");
          var post_by_label = jQuery(this).data("post-by-label");
          var post_order = jQuery(this).data("post-order");
          var post_order_by = jQuery(this).data("post-order-by");
          var posts_in_categories = jQuery(this).data("posts-in-categories");
          var side_bar = jQuery(this).data("side-bar");
          var title_text_limit = jQuery(this).data("title-text-limit");
          var description_text_limit = jQuery(this).data(
            "description-text-limit"
          );
          var show_date = jQuery(this).data("show-date");
          var show_author = jQuery(this).data("show-author");
          var show_comment = jQuery(this).data("show-comment");
          var element_style = jQuery(this).data("element-style");
          var show_share = jQuery(this).data("show-share");
          var show_column = jQuery(this).data("show-column");
          var data = {
            action: "load_posts_by_ajax",
            page: page_no,
            post_type: post_type,
            blog_view: blog_view,
            posts_per_page: posts_per_page,
            max_num_pages: max_num_pages,
            posts_in_categories: posts_in_categories,
            posts_image_preference: posts_image_preference,
            post_by_label: post_by_label,
            post_order: post_order,
            post_order_by: post_order_by,
            side_bar: side_bar,
            title_text_limit: title_text_limit,
            description_text_limit: description_text_limit,
            show_date: show_date,
            show_author: show_author,
            show_comment: show_comment,
            show_share: show_share,
            show_column: show_column,
            element_style: element_style,
            security: myintro_js_data.ajax_security_nonce,
          };
          var remove_loadmore_button = !1;
          jQuery.ajax({
            method: "POST",
            url: myintro_js_data.admin_ajax_url,
            type: "JSON",
            data: data,
            beforeSend: function (xhr) {},
            success: function (response) {
              if (response) {
                var content = jQuery(response);
                if (jQuery("#" + ajax_container).hasClass("masonry")) {
                  jQuery("#" + ajax_container)
                    .append(content)
                    .masonry("appended", content);
                } else {
                  jQuery("#" + ajax_container).append(content);
                  jQuery("#" + ajax_container + " div.hide-items")
                    .show("slow")
                    .removeClass(" hide-items ");
                }
                setTimeout(function () {
                  lightGallery();
                }, 1000);
                if (page_no < max_num_pages) {
                  page_no++;
                } else {
                  remove_loadmore_button = !0;
                }
              } else {
                remove_loadmore_button = !0;
              }
            },
            error: function (response) {
              alert(
                "Error in your ajax, plz check thirdparty plugins file for correct file path"
              );
            },
            fail: function (response) {
              alert(
                "Error in your ajax, plz check thirdparty plugins file for correct file path"
              );
            },
            complete: function () {
              jQuery("#" + loadMoreBtnId).removeClass("active");
              if (remove_loadmore_button) {
                jQuery("#" + loadMoreBtnId)
                  .html("No More Post Available")
                  .addClass("disabled");
              }
            },
          });
          return !1;
        });
      }
      if (jQuery("a.dz-load-more").length > 0) {
        load_more_posts();
        var page_no = 2;
      }
    };
    var handleCommonPageLoadMore = function () {
      function load_common_page_posts_ajax() {
        var max_num_pages = parseInt(
          jQuery("a.common-page-dz-load-more").data("max-num-pages")
        );
        var posts_per_page = parseInt(
          jQuery("a.common-page-dz-load-more").data("posts-per-page")
        );
        var common_page_type = jQuery("a.common-page-dz-load-more").data(
          "common-page-type"
        );
        var post_order = jQuery("a.common-page-dz-load-more").data("order");
        var post_order_by = jQuery("a.common-page-dz-load-more").data(
          "orderby"
        );
        var data = {
          action: "load_common_page_posts_ajax",
          page: page_no,
          page_view: jQuery("a.common-page-dz-load-more").data(
            "common-page-view"
          ),
          posts_per_page: posts_per_page,
          orderby: post_order_by,
          order: post_order,
          security: myintro_js_data.ajax_security_nonce,
        };
        var remove_loadmore_button = !1;
        if (
          typeof jQuery("a.common-page-dz-load-more").data("object-data") !=
          undefined
        ) {
          var object_data = jQuery("a.common-page-dz-load-more").data(
            "object-data"
          );
          jQuery.extend(data, { object_data: object_data });
        }
        jQuery.ajax({
          method: "POST",
          url: myintro_js_data.admin_ajax_url,
          type: "JSON",
          data: data,
          beforeSend: function (xhr) {
            jQuery("a.common-page-dz-load-more").html(
              'LOAD MORE <i class="fa fa-refresh fas fa-spinner fa-spin"></i>'
            );
          },
          success: function (response) {
            if (response) {
              var content = jQuery(response);
              if (
                jQuery("#masonry").length > 0 ||
                jQuery(".masonry").length > 0
              ) {
                setTimeout(function () {
                  jQuery("div.loadmore-content")
                    .append(content)
                    .masonry("appended", content);
                }, 500);
              } else {
                jQuery("div.loadmore-content").append(content);
                jQuery("div.loadmore-content div.hide-items")
                  .show("slow")
                  .removeClass(" hide-items ");
              }
              setTimeout(function () {}, 800);
              if (page_no < max_num_pages) {
                page_no++;
                setTimeout(function () {
                  jQuery("a.common-page-dz-load-more").text("Load More");
                }, 550);
              } else {
                remove_loadmore_button = !0;
              }
            } else {
              remove_loadmore_button = !0;
            }
          },
          complete: function () {
            jQuery("a.common-page-dz-load-more").removeClass("active");
            if (remove_loadmore_button) {
              jQuery("a.common-page-dz-load-more")
                .html("No More Post Available")
                .addClass("disabled");
            }
          },
        });
      }
      if (jQuery("a.common-page-dz-load-more").length > 0) {
        var page_no = 2;
        jQuery("a.common-page-dz-load-more").off(
          "click",
          load_common_page_posts_ajax
        );
        jQuery("a.common-page-dz-load-more").on(
          "click",
          load_common_page_posts_ajax
        );
      }
    };
    var handleIndexPageLoadMore = function () {
      function load_latest_posts_ajax() {
        var max_num_pages = parseInt(
          jQuery("a.latest-post-dz-load-more").data("max-num-pages")
        );
        var posts_per_page = parseInt(
          jQuery("a.latest-post-dz-load-more").data("posts-per-page")
        );
        var data = {
          action: "load_latest_posts_ajax",
          page: page_no,
          posts_per_page: posts_per_page,
          security: myintro_js_data.ajax_security_nonce,
        };
        var remove_loadmore_button = !1;
        jQuery.ajax({
          method: "POST",
          url: myintro_js_data.admin_ajax_url,
          type: "JSON",
          data: data,
          beforeSend: function (xhr) {
            jQuery("a.latest-post-dz-load-more").html(
              'LOAD MORE <i class="fa fa-refresh fas fa-spinner fa-spin"></i>'
            );
          },
          success: function (response) {
            if (response) {
              var content = jQuery(response);
              if (jQuery("#masonry").length > 0) {
                setTimeout(function () {
                  jQuery("div.loadmore-content")
                    .append(content)
                    .masonry("appended", content);
                }, 500);
              } else {
                jQuery("div.loadmore-content").append(content);
                jQuery("div.loadmore-content div.hide-items")
                  .show("slow")
                  .removeClass(" hide-items ");
              }
              setTimeout(function () {}, 800);
              if (page_no < max_num_pages) {
                page_no++;
                setTimeout(function () {
                  jQuery("a.latest-post-dz-load-more").text("Load More");
                }, 550);
              } else {
                remove_loadmore_button = !0;
              }
            } else {
              remove_loadmore_button = !0;
            }
          },
          complete: function () {
            jQuery("a.latest-post-dz-load-more").removeClass("active");
            if (remove_loadmore_button) {
              jQuery("a.latest-post-dz-load-more")
                .html("No More Post Available")
                .addClass("disabled");
            }
          },
        });
      }
      if (jQuery("a.latest-post-dz-load-more").length > 0) {
        var page_no = 2;
        jQuery("a.latest-post-dz-load-more").off(
          "click",
          load_latest_posts_ajax
        );
        jQuery("a.latest-post-dz-load-more").on(
          "click",
          load_latest_posts_ajax
        );
      }
    };
    var lightGallery = function () {
      var lgallery = jQuery("#lightgallery, .lightgallery");
      if (lgallery.length > 0) {
        lgallery.rebuildLightGallery();
        lgallery.lightGallery({
          selector: ".lightimg",
          loop: !0,
          thumbnail: !0,
          exThumbImage: "data-exthumbimage",
        });
      }
    };
    var header_blog_carousel = function () {
      jQuery(".header-blog-carousel").owlCarousel({
        loop: !0,
        margin: 20,
        autoplaySpeed: 3000,
        navSpeed: 3000,
        paginationSpeed: 3000,
        slideSpeed: 3000,
        smartSpeed: 3000,
        autoplay: 3000,
        nav: !0,
        dots: !1,
        rtl: rtl_on == "Yes" ? true : !1,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>',
        ],
        responsive: {
          0: { items: 1, margin: 10, center: !0, stagePadding: 30 },
          480: { items: 1, margin: 10, center: !0, stagePadding: 30 },
          1024: { items: 3 },
          1200: { items: 4 },
          1400: { items: 4 },
        },
      });
    };
    var handleSubscription = function () {
      jQuery(".dz-subscription").on("submit", function (e) {
        e.preventDefault();
        var formSelector = jQuery(this);
        var data = jQuery(this).serializeArray();
        data.push({ name: "action", value: "dz_mailchimp" });
        formSelector
          .find(".dz-loading")
          .removeClass("d-none")
          .addClass("active");
        formSelector.find(".input-group").addClass("dz-ajax-overlay");
        jQuery.ajax({
          type: "post",
          url: myintro_js_data.admin_ajax_url,
          data: data,
          success: function (response) {
            formSelector[0].reset();
            formSelector
              .find(".dz-subscription-msg")
              .hide("slow")
              .html(response)
              .show("slow");
            formSelector
              .find(".dz-loading")
              .addClass("d-none")
              .removeClass("active");
            formSelector.find(".input-group").removeClass("dz-ajax-overlay");
            setTimeout(function () {
              formSelector.find(".dz-subscription-msg").hide("slow");
            }, 5000);
          },
        });
      });
    };
    var cartButton = function () {
      $(".shop-cart")
        .off()
        .on("click", ".cart-btn", function (e) {
          e.preventDefault();
          $(".minicart").slideToggle("slow");
        });
      setTimeout(function () {
        $(".cart-btn i:first")
          .removeClass("fa fa-shopping-bag")
          .addClass("ti ti-shopping-cart");
      }, 1000);
      if (screenWidth <= 991 && cart_on_mobile == "No") {
        jQuery(".shop-cart").hide();
      } else {
        jQuery(".shop-cart").show();
      }
    };
    return {
      init: function () {
        handleMegaMenu();
        handleLoadMore();
        handleCommonPageLoadMore();
        handleIndexPageLoadMore();
        handleSubscription();
        cartButton();
      },
      load: function () {
        themeWorkOnMobile();
      },
      resize: function () {
        screenWidth = $(window).width();
        cartButton();
        themeWorkOnMobile();
      },
    };
  })();
  jQuery(document).ready(function () {
    "use strict";
    DZWPScript.init();
  });
  jQuery(window).on("load", function () {
    "use strict";
    DZWPScript.load();
  });
  jQuery(window).on("resize", function () {
    "use strict";
    DZWPScript.resize();
  });
})(jQuery);
