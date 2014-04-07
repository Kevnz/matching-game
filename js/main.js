requirejs.config({
	shim: {
		crafty: {
			exports: 'Crafty'
		},
		domready: {
			exports: 'onDomReady'
		}
	},
	waitSeconds: 10
});