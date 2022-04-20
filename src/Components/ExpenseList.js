import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDeleteOutline } from "react-icons/md";
export default function ExpenseList({
  expenses,
  clearItems,
  handleEdit,
  handleDelete
}) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses <MdDeleteOutline className="btn-icon" />
        </button>
      )}
    </>
  );
}
