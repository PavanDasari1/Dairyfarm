import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, Calendar, X } from 'lucide-react';

export default function FinanceHub({ transactions, onAddTransaction, openModal, setOpenModal }) {
  const [transForm, setTransForm] = useState({
    type: 'Income',
    category: 'Milk Sales',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [typeFilter, setTypeFilter] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transForm.amount || Number(transForm.amount) <= 0) return alert('Please enter a valid amount!');
    if (!transForm.description) return alert('Please enter a description!');

    onAddTransaction({
      id: Date.now(),
      type: transForm.type,
      category: transForm.category,
      amount: Number(transForm.amount),
      date: transForm.date,
      description: transForm.description
    });

    // Reset Form
    setTransForm({
      type: 'Income',
      category: 'Milk Sales',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setOpenModal(null);
  };

  // Auto-adjust categories when type changes
  const handleTypeChange = (type) => {
    const defaultCat = type === 'Income' ? 'Milk Sales' : 'Feed';
    setTransForm({
      ...transForm,
      type,
      category: defaultCat
    });
  };

  // Calculations
  const incomeTrans = transactions.filter(t => t.type === 'Income');
  const expenseTrans = transactions.filter(t => t.type === 'Expense');

  const totalIncome = incomeTrans.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTrans.reduce((sum, t) => sum + t.amount, 0);
  const netIncome = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter(t => {
    if (typeFilter === 'All') return true;
    return t.type === typeFilter;
  });

  return (
    <div className="finance-view animate-fade-in">
      <div className="content-header">
        <div className="header-title">
          <h1>Financial Ledger</h1>
          <p>Track operating expenses, silage costs, medicine, labor wages, and raw milk sales revenue</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenModal('transaction')}>
          <Plus size={18} /> Record Transaction
        </button>
      </div>

      {/* Financial Ledger Cards */}
      <div className="ledger-summary-grid">
        <div className="ledger-summary-card">
          <h4>Total Cash Inflow (Revenue)</h4>
          <span className="value income">+${totalIncome.toLocaleString()}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Milk sales, calf sales, compost</span>
        </div>

        <div className="ledger-summary-card">
          <h4>Total Cash Outflow (Expenses)</h4>
          <span className="value expense">-${totalExpense.toLocaleString()}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Feed, medical, vet fees, wages</span>
        </div>

        <div className="ledger-summary-card">
          <h4>Net Profit / Cash Flow</h4>
          <span className="value" style={{ color: netIncome >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            {netIncome < 0 && '-'}${Math.abs(netIncome).toLocaleString()}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
            Operating profit margin: {totalIncome > 0 ? ((netIncome / totalIncome) * 100).toFixed(1) : 0}%
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        
        {/* Ledger table */}
        <div className="content-card">
          <div className="card-title-bar">
            <h3>Recent Ledger Sheets</h3>
            <select 
              className="select-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Income">Inflow (Income)</option>
              <option value="Expense">Outflow (Expenses)</option>
            </select>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  [...filteredTransactions].reverse().map(trans => (
                    <tr key={trans.id}>
                      <td>
                        <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        {trans.date}
                      </td>
                      <td>
                        <span className={`tag ${trans.type === 'Income' ? 'milking' : 'sick'}`} style={{ borderRadius: '4px', fontSize: '11px' }}>
                          {trans.category}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{trans.description}</td>
                      <td style={{ 
                        textAlign: 'right', 
                        fontWeight: '700', 
                        color: trans.type === 'Income' ? 'var(--success)' : 'var(--danger)'
                      }}>
                        {trans.type === 'Income' ? '+' : '-'}${trans.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                      No transactions recorded in this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses Category Share (Custom CSS bars representing mock distribution) */}
        <div className="content-card">
          <h3>Expense Distribution</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '500' }}>Feed & Silage Stock</span>
                <span style={{ fontWeight: '600' }}>65%</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar danger" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '500' }}>Wages & Labor Salaries</span>
                <span style={{ fontWeight: '600' }}>20%</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar warning" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '500' }}>Vet Bills & Vaccinations</span>
                <span style={{ fontWeight: '600' }}>10%</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar warning" style={{ width: '10%' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '500' }}>Utilities & Miscellaneous</span>
                <span style={{ fontWeight: '600' }}>5%</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar success" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal: Add Transaction */}
      {openModal === 'transaction' && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Record Transaction</h3>
              <button className="modal-close" onClick={() => setOpenModal(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ marginBottom: '20px' }}>
                
                <div className="form-group">
                  <label htmlFor="transType">Transaction Type</label>
                  <select 
                    id="transType"
                    className="form-control"
                    value={transForm.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                  >
                    <option value="Income">Inflow (Income)</option>
                    <option value="Expense">Outflow (Expense)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transCategory">Category</label>
                  {transForm.type === 'Income' ? (
                    <select 
                      id="transCategory"
                      className="form-control"
                      value={transForm.category}
                      onChange={(e) => setTransForm({...transForm, category: e.target.value})}
                    >
                      <option value="Milk Sales">Milk Sales</option>
                      <option value="Cattle Sales">Cattle Sales</option>
                      <option value="Organic Manure Sales">Organic Manure Sales</option>
                      <option value="Other Revenue">Other Revenue</option>
                    </select>
                  ) : (
                    <select 
                      id="transCategory"
                      className="form-control"
                      value={transForm.category}
                      onChange={(e) => setTransForm({...transForm, category: e.target.value})}
                    >
                      <option value="Feed">Feed & Silage Purchase</option>
                      <option value="Medicine">Medicine & Vaccines</option>
                      <option value="Vet Fees">Veterinary Fees</option>
                      <option value="Wages">Wages & Salaries</option>
                      <option value="Utilities">Utilities & Water</option>
                      <option value="Equipment">Equipment Maintenance</option>
                    </select>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="transAmount">Amount ($) *</label>
                  <input 
                    type="number"
                    id="transAmount"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 1200"
                    required
                    value={transForm.amount}
                    onChange={(e) => setTransForm({...transForm, amount: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transDate">Transaction Date</label>
                  <input 
                    type="date"
                    id="transDate"
                    className="form-control"
                    required
                    value={transForm.date}
                    onChange={(e) => setTransForm({...transForm, date: e.target.value})}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="transDesc">Ledger Description *</label>
                  <input 
                    type="text"
                    id="transDesc"
                    className="form-control"
                    placeholder="e.g. Sold 450 Liters milk to cooperative milk depot."
                    required
                    value={transForm.description}
                    onChange={(e) => setTransForm({...transForm, description: e.target.value})}
                  />
                </div>

              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
