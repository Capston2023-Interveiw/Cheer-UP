const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
<<<<<<< HEAD
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://backend:8080',
            changeOrigin: true,
        })
    );
=======
	app.use(
        '/api',
		createProxyMiddleware(
        {
			target: 'http://backend:8080', 
			changeOrigin: true,
		})
	);
>>>>>>> #57
};