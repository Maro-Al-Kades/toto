(function ($) {
  "use strict";
  $.fn.rebuildLightGallery = function () {
    var getItems = function (ins) {
      if (ins.s.dynamic) {
        return ins.s.dynamicEl;
      } else {
        if (ins.s.selector === "this") {
          return ins.$el;
        } else if (ins.s.selector !== "") {
          if (ins.s.selectWithin) {
            return $(ins.s.selectWithin).find(ins.s.selector);
          } else {
            return ins.$el.find($(ins.s.selector));
          }
        } else {
          return ins.$el.children();
        }
      }
    };
    return this.each(function () {
      var ins = $(this).data("lightGallery");
      var lglength = ins.$items.length;
      var cc = getItems(ins);
      if (lglength != cc.length) {
        ins.$items = cc;
        $("#lg-counter").remove();
        ins.counter();
        for (var i = lglength; i < ins.$items.length; i++) {
          $(".lg-inner").append('<div class="lg-item"></div>');
        }
        if (ins.$outer) {
          ins.$slide = ins.$outer.find(".lg-item");
          if (ins.modules.zoom) {
            $("#lg-zoom-in, #lg-zoom-out, #lg-actual-size").remove();
            ins.modules.zoom.destroy();
            ins.modules.zoom = new $.fn.lightGallery.modules.zoom(ins.el);
          }
          if (ins.modules.Thumbnail) {
            if (ins.lGalleryOn) {
              ins.modules.Thumbnail.destroy();
              ins.modules.Thumbnail = new $.fn.lightGallery.modules.Thumbnail(
                ins.el
              );
              ins.lGalleryOn = !1;
              ins.modules.Thumbnail.animateThumb(ins.index);
              ins.lGalleryOn = !0;
            }
          }
        }
      }
    });
  };
})(window.jQuery);
