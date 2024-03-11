import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Accounts = (props) => {

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'usd'
    })

    let accountsElements = props.accounts.map((account) => (
        <Row>
            <h3 className="account-status">{account.type} {formatter.format(account.balance)}</h3>
        </Row>
    ))

    return <Container>
        <Col>
            <h3 className="column-header">Accounts</h3>
            {accountsElements}
        </Col>
    </Container>
}

export default Accounts;