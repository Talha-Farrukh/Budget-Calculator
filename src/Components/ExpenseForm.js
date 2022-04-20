import React from "react";
import { MdSend } from "react-icons/md";

export default function ExpenseForm( { charge, amount, handleAmount, handleCharge, handleSubmit, edit} ) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">charge</label>
          <input
            type="text"
            name="charge"
            id="charge"
            className="form-control"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            className="form-control"
            placeholder="e.g. 100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button className="btn" type="submit">{edit ? 'edit' : 'submit'}<MdSend className="btn-icon" /></button>
    </form>
  );
}
