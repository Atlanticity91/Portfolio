(function( $ ) {

    let pages = GetAttr( 'Pages' );
    let card = GetAttr( 'Card' );

	for ( let idx = 0; idx < pages.length; idx++ ) {
		let name = pages[ idx ][ 'Name' ];
   		let slug = pages[ idx ][ 'Wrapper' ];
   		
   		let button = '<span class="menu-button" id="menu-button" slug="' + slug + '" >' + name + '</span>';
   		let wrapper = '<div class="wrap-zone ' + slug + '" id="' + slug + '" ></div>';
   		let separator = '<div class="wrap-separator" id="wrap-separator" >' + name + '</div>';
   		let html = LoadHtml( 'Pages/' + pages[ idx ][ 'Source' ] );

   		$( 'div#menu-wrap' ).append( button );
   		$( 'div#wrapper' ).append( wrapper );
   		$( 'div#' + slug ).append( separator + html );
	}

	$( 'img#card-image' ).attr( 'src', card[ 'Photo' ] );
	$( 'span#card-description' ).html( card[ 'Description' ] );

	$( 'span#menu-button' ).click(
		function( event ) {
			event.preventDefault( );

			let slug = $( this ).attr( 'slug' );
			let target = $( 'div#' + slug ).offset( ).top - GetAttr( 'Config', 'ScrollOffset' );
			let speed = GetAttr( 'Config', 'ScrollSpeed' );

			$( 'html, body' ).animate( { scrollTop : target }, speed );
		}
	);

})( jQuery )
