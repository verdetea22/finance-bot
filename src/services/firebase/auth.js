import { Timestamp, doc, getDoc } from "firebase/firestore";
import BankAccount from "../../objects/bankAccount";
import User from "../../objects/user";
import { Transaction } from "firebase/firestore";
import { auth, db } from "./config";
import { onAuthStateChanged } from "firebase/auth"

const userConverter = {
    toFirestore: (user) => {
        const convertTransaction = (transaction) => {
            let t = { ...transaction };
            t.date = Timestamp.fromDate(t.date);
            return t;
        };

        return {

        
            monthyTransactions: user.monthyTransactions.map( mTransaction => {
                return convertTransaction(mTransaction);
            }),
            monthyReoccuringTransactions: user.monthyReoccuringTransactions.map( rTransaction => {
                return { 
                    startDate: Timestamp.fromDate(rTransaction.startDate),
                    period: rTransaction.peroid
                };
            }),
            bankAccounts: user.bankAccounts.map(bnkAccount => {
                let bnk = { ...bnkAccount };
                bnk.transactionHistory = bnk.transactionHistory.map( tr => {
                    return convertTransaction(tr);
                });
            }),
            retirementBankAccounts: user.retirementBankAccounts.map(rBnkAccount => {
                let bnk = { ...rBnkAccount };
                bnk.transactionHistory = bnk.transactionHistory.map( tr => {
                    return convertTransaction(tr);
                });
            }),
            dateOfBirth: Timestamp.fromDate(user.dateOfBirth),
            ...user     
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);

        const convertToTransaction = (transaction) => new Transaction(
            transaction.amount,
            transaction.title,
            transaction.description,
            transaction.date.toDate()
        )

        return new User(
            data.email,
            data.name,
            data.income,
            data.monthyTransactions.map(t => convertToTransaction(t)),
            data.bankAccounts.map( bnk => new BankAccount(
                data.balance, 
                data.interest, 
                data.transactionHistory.map( t => convertToTransaction(t)),
                data.type
            )),
            data.retirementBankAccounts.map( bnk => new BankAccount(
                data.balance, 
                data.interest, 
                data.transactionHistory.map( t => convertToTransaction(t)),
                data.type
            )),
            data.monthyReoccuringTransactions.map(t => convertToTransaction(t)),
            data.retirementAge,
            data.nChildren,
            data.nChildrenCollege
        )
    }
};

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                //TODO: Get user data from firestore and create user object
                const userRef = doc(db, "users", user.uid).withConverter(userConverter);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists) {
                    let user = docSnap.data();
                    resolve(user);
                } else {
                    reject(new Error('User does not exist!'));
                }
                
            } else {
                resolve(null);
            }
        })
    });
};

export { userConverter, getCurrentUser };