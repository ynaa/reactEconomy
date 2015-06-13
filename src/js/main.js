require.config({
	deps: ["main"],
  paths: {
    "react": "../node_modules/react/dist/react-with-addons",
    "JSXTransformer": "../node_modules/react/JSXTransformer",
    "jsx": "../node_modules/grunt-react/node_modules/react-tools/vendor/fbtransform/transforms/jsx",
    "text": "../node_modules/requirejs-text/text",
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
		"datepicker": "dist/react-datepicker",
		"moment": "../node_modules/moment/moment",
		"react-onclickoutside": "../node_modules/react-onclickoutside/index",
		"reactRouter": "../node_modules/react-router/umd/ReactRouter"
  },
  shim : {
		JSXTransformer: {
			exports: "JSXTransformer"
		}
  },
	jsx: {
		fileExtension: '.js'
	}
});


require(['common'], function(){
	require(['react', 'jsx!app'], function(React, App){
		React.render(<App/>, document.body);
	});
});

define(['jquery'], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body');
    });

});
