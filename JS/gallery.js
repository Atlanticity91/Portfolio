(function( $ ) {

	let galleries = LoadJson( 'Media/' + GetAttr( 'Config', 'Gallery' ) )[ 'Galleries' ];
	let image_path = 'Media/Images/';
	let mini_path = 'Media/Mini/';

	console.log( galleries );

	for ( let idx = 0; idx < galleries.length; idx++ ) {
		let gallery = galleries[ idx ];
		let html = '<div class="gallery-preview" id="gallery-preview" slug="' + idx + '" >\
						<img class="gallery-preview-mini" id="gallery-preview-mini" src="' + mini_path + gallery[ 'Mini' ] + '" alt="' + gallery[ 'Name' ] + '" />\
						<span class="gallery-preview-name" id="gallery-preview-name" >' + gallery[ 'Name' ] + '</span>\
					</div>';

		$( 'div#gallery-wrapper' ).append( html );
	}

	$( 'div#gallery-preview' ).click( 
		function( ) {
			let slug = $( this ).attr( 'slug' );
		}
	);

})( jQuery )
