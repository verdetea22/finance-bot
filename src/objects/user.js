import Transaction from "./reoccuringTransaction";
import ReoccuringTransaction from "./reoccuringTransaction";
import BankAccount from "./bankAccount";
import RetirementBankAccount from "./retirementBankAccount";
import AccountsSuggestor from "../bot/suggestion generators/accounts-suggestions";
import SpendingSuggestor from "../bot/suggestion generators/spending-suggestions";
import RetirementSuggestor from "../bot/suggestion generators/retirement-suggestions";

class User {
    totalSpending = 0;
    needsSpending = 0;
    wantsSpending = 0;
    savingsSpending = 0;

    constructor(email, name, income, monthyTransactions, bankAccounts, retirementBankAccounts, monthlyReocTrans, retirementAge, dOB){
        this.email = email;
        this.name = name;
        this.income = income;
        this.monthyTransactions = monthyTransactions;
        this.retirementBankAccounts = retirementBankAccounts;
        this.monthyReoccuringTransactions = monthlyReocTrans;
        this.bankAccounts = bankAccounts;
        this.retirementAge = retirementAge;
        this.dOB = dOB;
        this.totalSpending = this.calculateMonthlyTotal();
        this.sortTransactions();
    }
 
    /**
     * Calculates the total gain or loss the user takes in each month based on income and monthy transactions.
     * @returns {number} balance
     */
    calculateMonthlyTotal(){
        let total = this.income;
        for (let transaction of this.monthyTransactions){
            total -= transaction.amount;
        }
        
        return total;
    }
 
    /**
     * Takes a reoccuring transaction obejct and returns how much that totals over the current month
     * @param {ReoccuringTransaction} 
     * @returns {number} monthy cost of reoccuring transaction
     */
    calculateReoccurMonthlyTotal(reoccurTrans){
        //Check if period is 0. If so, the transaction happens monthly, so only return amount.
        if(reoccurTrans.period === 0){

            //Check date bought. If current day of month is past initial transaction day during the month. Apply transaction
            const date = new Date(Date.now());
            if(date.getDay() >= reoccurTrans.date.getDay()){
                return reoccurTrans.amount;
            }

            else if((this.getLastDayOfMonth(date.getFullYear(), date.getMonth()).getDay() < reoccurTrans.getDay()) && (date == this.getLastDayOfMonth(date.getFullYear(), date.getMonth()))){
                //Day bought on doesn't occur in current month. Apply transaction on last day of month
                //For example If subscription is purchased on Jan 30, Feb 30 does not exist. Therefore
                //the transaction should be accounted for on the last day of Feb.
                return reoccurTrans.amount;
            }

            else{
                //Transaction has not been applied at current point.
                return 0;
            }
        }else{
            const sDate = reoccurTrans.date;
            const date = Date.now();
            const firstDayOfMonth = this.getFirstDayOfMonth(date.getFullYear(), date.getMonth());
            const lastDayOfMonth = this.getLastDayOfMonth(date.getFullYear(), date.getMonth());
            const periodInMillSec = reoccurTrans.period * 86400000; //need to convert period in days to milliseconds
            var currStart = sDate;
   
            while(currStart < firstDayOfMonth){
                currStart += periodInMillSec;
            }
   
            if(currStart > lastDayOfMonth){
                return 0;
            }else{
                var amtTransactions = (lastDayOfMonth - firstDayOfMonth)/periodInMillSec;
                return reoccurTrans.amount * amtTransactions;
            }
        }
    }
 
    /**
     * Returns a date object corresponding to the first day of the month
     * @param {year} year
     * @param {month} month
     * @returns {Date} first date of month
     */
    getFirstDayOfMonth(year, month){
        return new Date(year, month, 1);
    }
   
    /**
     * Returns a date object corresponding to the last day of the month
     * @param {year} year
     * @param {month} month
     * @returns {Date} last date of month
     */
    getLastDayOfMonth(year, month){
        return new Date(year, month + 1, 0);
    }

    /**
     * Caluclates the user's age from their date of birth
     * @returns {number} age
     */
    getAge(){
        var month_diff = Date.now() - this.dOB;
        console.log(month_diff)
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        return Math.abs(year - 1970);
    }

    /**
     * Returns the max annual 401K contribution for the user
     * @returns {number} 
     */
    getMax401KCont(){
        if(this.getAge() >= 50){
            return 27000;
        }else{
            return 20500;
        }
    }

    /**
     * Returns the max annual IRA contribution for the user
     * @returns 
     */
    getMaxIRACont(){
        let total = 0;
        //limit yearly income for max Roth IRA contribution is 204,000 per year
        if(this.income * 12 < 204000){
            if(this.getAge() >= 50){
                total = 7000;
            }else{
                total = 6000;
            }
        //if person makes between $204,000 and $214,000 they can contribute a reduced amount
        }else if(this.income * 12 < 214000){
            total = this.income * 12 - 125000;
            total = total/15;
            if(this.getAge() >= 50){
                total = total * 7000;
                total = 7000 - total;
            }else{
                total = total * 6000;
            total = 6000 - total;
            }
        }
        return total;
    }
    /**
     * Check if user has a type of a bank of account currently open.
     * @param {String} type 
     * @returns {Boolean}
     */
    hasAccount(type){
        if(type === "401K" || type === "Roth IRA" || type === "Traditional IRA"){
            for(let account of this.retirementBankAccounts){
                if(account.type === type){
                    return true;
                }
            }
        }else{
            for(let account of this.bankAccounts){
                if(account.type === type){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Runs through user transactions and sorts them into wants and needs
     */
     sortTransactions(){
        for(let transaction of this.monthyTransactions){
            switch(transaction.title){
                case "Rent": case "Groceries": case "Utilities": case "Clothing":
                    this.needsSpending += transaction.amount;
                    break;
                case "Entertainment": case "Restaurant":
                    this.wantsSpending += transaction.amount;
                    break;
                default:
                    this.wantsTransactions += transaction.amount;
                    break;
            }
        }
        this.savingsSpending = this.income - this.needsSpending - this.wantsSpending;
    }

    /**
     * Returns the spending suggestions the user can make
     * @returns {[String]}
     */
    getSpendingSuggestions(){
        let suggestor = new SpendingSuggestor(this);
        return suggestor.getSuggestions();
    }
    /**
     * Returns the account suggestions the user can make
     * @returns {[String]}
     */
    getAccountSuggestions(){
        let suggestor = new AccountsSuggestor(this);
        return suggestor.getSuggestions();
    }
    /**
     * Returns the retirement suggestions the user can make
     * @returns {[String]}
     */
     getRetirementSuggestions(){
        let suggestor = new RetirementSuggestor(this);
        return suggestor.getSuggestions();
    }
}
 
export default User;