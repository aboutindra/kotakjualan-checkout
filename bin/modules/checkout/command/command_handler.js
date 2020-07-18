const commands = require('./command');
const Commands = new commands();

const getPayment = (param) => {
    Commands.createPayment(param);
}

const updatePayment = (idPayment, statusPayment) => {
    Commands.updateStatusPayment(idPayment, statusPayment)
}

module.exports = {
    getPayment,
    updatePayment
};