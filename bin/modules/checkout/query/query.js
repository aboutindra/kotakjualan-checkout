const Con = require('../../../utils/database/mongodb/connection');

class Query{

    constructor() {
        this.con = new Con();
        this.db = this.con.getConnection('PaymentHistory');
    }

    async insertPayment(paymentParam){
        const insertStatus = await this.db.insert(paymentParam);
        return insertStatus;
    }

    async updatePayment(idPayment, updatedData){
        const updateStatus = await this.db.updateOne({idPayment:idPayment}, {$set : updatedData})
        return updateStatus
    }

    async findAllPayment(){
        const findAllPaymentData = await this.db.find();
        return findAllPaymentData
    }

}

module.exports = Query;