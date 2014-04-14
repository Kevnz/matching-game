requirejs.config({
	shim: {
		crafty: {
			exports: 'Crafty'
		},
		domready: {
			exports: 'onDomReady'
		},
        sift: {
            exports: 'sift'
        }
	},
	waitSeconds: 10
});