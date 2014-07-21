$(function(){
	$(".slides").each(function(){
		var slider = this,
			$items = $(".slide",this),
			current = -1,
			slider__timer = null,
			slider_hovered = false,
			slider_animated = false,
			interval = $(this).data("interval"),
			$advantages = $(".advantages__items")
			;


		$(this).mouseenter(function() {
			slider_hovered = true;
			clearTimeout( slider__timer );
		}).mouseleave(function() {
			slider_hovered = false;
			slider__timer = setTimeout( nextSlide, interval );
		});

		$(window).blur(function(){
			clearTimeout( slider__timer );
		}).focus(function(){
			slider__timer = setTimeout( nextSlide, interval );
		});

		$(".slides__arrow",this).click(function(e){
			e.preventDefault();
			if( $(this).hasClass("slides__arrow_left") ) showSlide( (current-1+$items.size())%$items.size() );
			else showSlide( (current+1)%$items.size() );
		});

		function showSlide(index){
			if( current == index ) return;
			clearTimeout( slider__timer );
			$items.eq(index).velocity({
				opacity: 1,
			},{
				display: "block",
				duration: 600,
				easing: "linear"
			});
			$advantages.eq(index).velocity({
				opacity: 1,
			},{
				display: "block",
				duration: 600,
				easing: "linear"
			});
			$advantages.eq(current).velocity({
				opacity: 0,
			},{
				display: "none",
				duration: 600,
				easing: "linear"
			});
			$items.eq(current).velocity({
				opacity: 0,
				scaleX: -1,
				scaleY: 0.5
				//left: -470
			},{
				display: "none",
				duration: 600,
				easing: "linear",
				complete: function() {
					$(this).velocity({
						scaleX: 1,
						scaleY: 1,
						//left: 940
					}, {
						duration: 0
					});
				}
			});

			current = index;
			slider_animated = false;
			if( !slider_hovered ) slider__timer = setTimeout( nextSlide, interval );
		}

		function nextSlide(){
			showSlide( (current+1)%$items.size() );
		}

		showSlide(0);
	});

	$(".partners").each(function() {
		var $list = $(".partners__items",this),
			$items = $(".partners__item", this ),
			_w = 180,
			w1 = $items.size()*_w,
			w0 = $(this).width(),
			mleft = 0;

		$list.width( w1 );

		$(".partners__arrow",this).click(function(e) {
			e.preventDefault();

			if( w1<w0 ) return;

			if( $(this).hasClass( "partners__arrow_left" ) ) mleft = Math.min( mleft+_w, 0 );
			else mleft = Math.max( mleft-_w, w0-w1 );

			$list.css("transform","translate("+mleft+"px,0px)");

		});
	});

	$(".present").each(function() {
		var $list = $(".present__items",this),
			$items = $(".present__item", this ),
			_w = 79,
			w1 = $items.size()*_w,
			w0 = $(".present__wrap",this).height(),
			mleft = 0;

		$list.height( w1 );

		$(".present__arrow",this).click(function(e) {
			e.preventDefault();
			if( w1<w0 ) return;

			if( $(this).hasClass( "present__arrow_up" ) ) mleft = Math.min( mleft+_w, 0 );
			else mleft = Math.max( mleft-_w, w0-w1 );

			$list.css("transform","translate(0px,"+mleft+"px)");

		});
	});

	$(".previews").each(function() {
		var $list = $(".previews__items",this),
			$items = $(".previews__item", this ),
			_w = 70,
			w1 = $items.size()*_w - 10,
			w0 = $(".previews__wrap",this).height(),
			mleft = 0;

		$list.height( w1 );

		$(".previews__arrow",this).click(function(e){
			e.preventDefault();
			if( w1<w0 ) return;

			if( $(this).hasClass( "previews__arrow_up" ) ) mleft = Math.min( mleft+_w, 0 );
			else mleft = Math.max( mleft-_w, w0-w1 );

			$list.css("transform","translate(0px,"+mleft+"px)");
		});
	});

	$(".filters__price").slider({
		range: true,
		min: Math.floor( $( "#s_price0" ).val() ),
		max: Math.ceil( $( "#s_price1" ).val() ),
		values: [ $( "#s_price0" ).val(), $( "#s_price1" ).val() ],
		slide: function( event, ui ) {
			$( "#s_price0" ).val( ui.values[0] );
			$( "#s_price1" ).val( ui.values[1] );
			$(".filters__price-box_min").html( ui.values[0] + "р" )
			$(".filters__price-box_max").html( ui.values[1] + "р" )
		}
	});
	$(".filters__price-box_min").html( $( "#s_price0" ).val() + "р" )
	$(".filters__price-box_max").html( $( "#s_price1" ).val() + "р" )

	$(".tovar__info").tabs({});

	/*
	$(".colorpicker").each(function(){
		var input = $("input").this();
		$(".colorpicker__item").click(function(e){
			$(
		});
	});
	*/

	$(".fancybox").fancybox({
		afterLoad:function(){
			if(this.type=='ajax') this.content = this.content.replace(/\?isNaked=1/,'');
		},
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
});

