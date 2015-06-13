require.config({
	deps: ["main"],
  paths: {
    "react": "../node_modules/react/dist/react-with-addons",
    "JSXTransformer": "../node_modules/react/dist/JSXTransformer",
    "jsx": "../node_modules/requirejs-react-jsx/jsx",
    "text": "../node_modules/requirejs-text/text",
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
		"datepicker": "../node_modules/react-datepicker/dist/react-datepicker",
		"moment": "../node_modules/react-datepicker/node_modules/moment/moment",
		"react-onclickoutside": "../node_modules/react-datepicker/node_modules/react-onclickoutside/index",
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

require(['jsx!app'], function(App){
  var app = new App();
  app.init();
});


// require(['common'], function(){
// 	require(['JSXTransformer', 'react', 'jsx!app'], function(React, App){
// 		React.render(<App/>, document.body);
// 	});
// });
// define(['jquery'], function($) {
//     //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
//     $(function() {
//       $('body');
// });
