(function ($) {
  "use strict";
  $.fn.multipleFilterMasonry = function (options) {
    var cache = [];
    var filters = [];
    if (options.selectorType === "list") {
      $(options.filtersGroupSelector)
        .children()
        .each(function () {
          filters.push($(this).data("filter"));
        });
    }
    var init = function ($container) {
      $container.find(options.itemSelector).each(function () {
        cache.push($(this));
      });
      $container.masonry(options);
    };
    var filterItems = function (selector) {
      var result = [];
      $(cache).each(function (item) {
        $(selector).each(function (index, sel) {
          if (cache[item].is(sel)) {
            if ($.inArray(cache[item], result) === -1) result.push(cache[item]);
          }
        });
      });
      return result;
    };
    var reload = function ($container, items) {
      $container.empty();
      $(items).each(function () {
        $($container).append($(this));
      });
      $container.masonry("reloadItems");
      setTimeout(function () {
        $container.masonry();
      }, 400);
      if ($("#lightgallery, .lightgallery").length > 0) {
        $("#lightgallery, .lightgallery").lightGallery({
          selector: ".lightimg",
          loop: !0,
          thumbnail: !0,
          exThumbImage: "data-exthumbimage",
        });
      }
    };
    var hashFilter = function ($container) {
      var hash = window.location.hash.replace("#", "");
      if ($.inArray(hash, filters) !== -1) {
        reload($container, $("." + hash));
      }
    };
    var proc = function ($container) {
      var btns = $(options.filtersGroupSelector).find('input[type="radio"]');
      btns.each(function () {
        $(this).on("change", function () {
          var selector = [];
          btns.removeClass("active");
          btns.each(function () {
            if ($(this).is(":checked")) {
              $(this).addClass("active");
              selector.push("." + $(this).val());
            }
          });
          var items = cache;
          if (selector.length > 0) {
            items = filterItems(selector);
          }
          reload($container, items);
        });
      });
    };
    var procUL = function ($container) {
      var btns = $(options.filtersGroupSelector).children();
      btns.each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          btns.removeClass("active");
          var dataFilter = $(this).data("filter");
          var selector = [];
          if (dataFilter != "") {
            selector.push("." + dataFilter);
          }
          $(this).addClass("active");
          var items = cache;
          if (selector.length > 0) {
            items = filterItems(selector);
          }
          reload($container, items);
        });
      });
      hashFilter($container);
      btns.removeClass("active");
      $(
        '.filters li[data-filter="' +
          window.location.hash.replace("#", "") +
          '"]'
      ).addClass("active");
    };
    return this.each(function () {
      var $$ = $(this);
      init($$);
      options.selectorType === "list" ? procUL($$) : proc($$);
    });
  };
})(window.jQuery);
