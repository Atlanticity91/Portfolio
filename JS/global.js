let Global = {
	LoadJson : function( path ) {
		let request = {
			type : 'GET',
			url : path,
			dataType : 'json',
			async : false
		};

		return $.ajax( request ).responseJSON;
	},
	LoadHtml : function( path ) {
		let request = {
			type : 'GET',
			url : path,
			dataType : 'text',
			async : false
		};

		return $.ajax( request ).responseText;
	},
	ImportRessource : function( type, path ) {
		if ( path != undefined && path != '' || path != ' ' ) {
			if ( type == 'css' )
				$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="' + path + '" />' );
			else if ( type == 'js' )
				$( 'body' ).append( '<script type="text/javascript" src="' + path + '" > </script>' );
		}
	},
	SetScroll : function( state ) {
		if ( state == 'disable' ) {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
	    	let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	    	window.onscroll = function( ) { 
	    		window.scrollTo( scrollLeft, scrollTop ); 
	    	}; 
		} else
			window.onscroll = function( ) { }; 
	},
	GetWindow : function( query ) {
		if ( query == 'width' ) {
			if ( window.innerWidth )
				return window.innerWidth;
			else
				return $( window ).width( );
		} else if ( query == 'height' ) {
			if ( window.innerHeight )
				return window.innerHeight;
			else
				return $( window ).height( );
		}
	},
	GetAttr : function( query, property  ) {
		let element = site[ query ];
		
		if ( element != undefined ) {
			if ( property != undefined )
				return element[ property ];

			return element;
		}

		return undefined;
	}
}

let Menu = {
	menu_lock : false,
	Lock : function( ) {
		if ( !Menu.menu_lock )
			Menu.menu_lock = true;
	},
	UnLock : function( ) {
		if ( Menu.menu_lock )
			Menu.menu_lock = false;
	}
};

let site = Global.LoadJson( 'Media/site.json' );
