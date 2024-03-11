import { Suspense } from "react";
import User from "../../objects/user";
 
class SpendingSuggestor{
    totalSpending = 0;
    needs = 0; //total monthly speding for needs
    wants = 0; //total monthy spending for wants
    savings = 0; //total monthy put into savings
    needsTransactions = []; //transactions considered towards needs
    wantsTransactions = []; //tranactions considered towards wants
    needsReocurringTransactions = []; //reoccuring transactions considered towards needs
    wantsReocurringTransactions = []; //reocurring tranactions considered towards wants
 
    constructor(user){
        this.user = user;
        this.totalSpending = user.totalSpending;
        //First, sort into wants and needs
        this.sortTransactions()
    }
 
    getSuggestions(){
        //Array that contains suggestions
        var suggestions = []
        //Sort transactions into wants, needs, savings
        //Leftover amount, including debt payback, will be assumed to go into savings
        this.savings = this.user.income - this.wants - this.needs - this.user.debtPayback;
        //calculate percentage of income that goes to each category
        let wantsPercentage = this.wants/this.user.income;
        let needsPercentage = this.needs/this.user.income;
        let savingsPercentage = this.savings/this.user.income;
        let debtPercentage = this.savings/this.user.income;
        let nonSpendingPercentage = debtPercentage + savingsPercentage;
        //Looking for a 50/30/20 split. If savings is greater than 20, no suggestions needed.
        if(savingsPercentage > 0.2){
            suggestions.push("Nice job sticking to your budget this month!");
        }else if(wantsPercentage > 0.3){
            //Money going to wants is greater than 30% of income, and less than 20% towards savings. See how user is spending for wants
            var restaurantSpending = 0;
            var entertainmentSpending = 0;
            var otherSpending = 0;
            for(let transaction of this.wantsTransactions){
                switch(transaction.type){
                    case "Restaurant":
                        restaurantSpending += transaction.amount;
                        break;
                    case "Entertainment":
                        entertainmentSpending += transaction.amonut;
                        break;
                    default:
                        otherSpending += transaction.amonut;
                        break;
                }
            }
            for(let transaction of this.wantsReocurringTransactions){
                let amt = this.user.calculateReoccurMonthlyTotal(transaction);
                switch(transaction.type){
                    case "Restaurant":
                        restaurantSpending += amt;
                        break;
                    case "Entertainment":
                        entertainmentSpending += amt;
                        break;
                    default:
                        otherSpending += amt;
                        break;
                }
            }
            //Analyze how wants have been split up
            if(restaurantSpending > nonSpendingPercentage){
                suggestions.push("You're spending more at restaurants and take-out than saving. Consider spending less at restaraunts with meal kits, or cooking for yourself.");
                suggestions.push("Watch the small stuff. If you like passing time in coffee shops, add up what you spend each month. The sum of all those $4 lattes might shock you. So drink water sometimes, or work at home and make your own coffee.");
            }
            if(entertainmentSpending > nonSpendingPercentage){
                suggestions.push("You're spending much more on entertainment than saving. Consider more budget friendly ways to have fun!");
            }
            if(restaurantSpending > nonSpendingPercentage){
                suggestions.push("You're spending a lot at restaurants or for take-out. Consider eating in more so you can put more towards savings.");
            }else{
                suggestions.push("You're spending a lot for entertainment or for other wants. Consider more budget friendly options so you can put more in savings.");
            }
            //Analyze debt and savings percentage
            if(savingsPercentage < 0.15){
                //only give half of the suggestions
                //Returns either 0 or 1:
                if(Math.floor(Math.random()*2) == 0){
                    suggestions.push("You should aim to save at least 15-20% of your income.");
                    suggestions.push("Set up an automatic savigns plan to help save more.");
                }else{
                    suggestions.push("Instead of having your entire paycheck directly depositted into your checking account, have your employer deposit a portion into a savings account.");
                    suggestions.push("Use apps that take spare change and use them to pay off debts.");
                }
            }
            if(debtPercentage > 0.3){
                suggestions.push("You're monthly debt payments are high. Try not to take on any more debt until your monthly payments are lower.");
                suggestions.push("Try using the snowball method for paying off debt. Make the minimum payments to all your debts, and pay as much as possible on your smallest debt.");
            }
        }else if(nonSpendingPercentage > 0.2 && (nonSpendingPercentage > (wantsPercentage + needsPercentage))){
            suggestions.push("You're doing a great job saving! However, you should feel free to spend a little on yourself!");
        }
        return suggestions;
    }
 
    /**
     * Runs through user transactions and sorts them into wants and needs
     */
    sortTransactions(){
        for(let transaction of this.user.monthyTransactions){
            switch(transaction.type){
                case "Rent": case "Groceries": case "Utilities": case "Clothing":
                    this.needsTransactions.push(transaction);
                    this.needs += transaction.amount;
                    break;
                case "Entertainment": case "Restaurant":
                    this.wantsTransactions.push(transaction);
                    this.wants += transaction.amount;
                    break;
                default:
                    this.wants += transaction.amount;
                    break;
            }
        }
        for(let transaction of this.user.monthyReoccuringTransactions){
            let amt = this.user.calculateReoccurMonthlyTotal(transaction);
            switch(transaction.type){
                case "Rent": case "Groceries": case "Utilities": case "Clothing":
                    this.needsReocurringTransactions.push(transaction);
                    this.needs += amt;
                    break;
                case "Entertainment": case "Restaurant":
                    this.wantsReocurringTransactions.push(transaction);
                    this.wants += amt;
                    break;
                default:
                    this.wants += amt;
                    break;
            }
        }
    }
}
 
export default SpendingSuggestor;