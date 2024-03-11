class BankAccount {
    /**
     * Bank account object holds onto basic data of a bank account.
     * @Param {Number} Balance of the bank account
     * @Param {Number} Account Ineterest Rate. Written in decimal. For example 1% will be entered as 0.01
     * @Param {Transaction[]} Array of transaction objects to keep tract of all deposits and withdrawals f
     * @Param {String} Type of the bank account. Can be: Savings, Checking, Money Market, CD, High Yield Savings, 529, Roth IRA, Traditional IRA, 401K
     */
    type="";
    balance=0.0;
    transactionHistory = [];
    interest = 0.0;

    constructor(balance, interest, transactionHistory, type){
        this.type = type;
        this.balance = balance;
        this.transactionHistory = transactionHistory;
        this.interest = interest;
    }
}

export default BankAccount