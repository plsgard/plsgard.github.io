/* ===================================================================
 * Glint - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {
  "use strict";

  var cfg = {
      scrollDuration: 800 // smoothscroll duration
    },
    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* Preloader
     * -------------------------------------------------- */
  var clPreloader = function() {
    $("html").addClass("cl-preload");

    $WIN.on("load", function() {
      //force page scroll position to top at page refresh
      // $('html, body').animate({ scrollTop: 0 }, 'normal');

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function() {
        // will fade out the whole DIV that covers the website.
        $("#preloader")
          .delay(300)
          .fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("cl-preload");
      $("html").addClass("cl-loaded");
    });
  };

  /* Menu on Scrolldown
     * ------------------------------------------------------ */
  var clMenuOnScrolldown = function() {
    var menuTrigger = $(".header-menu-toggle");

    $WIN.on("scroll", function() {
      if ($WIN.scrollTop() > 150) {
        menuTrigger.addClass("opaque");
      } else {
        menuTrigger.removeClass("opaque");
      }
    });
  };

  /* OffCanvas Menu
     * ------------------------------------------------------ */
  var clOffCanvas = function() {
    var menuTrigger = $(".header-menu-toggle"),
      nav = $(".header-nav"),
      closeButton = nav.find(".header-nav__close"),
      siteBody = $("body"),
      mainContents = $("section, footer");

    // open-close menu by clicking on the menu icon
    menuTrigger.on("click", function(e) {
      e.preventDefault();
      // menuTrigger.toggleClass('is-clicked');
      siteBody.toggleClass("menu-is-open");
    });

    // close menu by clicking the close button
    closeButton.on("click", function(e) {
      e.preventDefault();
      menuTrigger.trigger("click");
    });

    // close menu clicking outside the menu itself
    siteBody.on("click", function(e) {
      if (
        !$(e.target).is(
          ".header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span"
        )
      ) {
        // menuTrigger.removeClass('is-clicked');
        siteBody.removeClass("menu-is-open");
      }
    });
  };

  /* photoswipe
     * ----------------------------------------------------- */
  var clPhotoswipe = function() {
    var items = [],
      $pswp = $(".pswp")[0],
      $folioItems = $(".item-folio");

    // get items
    $folioItems.each(function(i) {
      var $folio = $(this),
        $thumbLink = $folio.find(".thumb-link"),
        $title = $folio.find(".item-folio__title"),
        $caption = $folio.find(".item-folio__caption"),
        $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
        $captionText = $.trim($caption.html()),
        $href = $thumbLink.attr("href"),
        $size = $thumbLink.data("size").split("x"),
        $width = $size[0],
        $height = $size[1];

      var item = {
        src: $href,
        w: $width,
        h: $height
      };

      if ($caption.length > 0) {
        item.title = $.trim($titleText + $captionText);
      }

      items.push(item);
    });

    // bind click event
    $folioItems.each(function(i) {
      $(this).on("click", function(e) {
        e.preventDefault();
        var options = {
          index: i,
          showHideOpacity: true
        };

        // initialize PhotoSwipe
        var lightBox = new PhotoSwipe(
          $pswp,
          PhotoSwipeUI_Default,
          items,
          options
        );
        lightBox.init();
      });
    });
  };

  /* Stat Counter
     * ------------------------------------------------------ */
  var clStatCount = function() {
    var statSection = $(".about-stats"),
      stats = $(".stats__count");

    statSection.waypoint({
      handler: function(direction) {
        if (direction === "down") {
          stats.each(function() {
            var $this = $(this);
            var toUp = !($this.data("count-direction") == "down");
            $({ Counter: toUp ? 0 : $this.text() }).animate(
              { Counter: toUp ? $this.text() : 0 },
              {
                duration: 3500,
                easing: "swing",
                step: function(curValue) {
                  $this.text(Math.ceil(curValue));
                },
                complete: function() {
                  var text = $this.data("text");
                  if (text) $this.text(text);
                }
              }
            );
          });
        }

        // trigger once only
        this.destroy();
      },

      offset: "85%"
    });
  };

  /* Masonry
     * ---------------------------------------------------- */
  var clMasonryFolio = function() {
    var containerBricks = $(".masonry");

    containerBricks.imagesLoaded(function() {
      containerBricks.masonry({
        itemSelector: ".masonry__brick",
        resize: true
      });
    });
  };

  /* slick slider
     * ------------------------------------------------------ */
  var clSlickSlider = function() {
    $(".clients").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnFocus: false,
      autoplaySpeed: 1000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  };

  /* Smooth Scrolling
     * ------------------------------------------------------ */
  var clSmoothScroll = function() {
    $(".smoothscroll").on("click", function(e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function() {
          // check if menu is open
          if ($("body").hasClass("menu-is-open")) {
            $(".header-menu-toggle").trigger("click");
          }

          window.location.hash = target;
        });
    });
  };

  /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
  var clPlaceholder = function() {
    $("input, textarea, select").placeholder();
  };

  /* Alert Boxes
     * ------------------------------------------------------ */
  var clAlertBoxes = function() {
    $(".alert-box").on("click", ".alert-box__close", function() {
      $(this)
        .parent()
        .fadeOut(500);
    });
  };

  /* Contact Form
     * ------------------------------------------------------ */
  var clContactForm = function() {
    function validateHuman(honeypot) {
      if (honeypot) {
        //if hidden form filled up
        //log("Robot Detected!");
        return true;
      } else {
        //console.log("Welcome Human!");
      }
    }

    // get all data in form and return object
    function getFormData() {
      var form = document.getElementById("contactForm");
      var elements = form.elements; // all form elements
      var fields = Object.keys(elements)
        .map(function(k) {
          if (elements[k].name !== undefined) {
            return elements[k].name;
            // special case for Edge's html collection
          } else if (elements[k].length > 0) {
            return elements[k].item(0).name;
          }
        })
        .filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });
      var data = {};
      fields.forEach(function(k) {
        data[k] = elements[k].value;
        var str = ""; // declare empty string outside of loop to allow
        // it to be appended to for each item in the loop
        if (elements[k].type === "checkbox") {
          // special case for Edge's html collection
          str = str + elements[k].checked + ", "; // take the string and append
          // the current checked value to
          // the end of it, along with
          // a comma and a space
          data[k] = str.slice(0, -2); // remove the last comma and space
          // from the  string to make the output
          // prettier in the spreadsheet
        } else if (elements[k].length) {
          for (var i = 0; i < elements[k].length; i++) {
            if (elements[k].item(i).checked) {
              str = str + elements[k].item(i).value + ", "; // same as above
              data[k] = str.slice(0, -2);
            }
          }
        }
      });

      // add form-specific values into the data
      data.formDataNameOrder = JSON.stringify(fields);
      data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      data.formGoogleSendEmail = form.dataset.email || ""; // no email by default

      //console.log(data);
      return data;
    }

    function handleFormSubmit(event) {
      // handles form submit withtout any jquery
      event.preventDefault(); // we are submitting via xhr below
      var data = getFormData(); // get the values submitted in the form

      var sLoader = $(".submit-loader");

      if (validateHuman(data.honeypot)) {
        //if form is filled, form will not be submitted
        return false;
      }

      var $form = $("#contactForm");
      $form.validate();
      if (!$form.valid()) {
        // if email is not valid show error
        return false;
      } else {
        var url = event.target.action; //
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.onreadystatechange = function() {
          //   console.log(xhr.status, xhr.statusText);
          //   console.log(xhr.responseText);
          if (xhr.status === 200) {
            // document.getElementById('contactForm').style.display = 'none'; // hide form
            // document.getElementById('thankyou_message').style.display = 'block';
            sLoader.slideUp("slow");
            $(".message-warning").fadeOut();
            $("#contactForm").fadeOut();
            $(".message-success").fadeIn();
          } else {
            sLoader.slideUp("slow");
            $(".message-warning").html(xhr.responseText);
            $(".message-warning").slideDown("slow");
          }
          return;
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data)
          .map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          })
          .join("&");
        xhr.send(encoded);
      }
    }
    function loaded() {
      //console.log("contact form submission handler loaded successfully");
      // bind to the submit event of our form
      var form = document.getElementById("contactForm");
      form.addEventListener("submit", handleFormSubmit, false);
    }
    document.addEventListener("DOMContentLoaded", loaded, false);
  };

  /* Animate On Scroll
     * ------------------------------------------------------ */
  var clAOS = function() {
    AOS.init({
      offset: 120,
      duration: 600,
      easing: "ease-in-sine",
      delay: 300,
      once: true,
      disable: "mobile"
    });
  };

  /* Back to Top
     * ------------------------------------------------------ */
  var clBackToTop = function() {
    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $(".go-top");

    // Show or hide the sticky footer button
    $(window).on("scroll", function() {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };

  /* Initialize
     * ------------------------------------------------------ */
  (function ssInit() {
    clPreloader();
    clMenuOnScrolldown();
    clOffCanvas();
    clPhotoswipe();
    clStatCount();
    clMasonryFolio();
    clSlickSlider();
    clSmoothScroll();
    clPlaceholder();
    clAlertBoxes();
    clContactForm();
    clAOS();
    clBackToTop();
  })();
})(jQuery);
