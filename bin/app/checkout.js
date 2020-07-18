const checkoutHandler = require('../modules/checkout/handler/api_handler');

const routes = (server) => {
    server.post('/v1/checkout/generate', checkoutHandler.verifyCheckout);
    server.get('/v1/checkout/update', checkoutHandler.updateStatusCheckout)
};

module.exports = {
    routes
};
