import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function InputData() {
  function AddMonthly() {
    var monthlyform = `<div class="col">
      <div>
        <select id="MonthlyExpenses">
          <option selected>Type of Expense</option>
          <option value="1">Transportion</option>
          <option value="2">Housing</option>
          <option value="3">Food</option>
          <option value="4">Insurance</option>
          <option value="5">Healthcare</option>
          <option value="6">Entertainment</option>
          <option value="7">Charity</option>
          <option value="8">Clothes and Accesories</option>
          <option value="9">Other</option>
        </select>
      </div>
    </div>
    <div class="col">
      <div>
        <input type="number" class="form-control" id="MonthlyExpenses" placeholder="Money Spent on Clothes e.g. 57.32"></input>
      </div>
    </div>`;

    var div = document.getElementById("monthly-expenses");
    div.append(monthlyform);
  }

  return (
    <div class="container-sm">
      <div>
        <h2>Please Input Finacial Data</h2>
      </div>

      <form>
        <div class="row">
          <div class="col">
            <label for="YearlyIncome" class="form-label">
              What is your yearly income?
            </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                type="number"
                class="form-control"
                id="YearlyIncome"
                placeholder="Monthly Spending e.g. 70000"
              ></input>
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row" id="monthly-expenses-savings">
          <label for="MonthlyExpenses" class="form-label">
            What Are Your Monthly Expenses?
          </label>
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25 text-center">
              <span class="input-group-text">Savings</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="Money Spent on Clothes e.g. 57.32"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-rent">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25 text-center">
              <span class="input-group-text">Rent</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-groceries">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25 text-center">
              <span class="input-group-text">Groceries</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-utilities">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25 text-center">
              <span class="input-group-text">Utilites</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-entertainment">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25 text-center">
              <span class="input-group-text">Entertainment</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-clothing">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
              <span class="input-group-text">Clothing</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-restaurant">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
              <span class="input-group-text">Restaurants</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="monthly-expenses-other">
          <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
              <span class="input-group-text">Other</span>
            </div>
            <input
              type="number"
              class="form-control"
              id=""
              placeholder="1133.33"
            ></input>
          </div>
        </div>

        <div class="row" id="submit-button">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1">Submit</button>
        </div>
      </form>
      <br></br>
    </div>
  );
}

export default InputData;
