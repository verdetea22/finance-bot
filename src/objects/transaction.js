class Transaction{
    amount = 0.0;
    title = "";
    description = "";
    date = new Date();

    constructor(amount, title, description, date){
        this.amount = amount;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}