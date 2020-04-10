let LoadJson = function( path ) {
	let request = {
		type : 'GET',
		url : path,
		dataType : 'json',
		async : false
	};

	return $.ajax( request ).responseJSON;
}

let LoadHtml = function( path ) {
	let request = {
		type : 'GET',
		url : path,
		dataType : 'text',
		async : false
	};

	return $.ajax( request ).responseText;
}

let GetAttr = function( name, query  ) {
	let element = site[ name ];
	
	if ( element != undefined ) {
		if ( query != undefined )
			return element[ query ];

		return element;
	}

	return undefined;
}

let site = LoadJson( 'Media/site.json' );
