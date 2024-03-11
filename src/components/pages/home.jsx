import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./pages.css";
import BankAccount from "../../objects/bankAccount";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import Transaction from "../../objects/transaction";
import User from "../../objects/user";
import SuggestionsBox from "../common/suggestions"
import Chart from "./chart"
import Accounts from "./accounts"
import { getCurrentUser } from "../../services/firebase/auth";

const Home = () => {

  const [ suggestions, setSuggestions ] = useState([]);
  const [ accounts, setAccounts ] = useState([]);
  const [wantsSpending, setWantsSpending] = useState(0);
  const [needsSpending, setNeedsSpending] = useState(0);
  const [savingsSpending, setSavingsSpending] = useState(0);

  useEffect(() => {
    const getUserInfo = async () => {
      let u = await getCurrentUser();
      if(u !== undefined && u !== null){
        let spendingSugs = u.getSpendingSuggestions();
        let accountSugs = u.getAccountSuggestions();
        let retireSugs = u.getRetirementSuggestions();
      
        var totalSugs = [...spendingSugs, ...accountSugs, ...retireSugs];
    
        setSuggestions(totalSugs);
        setWantsSpending(u.wantsSpending);
        setNeedsSpending(u.needsSpending);
        setSavingsSpending(u.savingsSpending);
        setAccounts([...u.bankAccounts, ...u.retirementBankAccounts])
      }else{
        window.location.href = "/login";
      }
    }
    return getUserInfo;
  }, [])


  return (<Container fluid>
    <Row>
      <Col><Accounts accounts={accounts}/></Col>
      <Col><Chart wantsSpending={wantsSpending} needsSpending={needsSpending} savingsSpending={savingsSpending} /></Col>
      <Col><SuggestionsBox suggestions={suggestions}></SuggestionsBox></Col>
    </Row>
  </Container>
  );
};

export default Home;
