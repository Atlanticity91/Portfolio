(function( $ ) {

	let file = Global.LoadJson( 'Media/' + Global.GetAttr( 'Config', 'Gallery' ) );
	let galleries = file[ 'Galleries' ];

 	let Preview = { 
 		speed : file[ 'Config' ],
 		loader : {
 			image : new Image( ),
 			timer : 0
 		},
 		wrapper : $( 'div#preview-wrapper' ),
 		image : $ ( 'img#preview-box-image' ),
 		stage : 0,
 		stage_max : 0,
 		slider : 0,
 		slider_move : 0,
 		Resize : function( ) {
 			let slider_wrapper = $( 'div#preview-box-list' ).width( );
 			Preview.slider_move = slider_wrapper / 2;
 			Preview.stage_max = Math.ceil( Preview.slider / Preview.slider_move - slider_wrapper / Preview.slider_move );

 			if ( Preview.stage_max < 1 )
 				$( 'div#preview-box-list-content' ).css( { left : Preview.slider_move - Preview.slider / 2 +'px' } );
 		},
 		ResizeImage : function( image ) {
 			let max_width = $( 'div#preview-wrapper' ).width( ) * 0.9;
 			let max_height = ( Global.GetWindow( 'height' ) - 192 ) * 0.9;

 			if ( image.width( ) > max_width )
 				image.css( { width : max_width + 'px', height : 'auto' } );

 			if ( image.height( ) > max_height )
 				image.css( { height : max_height + 'px', width : 'auto' } );
 		},
 		Fade : function( ) {
 			Preview.Resize( );

 			$( 'img#preview-box-image' ).fadeTo( Preview.speed[ 'Image' ], 1,
 				function( ) {
 					$( 'img#preview-box-list-content' ).fadeIn( );
 				}
 			); 
 		},
 		Display : function( ) {
 			let image = $( 'img#preview-box-image' );
 			image.attr( 'src', Preview.loader.image.src ).hide( );
 			Preview.ResizeImage( image );

 			let image_width = image.width( );
 			let image_height = image.height( );

 			$( 'div#preview-box' ).animate( { top : ( ( Global.GetWindow( 'height' ) - 192 ) - image_height ) / 2 + 'px', left : ( $( 'div#preview-wrapper' ).width( ) - image_width ) / 2 + 'px' }, Preview.speed[ 'Box' ] ); 
 			$( 'div#preview-box-wrapper' ).animate( { width : image_width + 'px' }, Preview.speed[ 'Box' ] ).animate( { height : image_height + 'px' }, Preview.speed[ 'Box' ], 'linear', Preview.Fade );
 		},
 		Click : function( ) {
 			let slug = $( this ).attr( 'slug' );

 			if ( Preview.current != slug ) {
 				Preview.current = slug;

 				$( 'img.current' ).removeClass( 'current' );
 				$( this ).addClass( 'current' );

 				Preview.Load( $( this ).attr( 'src' ) );
 			}
 		},
 		Build : function( gallery ) {
 			$( 'span#preview-box-title' ).html( gallery[ 'Name' ] );

 			for ( let idx = 0; idx < gallery[ 'Content' ].length; idx++ ) {
 				$( 'div#preview-box-list-content' ).append( '<img class="preview-box-list-content-image" id="preview-box-list-content-image" slug="' + idx + '" src="' + Global.GetAttr( 'Config', 'Images' ) + gallery[ 'Content' ][ idx ] + '" />' );

 				let image = $( 'img#preview-box-list-content-image' ).last( );
 				Preview.slider += image.width( );
	 			Preview.slider += parseInt( image.css( 'padding-left' ) );
	 			Preview.slider += parseInt( image.css( 'padding-right' ) );
	 			Preview.slider += parseInt( image.css( 'margin-left' ) );
	 			Preview.slider += parseInt( image.css( 'margin-right' ) );
 			}

 			$( 'img#preview-box-list-content-image' ).click( Preview.Click );
 		},
 		Load : function( image_path ) {
 			$( 'div#preview-loader' ).show( );

 			Preview.loader.image.src = image_path;
 			Preview.loader.timer = window.setInterval( 
 				function( ) {
 					if ( Preview.loader.image.complete ) {
		 				window.clearInterval( Preview.loader.timer );

		 				$( 'div#preview-loader' ).hide( );
		 				Preview.Display( );
		 			}
 				}, 100 
 			);
 		},
 		PressLeft : function( ) {
 			Preview.stage -= 1;
 			if ( Preview.stage > 0 ) 
 				$( 'div#preview-box-list-content' ).animate( { left : Preview.stage * -Preview.slider_move  + 'px' }, 1000 );
 			else {
 				Preview.stage = 0;
 				
 				$( 'div#preview-box-list-content' ).animate( { left : '40px' }, 1000 );
 			}
 		},
 		PressRight : function( ) {
 			Preview.stage += 1;

 			if ( Preview.stage < Preview.stage_max )
 				$( 'div#preview-box-list-content' ).animate( { left : Preview.stage * -Preview.slider_move  + 'px' }, 1000 );
 			 else {
 			 	Preview.stage = Preview.stage_max;

 			 	$( 'div#preview-box-list-content' ).animate( { left : -( Preview.stage * Preview.slider_move ) + 'px' }, 1000 );
 			}
 		},
 		Open : function( ) {
 			Global.SetScroll( 'disable' );
 			Menu.Lock( );
 			let gallery = galleries[ $( this ).attr( 'slug' ) ];

 			Preview.Build( gallery );
 			Preview.wrapper.fadeTo( Preview.speed[ 'Open' ], 1 );
 			Preview.Load( Global.GetAttr( 'Config', 'Images' ) + gallery[ 'Content' ][ 0 ] );

 			$( 'img#preview-box-list-content-image' ).first( ).addClass( 'current' );
 		},
 		Close : function( ) {
 			Preview.slider = 0;
 			Preview.wrapper.fadeTo( Preview.speed[ 'Open' ], 0, 
 				function( ) { 
 					$( this ).hide( ); 
 					$( 'img#preview-box-image' ).attr( 'src', '' );

 					Menu.UnLock( );
 				} 
 			); 
 			
 			$( 'div#preview-box-list-content' ).empty( );

 			Global.SetScroll( 'enable' );
 			Menu.UnLock( );
 		},
 		OnResize : function()  {
 			Preview.Load( $( 'img#preview-box-image' ).attr( 'src' ) );
 		}
 	};
 	
 	for ( let idx = 0; idx < galleries.length; idx++ ) {
		let gallery = galleries[ idx ];
		let html = '<div class="gallery-preview" id="gallery-preview" slug="' + idx + '" >\
						<img class="gallery-preview-mini" id="gallery-preview-mini" src="' + Global.GetAttr( 'Config', 'Miniatures' ) + gallery[ 'Mini' ] + '" alt="' + gallery[ 'Name' ] + '" />\
						<span class="gallery-preview-name" id="gallery-preview-name" >' + gallery[ 'Name' ] + '</span>\
					</div>';

		$( 'div#gallery-wrapper' ).append( html );
	}

	$( 'div#gallery-preview' ).click( Preview.Open );
	$( 'div#preview-aplat, span#preview-box-close' ).click( Preview.Close );
	$( 'span#preview-box-list-left' ).click( Preview.PressLeft );
    $( 'span#preview-box-list-right' ).click( Preview.PressRight );

    $( window ).resize( Preview.OnResize );

    $( 'img#gallery-preview-mini' ).each( ).css(
    	{ 'left' : $( this ).width( ) / 2 + 'px' }
    );

})( jQuery )
