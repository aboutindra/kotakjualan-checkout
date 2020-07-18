const commandHandler = require('../command/command_handler');

const verifyCheckout = async (req, res) => {
    const gross_amount = req.body.gross_amount;
    const item_details = req.body.item_details;
    const customer_details = req.body.customer_details;

    const paymentParam = {
        gross_amount : gross_amount,
        item_details : item_details,
        customer_details : customer_details
    }

    res.send( await commandHandler.getPayment(paymentParam) )
}

const updateCheckout = async (req, res) => {
    const idPayment = req.param.id_payment;
    const updatedData = {
        'isPaid' : true
    }
    res.send( await commandHandler.updatePayment(idPayment, updatedData))
}

module.exports = {
    verifyCheckout,
    updateCheckout
}