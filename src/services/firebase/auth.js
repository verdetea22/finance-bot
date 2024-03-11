import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import BankAccount from "../../objects/bankAccount";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import User from "../../objects/user";
import Transaction from "../../objects/transaction";
import { auth, db } from "./config";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

const userConverter = {
    toFirestore: (user) => {
        const convertTransaction = (transaction) => {
            let t = { ...transaction };
            t.date = Timestamp.fromDate(t.date);
            return t;
        };
        const convertBankAccount = (account) => {
            let bnk = {...account};
            bnk.transactionHistory = bnk.transactionHistory.map((tr) => {
                convertTransaction(tr);
            })
            return bnk
        }
        return {
            monthyTransactions: user.monthyTransactions.map( (mTransaction) => {
                return convertTransaction(mTransaction);
            }),
            bankAccounts: user.bankAccounts.map(bnkAccount => {
                return convertBankAccount(bnkAccount);
            }),
            retirementBankAccounts: user.retirementBankAccounts.map( (rBnkAccount) => {
                console.log(convertBankAccount(rBnkAccount));
                return convertBankAccount(rBnkAccount);
            }),
            dOB: Timestamp.fromDate(user.dOB),
            name: user.name,
            email: user.email,
            retirementAge: user.retirementAge,
            income: user.income   
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        
        const convertToTransaction = (transaction) => {
            let t = new Transaction(transaction.amount, transaction.title, transaction.description, transaction.date.toDate());
            return t;
        }

        const convertToBankAccount = (bnkAccount) => new BankAccount(
            bnkAccount.balance,
            bnkAccount.interest,
            bnkAccount.transactionHistory.map( t => convertToTransaction(t)),
            bnkAccount.type
        )

        const convertToRetirementBankAccount = (bnkAccount) => new RetirementBankAccount(
            bnkAccount.balance,
            bnkAccount.interest,
            bnkAccount.transactionHistory.map( t => convertToTransaction(t)),
            bnkAccount.type,
            bnkAccount.monthlyContribution,
            bnkAccount.employerMatchMax
        )

        return new User(
            data.email,
            data.name,
            data.income,
            data.monthyTransactions.map((t) => convertToTransaction(t)),
            data.bankAccounts.map( (bnk) => convertToBankAccount(bnk)),
            data.retirementBankAccounts.map( (bnk) => convertToRetirementBankAccount(bnk)),
            [],
            data.retirementAge,
            data.dOB.toDate()
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
                if (docSnap.exists()) {
                    let user = docSnap.data();
                    
                    resolve(user);
                } else {
                    if(!window.location.href.includes("login") && !window.location.href.includes("sign-up") && !window.location.href.includes("/")){
                        window.location.href ="/login";
                    }
                }
                
            } else {
                resolve(null);
            }
        })
    });
};

const createUser = (name, email, password, dOB, income, retirement, expenses, bankAccounts, rBankAccounts) => {
    return new Promise((resolve, reject) =>{
        createUserWithEmailAndPassword (auth, email, password).then(async (userCredential) => {
            //Signed in
            const user = userCredential.user;
            const uID = user.uid;
            //TODO: create new user in firestore with specific UID
            const userRef = doc(db, "users", uID).withConverter(userConverter);
            let u = new User(email, name, income, expenses, bankAccounts, rBankAccounts, [], retirement, dOB);
            console.log(u.dOB);
            await setDoc(userRef, u);
            resolve("");
        }).catch((error) => {
            //TODO: display error to user
            reject(error.message);
        })
    })
}

function signIn(email, password){
    return new Promise((resolve, reject) =>{
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            window.location = "http://localhost:3000/home";
            resolve("");
        }).catch((error) => {
            const errorMessage = error.message;
            reject(errorMessage);
        })
    })
}

const signOutUser = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("sign out successful");
        window.location.href = "/login";
    }).catch((error) => {
        // An error happened.
        console.log(error.message);
    });
}

export { getCurrentUser, createUser, signIn, signOutUser };