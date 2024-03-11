import React, { useState } from "react";
import "./pages.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { createUser } from "./../../services/firebase/auth";
import { InputGroup } from "react-bootstrap";
import Transaction from "../../objects/transaction";
import BankAccount from "../../objects/bankAccount";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import User from "../../objects/user";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ name, email, password, dob, income, retirement, rent, groceries, utilities, entertainment, clothing, restaurants, other, saBalance, saInterest, cBalance, cInterest, mmBalance, mmInterest, cdBalance, cdInterest ,rIRABalance, rIRAInterest, tIRABalance, tIRAInterest, kBalance, kInterest }) => {
    console.log("here");
    //add expenses
    let expenses = [];
    if(parseFloat(rent) !== 0){
      expenses.push(new Transaction(parseFloat(rent), "Rent", "Rent", new Date(Date.now())));
    }
    if(parseFloat(groceries) !== 0){
      expenses.push(new Transaction(parseFloat(groceries), "Groceries", "Groceries", new Date(Date.now())));
    }
    if(parseFloat(utilities) !== 0){
      expenses.push(new Transaction(parseFloat(utilities), "Utilities", "Utilities", new Date(Date.now())));
    }
    if(parseFloat(entertainment) !== 0){
      expenses.push(new Transaction(parseFloat(entertainment), "Entertainment", "Entertainment", new Date(Date.now())));
    }
    if(parseFloat(clothing) !== 0){
      expenses.push(new Transaction(parseFloat(clothing), "Clothing", "Clothing", new Date(Date.now())));
    }
    if(parseFloat(restaurants) !== 0){
      expenses.push(new Transaction(parseFloat(restaurants), "Restaurants", "Restaurants", new Date(Date.now())));
    }
    if(parseFloat(other) !== 0){
      expenses.push(new Transaction(parseFloat(other), "Other", "Other", new Date(Date.now())));
    }
    //add bank accounts
    let bankAccounts = [];
    if(parseFloat(saBalance) !== 0){
      bankAccounts.push(new BankAccount(parseFloat(saBalance), (parseFloat(saInterest) * 0.01), [], "Savings"));
    }
    if(parseFloat(cBalance) !== 0){
      bankAccounts.push(new BankAccount(parseFloat(cBalance), (parseFloat(cInterest) * 0.01), [], "Checking"));
    }
    if(parseFloat(mmBalance) !== 0){
      bankAccounts.push(new BankAccount(parseFloat(mmBalance), (parseFloat(mmInterest) * 0.01), [], "Money Market"));
    }
    if(parseFloat(cdBalance) !== 0){
      bankAccounts.push(new BankAccount(parseFloat(cdBalance), (parseFloat(cdInterest) * 0.01), [], "CD"));
    }
    //retirement bank accounts
    let rBankAccounts = [];
    if(parseFloat(rIRABalance) !== 0){
      rBankAccounts.push(new RetirementBankAccount(parseFloat(rIRABalance), (parseFloat(rIRAInterest) * 0.01), [], "Roth IRA", 0, 0));
    }
    if(parseFloat(tIRABalance) !== 0){
      rBankAccounts.push(new RetirementBankAccount(parseFloat(tIRABalance), (parseFloat(tIRAInterest) * 0.01), [], "Traditional IRA", 0, 0));
    }
    if(parseFloat(kBalance) !== 0){
      rBankAccounts.push(new RetirementBankAccount(parseFloat(kBalance), (parseFloat(kInterest) * 0.01), [], "401K", 0, 0));
    }

    let dOB = new Date(Date.parse(dob));
    console.log(dOB);
    console.log(dob);
    let u = new User(email, name, income, expenses, bankAccounts, rBankAccounts, [], retirement, dOB);
    createUser(name, email, password, dOB, parseFloat(income), parseFloat(retirement), expenses, bankAccounts, rBankAccounts).then((res)=>{
      // Account created successfully
      alert("Account Created Successfully!");
      window.location.href ="/";

    }).catch((error)=>{
      // Error with account creation, display error
      console.log(error);
    });
  }
  return (<Form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
      <Form.Group className="mb-3 mx-5 mt-5" controlId="emailControl">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter email..." {...register("email")} />
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="nameControl">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name..." {...register("name")}/>
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="passwordControl">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter password..." {...register("password")}/>
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="dOBControl">
        <Form.Label>Date of Birth(mm/dd/yyyy)</Form.Label>
        <Form.Control type="text" placeholder="Enter date of birth..." {...register("dob")}/>
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="incomeControl">
        <Form.Label>Monthly Income(After tax)</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="e.g. 70000" {...register("income")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="retirementControl">
        <Form.Label>Planned Retirement Age</Form.Label>
        <Form.Control type="number" placeholder="Retirement Age..." {...register("retirement")}/>
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="expenseesControl">
        <Form.Label>Expenses(Put 0 if nothing spent)</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Rent or Mortgage" {...register("rent")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Groceries" {...register("groceries")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Utilities" {...register("utilities")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Entertainment" {...register("entertainment")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Clothing" {...register("clothing")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Restaurants and Take-out" {...register("restaurants")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Other" {...register("other")}/>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3 mx-5 mt-3" controlId="accountsControl">
        <Form.Label>Bank Accounts(Enter 0 if you don't have that type of account)</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Savings Account Balance" {...register("saBalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="number" placeholder="Savings Account Interest" {...register("saInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Checking Account Balance" {...register("cBalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="number" placeholder="Checking Account Interest" {...register("cInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="Money Market Account Balance" {...register("mmBalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="number" placeholder="Money Market Account Interest" {...register("mmInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="text" placeholder="CD Balance" {...register("cdBalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="text" placeholder="CD Interest" {...register("cdInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="text" placeholder="Roth IRA Balance" {...register("rIRABalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="text" placeholder="Roth IRA Interest" {...register("rIRAInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="text" placeholder="Traditional IRA Balance" {...register("tIRABalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="text" placeholder="Traditional IRA Interest" {...register("tIRAInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="text" placeholder="401k Account Balance" {...register("kBalance")}/>
          <InputGroup.Text>.00</InputGroup.Text>
          <Form.Control type="text" placeholder="401k Account Interest" {...register("kInterest")} />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button type="submit" className="mx-5" >Submit</Button>
    </Form>
  );
}


export default SignUp;
