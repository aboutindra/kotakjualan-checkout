const query = require('../query/query');
const db = require('../../../utils/database/mongodb/connection');

class Domain{

    constructor(db) {
        this.query = new query(db);
    }

    async insertPayment(paymentParam){
        let status;
        const insertPayment = await this.query.insertPayment(paymentParam);
        if(insertPayment.acknowledged === true){
            status = {
                'code' : 200,
                'message' : 'Payment Succesfuly inserted!'
            }
        } else {
            status = {
                'code' : 500,
                'message' : 'Something went wrong while inserting!'
            }
        }
        return status;
    }

    async updatePayment(idPayment ,updatedParam){
        let status;
        const updatePayment = await this.query.updatePayment(idPayment, updatedParam);
        if(updatePayment.acknowledged === true){
            status = {
                'code' : 200,
                'message' : 'Payment Succesfuly updated!'
            }
        } else {
            status = {
                'code' : 500,
                'message' : 'Something went wrong while updating!'
            }
        }
        return status;
    }

    async findAll(){
        let status;
        const findAll = await this.query.findAllPayment();
        return findAll;
    }

}
module.exports = Domain;