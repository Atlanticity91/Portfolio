(function( $ ) {

	let galleries = Global.LoadJson( 'Media/' + Global.GetAttr( 'Config', 'Gallery' ) )[ 'Galleries' ];
	let wrapper = $( 'div#gallery-wrapper' );

 	let Preview = {
 		current : 0,
 		stage : 0,
 		stage_max : 0,
 		size_content : 0,
 		size_displacement : 0,
 		duration : 500,
 		Resize : function( ) {
 			Preview.size_wrapper = $( 'div#preview-box-list' ).width( );
 			Preview.size_displacement = Preview.size_wrapper / 2;
 			Preview.stage_max = Math.ceil( Preview.size_content / Preview.size_displacement - Preview.size_wrapper / Preview.size_displacement );

 			if ( Preview.stage_max < 1 )
 				$( 'div#preview-box-list-content' ).css( { left : Preview.size_displacement - Preview.size_content / 2 +'px' } );
 		},
 		CountElement : function( ) {
 			Preview.size_content += $( this ).width( );
 			Preview.size_content += parseInt( $( this ).css( 'padding-left' ) );
 			Preview.size_content += parseInt( $( this ).css( 'padding-right' ) );
 			Preview.size_content += parseInt( $( this ).css( 'margin-left' ) );
 			Preview.size_content += parseInt( $( this ).css( 'margin-right' ) );
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
 			$( 'img#preview-box-image' ).fadeTo( Preview.duration, 1 ); 
 		},
 		Display : function( image ) {
 			let display = $( 'img#preview-box-image' );
 			display.attr( 'src', image ).hide( );
 			Preview.ResizeImage( display );

 			let image_width = display.width( );
 			let image_height = display.height( );
 			let wrapper = $( 'div#preview-box-wrapper' );

 			$( 'div#preview-box' ).css( { top : ( ( Global.GetWindow( 'height' ) - 192 ) - image_height ) / 2 + 'px', left : ( $( 'div#preview-wrapper' ).width( ) - image_width ) / 2 + 'px' } ); 

 			wrapper.animate( { width : image_width + 'px' }, Preview.duration ).animate( { height : image_height + 'px' }, Preview.duration, 'linear', Preview.Fade );
 		},
 		Open : function( gallery ) {
 			Global.SetScroll( 'disable' );
 			Menu.Lock( );

 			$( 'header#menu' ).css( { 'z-index' : '1' } );

 			$( 'span#preview-box-title' ).html( gallery[ 'Name' ] );

 			for ( let idx = 0; idx < gallery[ 'Content' ].length; idx++ )
 				$( 'div#preview-box-list-content' ).append( '<img class="preview-box-list-content-image" id="preview-box-list-content-image" slug="' + idx + '" src="' + Global.GetAttr( 'Config', 'Images' ) + gallery[ 'Content' ][ idx ] + '" />' );

 			$( 'img#preview-box-list-content-image' ).click( Preview.Click );
 			
 			$( 'div#preview-wrapper' ).fadeTo( 2 * Preview.duration , 1 );
 			$( 'img#preview-box-list-content-image' ).first( ).addClass( 'current' );

 			Preview.Display( Global.GetAttr( 'Config', 'Images' ) + gallery[ 'Content' ][ 0 ] );
 		},
 		Close : function( ) {
 			$( 'div#preview-wrapper' ).hide( );
 			$( 'div#preview-box' ).css( { top : '0px', left : '0px' } );
 			$( 'img#preview-box-image' ).attr( 'src', '' );
 			$( 'div#preview-box-list-content' ).find( 'img' ).remove( );

 			Menu.UnLock( );
 			Global.SetScroll( 'enable' );
 		},
 		PressLeft : function( ) {
 			if ( Preview.stage > 0 ) {
 				Preview.stage -= 1;

 				if ( Preview.stage > 0 )
 					$( 'div#preview-box-list-content' ).animate( { left : Preview.stage * -Preview.size_displacement  + 'px' }, 1000 );
 				else
 					$( 'div#preview-box-list-content' ).animate( { left : '40px' }, 1000 );
 			}
 		},
 		PressRight : function( ) {
 			if ( Preview.stage < Preview.stage_max ) {
 				Preview.stage += 1;

 				if ( Preview.stage < Preview.stage_max )
 					$( 'div#preview-box-list-content' ).animate( { left : Preview.stage * -Preview.size_displacement  + 'px' }, 1000 );
 				else
 					$( 'div#preview-box-list-content' ).animate( { left : -( Preview.stage * Preview.size_displacement + 64 ) + 'px' }, 1000 );
 			}
 		},
 		Click : function( ) {
 			let slug = $( this ).attr( 'slug' );
 			let image = $( this ).attr( 'src' );

 			if ( Preview.current != slug ) {
 				Preview.current = slug;

 				$( 'img.current' ).removeClass( 'current' );
 				$( this ).addClass( 'current' );

 				Preview.Display( image );
 			}
 		}
 	};
 	
 	for ( let idx = 0; idx < galleries.length; idx++ ) {
		let gallery = galleries[ idx ];
		let html = '<div class="gallery-preview" id="gallery-preview" slug="' + idx + '" >\
						<img class="gallery-preview-mini" id="gallery-preview-mini" src="' + Global.GetAttr( 'Config', 'Miniatures' ) + gallery[ 'Mini' ] + '" alt="' + gallery[ 'Name' ] + '" />\
						<span class="gallery-preview-name" id="gallery-preview-name" >' + gallery[ 'Name' ] + '</span>\
					</div>';

		wrapper.append( html );
	}


	$( 'div#gallery-preview' ).click( 
		function( ) {
			let slug = $( this ).attr( 'slug' );

			Preview.Open( galleries[ slug ] );
		}
	);

	$( 'div#preview-aplat' ).click( Preview.Close );
	$( 'span#preview-box-close' ).click( Preview.Close );
	$( 'div#preview-box-list-content' ).find( 'img' ).each( Preview.CountElement );
    $( 'span#preview-box-list-left' ).click( Preview.PressLeft );
    $( 'span#preview-box-list-right' ).click( Preview.PressRight );
    $( window ).resize( Preview.Resize );

    Preview.Close( );
    Preview.Resize( );

})( jQuery )
