(function( $ ) {

   let pages = Global.GetAttr( 'Pages' );

	for ( let idx = 0; idx < pages.length; idx++ ) {
   		let slug = pages[ idx ][ 'Wrapper' ];
   		
   		let button = '<span class="menu-button" id="menu-button" slug="' + slug + '" >' + pages[ idx ][ 'Name' ] + '</span>';
   		let wrapper = '<div class="wrap-zone ' + slug + '" id="' + slug + '" ></div>';
   		let separator = '<div class="wrap-separator" id="wrap-separator" >' + pages[ idx ][ 'Name' ] + '</div>';
   		let html = Global.LoadHtml( 'Pages/' + pages[ idx ][ 'Source' ] );

   		$( 'div#menu-wrap' ).append( button );
   		$( 'div#wrapper' ).append( wrapper );
   		$( 'div#' + slug ).append( separator + html );

   		Global.ImportRessource( 'css', 'CSS/' + pages[ idx ][ 'Style' ]);
   		Global.ImportRessource( 'js',  'JS/' + pages[ idx ][ 'Script' ] );
	}

	$( 'span#menu-button' ).click(
		function( event ) {
			event.preventDefault( );

         if ( !Menu.menu_lock ) {
   			let slug = $( this ).attr( 'slug' );
   			let target = $( 'div#' + slug ).offset( ).top - Global.GetAttr( 'Config', 'ScrollOffset' );
   			let speed = Global.GetAttr( 'Config', 'ScrollSpeed' );

   			$( 'html, body' ).animate( { scrollTop : target }, speed );
         }
		}
	);

})( jQuery )
