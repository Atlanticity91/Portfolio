(function( $ ) {

    let card = Global.GetAttr( 'Card' );

	$( 'img#card-image' ).attr( 'src', card[ 'Photo' ] );
	$( 'span#card-description' ).html( card[ 'Description' ] );

})( jQuery )
