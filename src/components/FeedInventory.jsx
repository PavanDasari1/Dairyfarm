import React, { useState } from 'react';
import { AlertTriangle, Plus, RefreshCw, X } from 'lucide-react';

export default function FeedInventory({ feedInventory, onUpdateStock, openModal, setOpenModal }) {
  const [replenishForm, setReplenishForm] = useState({
    name: 'Silage',
    amount: '',
    action: 'Add' // 'Add' (restock) or 'Subtract' (usage log)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replenishForm.amount || Number(replenishForm.amount) <= 0) return alert('Please enter a valid amount!');

    const amountChange = replenishForm.action === 'Add' 
      ? Number(replenishForm.amount) 
      : -Number(replenishForm.amount);

    onUpdateStock(replenishForm.name, amountChange);

    // Reset Form
    setReplenishForm({
      name: 'Silage',
      amount: '',
      action: 'Add'
    });
    setOpenModal(null);
  };

  return (
    <div className="feed-view animate-fade-in">
      <div className="content-header">
        <div className="header-title">
          <h1>Feed & Supply Inventory</h1>
          <p>Monitor storage capacity levels, log silage and concentrates usage, and set low stock alerts</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenModal('feedUpdate')}>
          <RefreshCw size={18} /> Update Stock Level
        </button>
      </div>

      {/* Grid of Feed Stocks */}
      <div className="inventory-grid" style={{ marginBottom: '32px' }}>
        {feedInventory.map((feed) => {
          const percentage = (feed.current / feed.capacity) * 100;
          let levelClass = 'success';
          if (percentage < 25) levelClass = 'danger';
          else if (percentage < 55) levelClass = 'warning';

          return (
            <div className="inv-card" key={feed.name}>
              <div className="inv-header">
                <div className="inv-info">
                  <h4>{feed.name}</h4>
                  <p>Daily Usage: ~{feed.dailyUsage} {feed.unit}</p>
                </div>
                {percentage < 25 && (
                  <span className="inv-alert">
                    <AlertTriangle size={14} /> Low
                  </span>
                )}
              </div>

              <div className="inv-progress-container">
                <div 
                  className={`inv-progress-bar ${levelClass}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <div className="inv-stats-row">
                <span className="text-secondary">Current Stock</span>
                <span className="inv-level">
                  {feed.current.toLocaleString()} / {feed.capacity.toLocaleString()} {feed.unit} ({percentage.toFixed(0)}%)
                </span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-light)', borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Days remaining:</span>
                <span style={{ fontWeight: '600', color: percentage < 25 ? 'var(--danger)' : 'var(--text-primary)' }}>
                  {feed.dailyUsage > 0 ? Math.floor(feed.current / feed.dailyUsage) : '∞'} days
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational details and recommendation system */}
      <div className="content-card">
        <h3>Smart Stock Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '10px' }}>
          
          <div style={{ background: 'var(--primary-light)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
            <h4 style={{ color: 'var(--primary-hover)', marginBottom: '8px' }}>🌾 Optimal Feeding Guidelines</h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Ensure cows in the <strong>Milking</strong> stage receive 25kg silage and 5kg concentrates daily to maintain high milk yield efficiency. Dry cows require a diet focused more on alfalfa and mineral mixes.
            </p>
          </div>

          <div style={{ background: 'var(--accent-milk-light)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(217, 119, 6, 0.15)' }}>
            <h4 style={{ color: 'var(--accent-milk)', marginBottom: '8px' }}>🚛 Stock Replenishment Planner</h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              If stock levels fall below 25%, coordinate order placement immediately. Concentrates and specific mineral premixes require approximately 3 business days for transit and delivery.
            </p>
          </div>

        </div>
      </div>

      {/* Modal: Update Stock */}
      {openModal === 'feedUpdate' && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Log Stock adjustment</h3>
              <button className="modal-close" onClick={() => setOpenModal(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ marginBottom: '20px' }}>
                
                <div className="form-group">
                  <label htmlFor="feedSelect">Select Feed Item</label>
                  <select 
                    id="feedSelect"
                    className="form-control"
                    value={replenishForm.name}
                    onChange={(e) => setReplenishForm({...replenishForm, name: e.target.value})}
                  >
                    {feedInventory.map(f => (
                      <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="feedAction">Adjustment Action</label>
                  <select 
                    id="feedAction"
                    className="form-control"
                    value={replenishForm.action}
                    onChange={(e) => setReplenishForm({...replenishForm, action: e.target.value})}
                  >
                    <option value="Add">Restock / Add Stock</option>
                    <option value="Subtract">Usage / Feed Stock Log</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="feedAmount">Quantity (kg) *</label>
                  <input 
                    type="number"
                    id="feedAmount"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 500"
                    required
                    value={replenishForm.amount}
                    onChange={(e) => setReplenishForm({...replenishForm, amount: e.target.value})}
                  />
                </div>

              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Apply Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
