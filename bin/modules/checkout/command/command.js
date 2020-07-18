require('dotenv').config()
const checkout = require('checkout-client');
const db = require('../../../utils/database/mongodb/connection');
const queryDomain = require('./../query/domain');
const { v4: uuidv4 } = require('uuid');

class Snap{

    constructor() {
        this.db = new queryDomain(db);
    }

    async createPayment(paymentParam) {
        let init =  new checkout.Snap({
            isProduction: true,
            serverKey: process.env.checkout_SERVER_KEY_PRODUCTION,
            clientKey: process.env.checkout_CLIENT_KEY_PRODUCTION
        });

        let result = async (transactionParam) => {
            let orderId = uuidv4();
            let snapParameter = {
                transaction_details : {
                    'order_id' : orderId,
                    'gross_amount' : transactionParam.gross_amount,
                    'item_details' : transactionParam.item_details,
                    'customer_details' : transactionParam.customer_details,
                    'expiry' : {
                        'start_time' : new Date(),
                        'unit' : 'minute',
                        'duration' : '9000'
                    },
                    'callbacks' : {
                        'finish' : process.env.IP_ADDRESS_DEV + '/v1/api/payment/update?id_payment=' + orderId
                    }
                }
            }
            let generateTransaction = init.createTransaction(snapParameter);

            let insertParam = {
                'isPaid' : false,
                'createdAt' : new Date(),
                'updatedAt' : new Date(),
                ...snapParameter,
                ...generateTransaction
            }

            let insertHistoryPayment = this.db.insertPayment(insertParam);
            return Promise.all([generateTransaction, insertHistoryPayment])
        }

            return await result(paymentParam);
    }

    async updateStatusPayment(idPayment, updatedData){
        this.db.updatePayment(idPayment, updatedData);
    }

}

module.exports = Snap;