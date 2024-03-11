import User from "../../objects/user";
 
class RetirementSuggestor{

    constructor(user){
        this.user = user;
    }

    getSuggestions(){
        //changes number to current format
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'usd'
        });
        //Array that contains suggestions
        var suggestions = [];
        //amount of years until the user reaches retirement age
        let yearDiff = this.user.retirementAge - this.user.getAge();
        //amount the user should have saved by retirement going by the rule of 25. Not including inflation.
        var retirementTotal = (this.user.income - this.user.calculateMonthlyTotal()) * 12 * 25;
        console.log("retirement");
        console.log(retirementTotal);
        //calcualte retirement total in future value
        var realRetirementTotal = this.caluclateFutueValue(retirementTotal, 0.025, yearDiff);
        console.log(realRetirementTotal);
        //total amount the user will have in their account by the time they retire
        var savingsByRetirement = this.calculateCurrentSavingsByRetirement(this.user.retirementAge);
        console.log(savingsByRetirement);
        //Find how much the user will have if they continue saving as they are
        var sWithAWByRetirement = this.calculateCurrentSavingsByRetirement(this.user.retirementAge);
        console.log(sWithAWByRetirement);
        //check if user currently has enough saved to be retired safely
        suggestions.push(`With your current saving habits, you will have ${formatter.format(sWithAWByRetirement[0])} saved for retirement`);
        if(savingsByRetirement[1] > realRetirementTotal){
            suggestions.push("Great job saving! Even without putting another dollar into your retirement accounts, you have enough saved to be retired for 25 years. But that does not mean you should stop saving!");
        }
        if(sWithAWByRetirement[1] > realRetirementTotal){
            suggestions.push("Great Job! If you keep saving as you are, you will have enough money to safely be retired for 25 years!");
        }else{
            //user is not saving enough. compare their current IRA contribution to the max contribution
            if(sWithAWByRetirement[1] < realRetirementTotal * 0.5){
                suggestions.push("With your current saving habits, you will most likely only have enough money to be safely retired for 12 years. Saving for reirement should be your top priority.");
            }
            //if user makes more than the max amount to contribute to an IRA, no reason in suggesting an IRA
            if(this.user.income * 12 < 214000){
                let hasRoth = this.user.hasAccount("Roth IRA");
                let hasTrad = this.user.hasAccount("Traditional IRA");
                let has401K = this.user.hasAccount("401K");
                let maxIRACont = this.user.getMaxIRACont();
                //calculate how much the user needs to be saving per month if they want to retire safely
                //to simplify calculations, take average interest between Roth and traditional IRA
                var avgInterest = 0;
                var count = 0;
                for(let account of this.user.retirementBankAccounts){
                    if(account.type == "Roth IRA" || account.type == "Traditional IRA"){
                        avgInterest += account.interest;
                        count += 1;
                    }
                }
                avgInterest = avgInterest/count;   
                let annualDeposit = this.calculateAnnualRequiredSavings(yearDiff, savingsByRetirement[0], avgInterest);
                console.log("annual deposit");
                console.log(annualDeposit);
                let saving = annualDeposit - maxIRACont;
                //check if user cannot save enough even with max contributions to both IRA's
                if(annualDeposit > (maxIRACont * 2) && saving != 0){
                    if(hasRoth && hasTrad && has401K){
                        suggestions.push(`To be able to retire safely, you should max out both your Traditional and Roth IRA. You should also be saving ${formatter.format(saving)} in your 401K per year.`);
                    }else if(hasRoth && hasTrad && !has401K){
                        suggestions.push(`To be able to retire safely, you should max out both your Traditional and Roth IRA. Next, open up a 401K and save ${formatter.format(saving)} per year in that account.`);
                    }else{
                        suggestions.push(`To be able to retire safely, you should be maxing out both a Traditional and Roth IRA. Next open up a 401K and save ${formatter.format(saving)} per year in that account.`);
                    }
                }else if(annualDeposit > maxIRACont && saving != 0){
                    //To save enough, the user needs to open a second IRA
                    if(hasRoth && !hasTrad){
                        suggestions.push(`To be able to retire safely, you need to save more than your max contribution. Consider opening a Traditional IRA as well. Max out your Roth IRA and save at least ${formatter.format(saving)} per year in the Traditional IRA.`);
                    }else if(!hasRoth && hasTrad){
                        suggestions.push(`To be able to retire safely, you need to save more than your max contribution. Consider opening a Roth IRA as well. Max out your Traditional IRA and save at least ${formatter.format(saving)} per year in the Roth IRA.`);
                    }else if(hasRoth && hasTrad){
                        suggestions.push(`To be able to have enough saved for retirement, you should max out the contribution in one of your IRA accounts. In the other one, you should be saving ${formatter.format(saving)} per year.`);
                    }else{
                        suggestions.push(`To have enough saved for retirement, you should open up both a Traditional and Roth IRA. You should max ut the contribution in one of your IRA accounts. In the other one, you should be saving ${formatter.format(saving)} per years.`);
                    }
                }else{
                    if(hasRoth || hasTrad && annualDeposit != 0){
                        suggestions.push(`To be able to retire safely, put in ${formatter.format(annualDeposit)} per year to your IRA account.`);
                    }else{
                        suggestions.push(`To be able to retire safely, open up a Traditional or Roth IRA and save ${formatter.format(annualDeposit)} per year in that account.`)
                    }
                }
            }else{
                //user makes too much to save into an IRA account
                let has401K = this.user.hasAccount("401K");
                let maxCont = this.user.getMax401KCont();
                let annualDeposit = this.calculateAnnualRequiredSavings(yearDiff, savingsByRetirement[0], avgInterest);
                if(annualDeposit > maxCont){
                    let amtAccounts = Math.ceil(annualDeposit/maxCont);
                    let excess = annualDeposit % maxCont;
                    suggestions.push(`To be able to retire safely, you should have ${amtAccounts} 401K accounts. Max out ${amtAccounts - 1} of them and save ${excess} in the last one.`);
                }else{
                    if(has401K){
                        suggestions.push(`To be able to retire safely, you should be investing ${formatter.format(annualDeposit)} into your 401K.`);
                    }else{
                        suggestions.push(`To be able to retire safely, you should be investing ${formatter.format(annualDeposit)} into a 401K.`);

                    }
                }
            }
        }
        return suggestions;
    }
    /**
     * Calculates how much the user will have in their account by the time they retire if they do not change their saving habit
     * @param {number} retirement_age 
     * @returns {[number]} array that contains future balances in retirement accounts. Index 0 does not include inflation, index 1 does include inflation 
     */
    calculateCurrentTrendByRetirement(retirement_age){
        //amount of years until the user reaches retirement age
        let yearDiff = retirement_age - this.user.getAge();
        //future account balance of retirement accounts not including inflation
        var futureTotalRetirementAccountBalances = 0;
        //run through the user's accounts and save the one's that are retirement accounts 
        for(let account of this.user.retirementBankAccounts){
            futureTotalRetirementAccountBalances = futureTotalRetirementAccountBalances + this.calculateFutureValueWithMonthy(account, yearDiff);
        }
        //future account balance of retirement accounts including the effect of inflation
        var futureRealTotalRetirementAccountBalances = this.calculateRealFutureValue(futureTotalRetirementAccountBalances, yearDiff);
        return [futureTotalRetirementAccountBalances, futureRealTotalRetirementAccountBalances];
    }
    /**
     * Calcualtes how much the user will have saved in their retirement accounts by the time they reach their retirement age
     * @param {number} retirement_age 
     * @returns {[number]} array that contains future balances in retirement accounts. Index 0 does not include inflation, index 1 does include inflation
     */
    calculateCurrentSavingsByRetirement(retirement_age){
        //amount of years until the user reaches retirement age
        let yearDiff = retirement_age - this.user.getAge();
        //future account balance of retirement accounts not including inflation
        console.log("future");
        var futureTotalRetirementAccountBalances = 0;
        for(let account of this.user.retirementBankAccounts){
            const futureVal = this.caluclateFutueValue(account.balance, account.interest, yearDiff);
            futureTotalRetirementAccountBalances = futureTotalRetirementAccountBalances + futureVal;
        }
        //future account balance of retirement accounts including the effect of inflation
        var futureRealTotalRetirementAccountBalances = this.calculateRealFutureValue(futureTotalRetirementAccountBalances, yearDiff);
        return [futureTotalRetirementAccountBalances, futureRealTotalRetirementAccountBalances];
    }
    
    /**
     * Calculates how much the user needs to save per month to be able to retire safely
     * @param {number} periods years until user retires
     * @param {number} currVal current saved balance
     * @param {number} interest interest the account provides
     * @returns {number} annual deposit to IRA accounts required
     */
    calculateAnnualRequiredSavings(periods, currVal, interest){
        let total = this.user.income * 12 * 25;
        let diff = total - currVal;
        if(diff < 0){
            return 0;
        }else{
            console.log(diff);
            const num = (interest*(1+interest)**periods)
            const denom = (1+interest)**periods - 1
            console.log(num)
            console.log(denom)
            return diff*(num/denom);
        }
    }
    /**
     * Calcualtes the value of an account after periods amount of periods
     * @param {bankACcount} account 
     * @param {number} periods 
     * @returns {number} Future account balance
     */
    caluclateFutueValue(value, interest, periods){
        return value*(1 + interest)**periods;
    }

    /**
     * Calculates how much a value would be in today's dollars. Assumes 2.5% interest
     * @param {number} value 
     * @param {number} periods
     * @returns {number} future value with the effect of inflation after period periods
     */
    calculateRealFutureValue(future_value, periods){
        return future_value*(1.025)**(-periods);
    }

    /**
     * Calculates value of an account after periods amount of periods. Includes monthly contributions into calculation
     * @param {number} account 
     * @param {number} periods
     * @returns {number} Account balance in future worth 
     */
    calculateFutureValueWithMonthy(account, periods){
        var annualWInFW = (account.monthyContribution*12) * ((((1+account.interest)**periods)-1)/account.interest);
        var currBalanceInFW = this.caluclateFutueValue(account.balance, account.interest, periods);
        return annualWInFW + currBalanceInFW;
    }
}
export default RetirementSuggestor;