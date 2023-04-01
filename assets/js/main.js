$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

});

        // smooth scroll

        if (!isBuilder) {
            document.addEventListener('click', function (e) {
                try {
                    var target = e.target;

                    if (target.parents().some(function(el) {el.classList.contains('carousel')})) {
                        return;
                    }
                    do {
                        if (target.hash) {
                            var useBody = /#bottom|#top/g.test(target.hash);
                            document.querySelector(useBody ? 'body' : target.hash).forEach(function (el) {
                                e.preventDefault();
                                // in css sticky navbar has height 64px
                                // var stickyMenuHeight = $('.mbr-navbar--sticky').length ? 64 : 0;
                                var stickyMenuHeight = target.parents().some(function(el) {
                                    return el.classList.contains('navbar-fixed-top')
                                }) ? 60 : 0;
                                var goTo = target.hash == '#bottom' ? (getHeight(el) - window.innerHeight) : (offset(el).top - stickyMenuHeight);
                                // Disable Accordion's and Tab's scroll
                                if (el.classList.contains('panel-collapse') || el.classList.contains('tab-pane')) {
                                    return;
                                }

                                // needs tests
                                window.scrollTo({
                                    top: goTo,
                                    left: 0,
                                    behavior: 'smooth'
                                });

                                /*
                                $('html, body').stop().animate({
                                    scrollTop: goTo
                                }, 800, 'easeInOutCubic');
                                */
                            });
                            break;
                        }
                    } while (target = target.parentNode);
                } catch (e) {
                    // throw e;
                }
            });
        }
        

	// audio

	// window.onload = function() {
	// 	document.getElementById("my_audio").play();
	// }