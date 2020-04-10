(function( $ ) {

	let email = GetAttr( 'Config', 'Email' );

	$( 'form#contact' ).attr( 'action', 'http://formspree.io/' + email );

})( jQuery )
