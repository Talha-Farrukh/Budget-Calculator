import "./App.css";
import Alert from "./Components/Alert.js";
import ExpenseForm from "./Components/ExpenseForm.js";
import ExpenseList from "./Components/ExpenseList.js";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const intialExpense = localStorage.getItem('expenses') ? 
JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  // ********** All Expenses and edit Expenses ***********
  const [expenses, setExpenses] = useState(intialExpense);

  // ************ Single Expense *************
  const [charge, setCharge] = useState("");

  // ************** Single Amount ******************
  const [amount, setAmount] = useState("");

  // ************** Alert ****************
  const [alert, setAlert] = useState({ show: false });

  //******* Edit *********
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  // ********** Local storage saving ***********

  useEffect(() => {
    localStorage.setItem("expenses" ,JSON.stringify(expenses));
  }, [expenses])
  
  // *******  Fountionalities   *********

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(amount)) {
      handleAlert({ type: "danger", text: "Amount should be a Number" });
      setAmount("");
    } else {
      if (charge !== "" && amount > 0) {
        if (edit) {
          let temExpense = expenses.map(item => {
            return item.id === id ? {...item, charge, amount} : item;
          });
          setExpenses(temExpense);
          setEdit(false);
          handleAlert({ type : "success", text : "Item Edited"})
        } else {
          const singleExpense = { id: uuidv4(), charge, amount };
          setExpenses([...expenses, singleExpense]);
          handleAlert({ type: "success", text: "Item Added" });
        }
        setCharge("");
        setAmount("");
      } else {
        handleAlert({
          type: "danger",
          text: "Empty value of both charge and expense not be proceded",
        });
      }
    }
  };

  // ******** Clear all items *********
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items Deleted" });
  };

  // ********** Handle delete ************
  const handleDelete = (id) => {
    let temExpense = expenses.filter((item) => item.id !== id);
    setExpenses(temExpense);
    handleAlert({ type: "danger", text: "Item Deleted" });
    setEdit(false);
  };

  // ********** Handle edit ***********
  const handleEdit = (id) => {
    let editExpense = expenses.find((item) => item.id === id);
    let { charge, amount } = editExpense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
