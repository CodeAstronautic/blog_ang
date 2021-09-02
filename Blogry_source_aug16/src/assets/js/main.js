(function ($) {
	'use strict';

	/*-----------------------------
	=== ALL ESSENTIAL FUNCTIONS ===
	------------------------------*/
	// ===== 01. Post masonary
	function postMasonary() {
		$('#postWarpperLoaded').imagesLoaded(function () {
			$('.masonary-posts').isotope();
		});
	}

	// ===== 02. Post masonary
	function sidebarMasonary() {
		$('#postWarpperLoaded').imagesLoaded(function () {
			$('.sidebar-masonary').isotope();
		});
	}

	// ===== 03. Menu Click Functions
	function menuClickFun() {
		var panelBtn = $('.panel-btn'),
			panelClose = $('.panel-close'),
			panelArea = $('.offcanvas-panel'),
			panelOverly = $('.panel-overly'),
			panelMenu = $('.offcanvas-menu');

		panelBtn.on('click', function (e) {
			e.preventDefault();
			panelArea.addClass('panel-open');
		});

		panelClose.on('click', function (e) {
			e.preventDefault();
			panelArea.removeClass('panel-open');
		});

		panelOverly.on('click', function (e) {
			e.preventDefault();
			panelArea.removeClass('panel-open');
		});

		panelMenu.find('li a').each(function () {
			if ($(this).next().length > 0) {
				$(this).parent('li').append('<span class="dd-trigger"><i class="fal fa-angle-down"></i></span>');
			}
		});

		panelMenu.find('li .dd-trigger').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('open').parent('li').children('ul').stop(true, true).slideToggle(350);
		});

		var searchBtn = $('.search-btn'),
			searchForm = $('.search-form'),
			searchClose = $('.search-close'),
			searchOverly = $('.search-overly');

		searchBtn.on('click', function (e) {
			e.preventDefault();
			searchForm.addClass('search-open');
		});

		searchClose.on('click', function (e) {
			e.preventDefault();
			searchForm.removeClass('search-open');
		});

		searchOverly.on('click', function (e) {
			e.preventDefault();
			searchForm.removeClass('search-open');
		});
	}

	// ===== 07. Photo stories
	function photoStories() {
		$('#photoStoriesLoaded').imagesLoaded(function () {
			// Active isotope
			var items = $('.photo-stories').isotope({
				itemSelector: '.photo-item',
				masonry: {
					columnWidth: '.photo-item',
				},
			});
			// items on button click
			$('.photo-stories-nav').on('click', 'li', function () {
				var filterValue = $(this).attr('data-filter');
				items.isotope({
					filter: filterValue
				});
			});
			// menu active class
			$('.photo-stories-nav li').on('click', function (event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

			$('.photo-view').magnificPopup({
			});

			$('.photo-stories').magnificPopup({
				delegate: 'a',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				gallery: {
					enabled: true
				},
			});
		});
	}

	// ===== 08. Sticky Header
	function stickyHeader() {
		var sticky = $('header.sticky-header');
		var scrollFromtop = $(window).scrollTop();
		var scrollLimit = $('header').height() + 10;

		if (scrollFromtop < scrollLimit) {
			sticky.removeClass('sticky-on');
		} else {
			sticky.addClass('sticky-on');
		}
	}
	/*--------------------
	=== WINDOW SCROLL  ===
	----------------------*/
	$(window).on('scroll', function () {
		stickyHeader();
	});
	/*---------------------
	=== DOCUMENT READY  ===
	----------------------*/
	$(document).ready(function () {
		menuClickFun();
		photoStories();
	});

})(jQuery);
