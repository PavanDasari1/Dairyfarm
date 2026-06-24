import React, { useState } from 'react';
import { Milk, Calendar, Plus, X } from 'lucide-react';

export default function MilkLog({ cows, milkLogs, onAddMilkLog, openModal, setOpenModal }) {
  const [logForm, setLogForm] = useState({
    cowId: 'All', // 'All' represents bulk herd production, or select individual cow
    date: new Date().toISOString().split('T')[0],
    session: 'Morning',
    liters: '',
    fat: '4.2',
    protein: '3.4',
    temp: '37.2'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!logForm.liters) return alert('Please enter milk liters!');

    onAddMilkLog({
      id: Date.now(),
      cowId: logForm.cowId,
      date: logForm.date,
      session: logForm.session,
      liters: Number(logForm.liters),
      fat: Number(logForm.fat),
      protein: Number(logForm.protein),
      temp: Number(logForm.temp)
    });

    // Reset Form
    setLogForm({
      cowId: 'All',
      date: new Date().toISOString().split('T')[0],
      session: 'Morning',
      liters: '',
      fat: '4.2',
      protein: '3.4',
      temp: '37.2'
    });
    setOpenModal(null);
  };

  // Group stats for today's logs
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = milkLogs.filter(l => l.date === todayStr);
  const morningLogs = todayLogs.filter(l => l.session === 'Morning');
  const eveningLogs = todayLogs.filter(l => l.session === 'Evening');

  const todayTotal = todayLogs.reduce((sum, l) => sum + l.liters, 0);
  const morningTotal = morningLogs.reduce((sum, l) => sum + l.liters, 0);
  const eveningTotal = eveningLogs.reduce((sum, l) => sum + l.liters, 0);

  const avgFat = todayLogs.length > 0 
    ? (todayLogs.reduce((sum, l) => sum + l.fat, 0) / todayLogs.length).toFixed(2)
    : 0;

  const avgProtein = todayLogs.length > 0 
    ? (todayLogs.reduce((sum, l) => sum + l.protein, 0) / todayLogs.length).toFixed(2)
    : 0;

  return (
    <div className="milk-view animate-fade-in">
      <div className="content-header">
        <div className="header-title">
          <h1>Milk Production Log</h1>
          <p>Record, monitor yields, and analyze milk quality components</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenModal('milk')}>
          <Plus size={18} /> Log Milk Yield
        </button>
      </div>

      {/* Production stats row */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-info">
            <span className="kpi-label">Today's Total Production</span>
            <span className="kpi-value">{todayTotal.toFixed(1)} L</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              AM: {morningTotal.toFixed(1)}L • PM: {eveningTotal.toFixed(1)}L
            </span>
          </div>
          <div className="kpi-icon-wrapper milk">
            <Milk size={20} />
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-info">
            <span className="kpi-label">Average Fat Content</span>
            <span className="kpi-value">{avgFat}%</span>
            <span style={{ fontSize: '12px', color: 'var(--success)' }}>Optimal target: 3.8% - 4.5%</span>
          </div>
          <div className="kpi-icon-wrapper primary">
            <span style={{ fontWeight: '700', fontSize: '14px' }}>F</span>
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-info">
            <span className="kpi-label">Average Protein Content</span>
            <span className="kpi-value">{avgProtein}%</span>
            <span style={{ fontSize: '12px', color: 'var(--info)' }}>Optimal target: 3.2% - 3.6%</span>
          </div>
          <div className="kpi-icon-wrapper info">
            <span style={{ fontWeight: '700', fontSize: '14px' }}>P</span>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="content-card">
        <div className="card-title-bar">
          <h3>Milk Log Records</h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Milking Date</th>
                <th>Session</th>
                <th>Cow Tag ID</th>
                <th>Yield (Liters)</th>
                <th>Fat %</th>
                <th>Protein %</th>
                <th>Temp (°C)</th>
              </tr>
            </thead>
            <tbody>
              {milkLogs.length > 0 ? (
                [...milkLogs].reverse().map(log => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: '500' }}>
                      <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      {log.date}
                    </td>
                    <td>
                      <span className={`tag ${log.session === 'Morning' ? 'milking' : 'pregnant'}`} style={{ borderRadius: '4px' }}>
                        {log.session}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600' }}>
                      {log.cowId === 'All' ? '📢 Bulk Herd' : `🐄 ${log.cowId}`}
                    </td>
                    <td style={{ fontWeight: '700', color: 'var(--primary-hover)' }}>{log.liters} L</td>
                    <td>{log.fat}%</td>
                    <td>{log.protein}%</td>
                    <td>{log.temp}°C</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                    No milk logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Log Milk Yield */}
      {openModal === 'milk' && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Log Milk Session</h3>
              <button className="modal-close" onClick={() => setOpenModal(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label htmlFor="cowSelect">Source</label>
                  <select 
                    id="cowSelect"
                    className="form-control"
                    value={logForm.cowId}
                    onChange={(e) => setLogForm({...logForm, cowId: e.target.value})}
                  >
                    <option value="All">Bulk Herd (Total Tank)</option>
                    {cows.filter(c => c.status === 'Milking').map(cow => (
                      <option key={cow.id} value={cow.id}>Cow {cow.id} ({cow.breed})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="milkDate">Date</label>
                  <input 
                    type="date"
                    id="milkDate"
                    className="form-control"
                    required
                    value={logForm.date}
                    onChange={(e) => setLogForm({...logForm, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="milkSession">Milking Session</label>
                  <select 
                    id="milkSession"
                    className="form-control"
                    value={logForm.session}
                    onChange={(e) => setLogForm({...logForm, session: e.target.value})}
                  >
                    <option value="Morning">Morning Session</option>
                    <option value="Evening">Evening Session</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="milkLiters">Yield (Liters) *</label>
                  <input 
                    type="number"
                    id="milkLiters"
                    min="0.1"
                    step="0.1"
                    className="form-control"
                    placeholder="e.g. 24.5"
                    required
                    value={logForm.liters}
                    onChange={(e) => setLogForm({...logForm, liters: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="milkFat">Fat Content (%)</label>
                  <input 
                    type="number"
                    id="milkFat"
                    min="1"
                    max="10"
                    step="0.01"
                    className="form-control"
                    value={logForm.fat}
                    onChange={(e) => setLogForm({...logForm, fat: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="milkProtein">Protein Content (%)</label>
                  <input 
                    type="number"
                    id="milkProtein"
                    min="1"
                    max="10"
                    step="0.01"
                    className="form-control"
                    value={logForm.protein}
                    onChange={(e) => setLogForm({...logForm, protein: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="milkTemp">Temperature (°C)</label>
                  <input 
                    type="number"
                    id="milkTemp"
                    min="0"
                    max="50"
                    step="0.1"
                    className="form-control"
                    value={logForm.temp}
                    onChange={(e) => setLogForm({...logForm, temp: e.target.value})}
                  />
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
