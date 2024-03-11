import Transaction from "./transaction";

class ReoccuringTransaction extends Transaction{
    period = 0//measured in days. If 0, transaction occurs monthly

    constructor(amount, title, description, date, period){
        super(amount, title, description, date);
        this.period = period;
    }
}

export default ReoccuringTransaction;