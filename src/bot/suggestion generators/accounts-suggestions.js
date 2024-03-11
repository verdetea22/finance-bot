import User from "../../objects/user";
 
class AccountsSuggestor{

    constructor(user){
        this.user = user;
    }

    getSuggestions(){
        //changes number to current format
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'usd'
        });
        let nonCollegeAge = this.user.nChildren - this.user.nChildrenCollege;
        //number of children the user has who aren't in college or out of college
        var hasKids = false;
        if(nonCollegeAge > 0){
            hasKids = true;
        }
        //Array that contains suggestions
        var suggestions = [];
        let currBal = this.totalSaved();
        //check if user has an enough money saved in case of an emergency
        if(currBal > this.user.income * 6){
            suggestions.push("Great job! You have enough saved for a good emergency fund! But don't stop saving!");
        }else if(currBal > this.user.income > 3){
            suggestions.push("Nice job saving! You have a decent amount saved! However, you should aim to have an emergency fund of at least 6 months pay");
        }else{
            suggestions.push("It's reccomended to have 3-6 months worth of monthly income saved in an emergency fund.");
        }
        //Analyze long term saving
        //if the user has young kids, check to make sure they're saving in a 529 account
        if(hasKids && !this.user.hasAccount("529")){
            suggestions.push("Having a 529 can be  a great way to save for your kid's college. Even $100 per month can turn into over $37,000 by the time your kid turns 18");
        }else{
            suggestions.push("Corporate bonds can provide a high short term yield. However, keep in mind that they are subject to market, credit, and default risk.");
        }
        //Analyze medium term saving
        if(!this.user.hasAccount("CD") && !this.user.hasAccount("High Yield Savings")){
            suggestions.push("CD's and High yield savings accounts are great ways to have medium-term savings. CD's can offer up to 1.6% APY!");
        }else{
            suggestions.push("Index funds or ETFs are higher risk, but can provide a high potential return.");
        }

        //Analyze short term saving
        if(!this.user.hasAccount("High Yield Savings") && !this.user.hasAccount("Money Market")){
            suggestions.push("High yield savings accounts and money market accounts are great ways to have some short-term savings. Both types typically offer better interest rates than savings accounts.");
        }else{
            suggestions.push("Bonds are great ways to have high risk, low yield savings.");
        }
        return suggestions;
    }

    /**
     * Calculates the total the user has saved in non-retirement accounts
     * @returns {number} total balance saved
     */
    totalSaved(){
        var total = 0;
        for(let account of this.user.bankAccounts){
            if(account.type != "Roth IRA" && account.type != "Traditional IRA" && account.type != "401K" && account.type != "529"){
                total += account.balance;
            }
        }
        return total;
    }
}
export default AccountsSuggestor;