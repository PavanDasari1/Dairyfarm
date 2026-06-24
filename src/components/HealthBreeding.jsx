import React, { useState } from 'react';
import { Activity, Plus, ShieldAlert, Heart, Calendar, X } from 'lucide-react';

export default function HealthBreeding({ cows, healthLogs, onAddHealthLog, openModal, setOpenModal }) {
  const [healthForm, setHealthForm] = useState({
    cowId: '',
    type: 'Vaccination',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Completed'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!healthForm.cowId) return alert('Please select a cow!');
    if (!healthForm.description) return alert('Please enter a description!');

    onAddHealthLog({
      id: Date.now(),
      cowId: healthForm.cowId,
      type: healthForm.type,
      date: healthForm.date,
      description: healthForm.description,
      status: healthForm.status
    });

    // Reset Form
    setHealthForm({
      cowId: cows[0]?.id || '',
      type: 'Vaccination',
      date: new Date().toISOString().split('T')[0],
      description: '',
      status: 'Completed'
    });
    setOpenModal(null);
  };

  // Group pregnancy statistics
  const pregnantCows = cows.filter(c => c.status === 'Pregnant');
  const sickCows = cows.filter(c => c.status === 'Sick');

  return (
    <div className="health-view animate-fade-in">
      <div className="content-header">
        <div className="header-title">
          <h1>Health & Breeding Tracker</h1>
          <p>Record medical checkups, inseminations, pregnancy status, and treatments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenModal('health')}>
          <Plus size={18} /> Record Health Event
        </button>
      </div>

      {/* Stats summary row */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-info">
            <span className="kpi-label">Pregnant Cows</span>
            <span className="kpi-value">{pregnantCows.length} Cows</span>
            <span style={{ fontSize: '12px', color: 'var(--accent-milk)' }}>
              Monitoring calving periods
            </span>
          </div>
          <div className="kpi-icon-wrapper milk">
            <Heart size={20} />
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-info">
            <span className="kpi-label">Active Medical Isolation</span>
            <span className="kpi-value">{sickCows.length} Cows</span>
            <span style={{ fontSize: '12px', color: sickCows.length > 0 ? 'var(--danger)' : 'var(--text-secondary)' }}>
              {sickCows.length > 0 ? 'Urgent veterinary monitoring' : 'Clean bill of health'}
            </span>
          </div>
          <div className="kpi-icon-wrapper danger">
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-info">
            <span className="kpi-label">Total Logs Recorded</span>
            <span className="kpi-value">{healthLogs.length} Events</span>
            <span style={{ fontSize: '12px', color: 'var(--success)' }}>
              All records cataloged
            </span>
          </div>
          <div className="kpi-icon-wrapper primary">
            <Activity size={20} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Main Logs Table */}
        <div className="content-card">
          <h3>Recent Medical and Breeding Records</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cow Tag</th>
                  <th>Event Type</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {healthLogs.length > 0 ? (
                  [...healthLogs].reverse().map(log => (
                    <tr key={log.id}>
                      <td>
                        <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        {log.date}
                      </td>
                      <td style={{ fontWeight: '600' }}>🐄 {log.cowId}</td>
                      <td>
                        <span className={`tag ${
                          log.type === 'Vaccination' ? 'info' : 
                          log.type === 'Vet Visit' ? 'sick' : 
                          log.type === 'Breeding' ? 'pregnant' : 'milking'
                        }`} style={{ borderRadius: '4px' }}>
                          {log.type}
                        </span>
                      </td>
                      <td>{log.description}</td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: log.status === 'Completed' ? 'var(--success)' : 'var(--warning)' }}>
                          ● {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                      No health events logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pregnant Cows and Calving Countdown List */}
        <div className="content-card">
          <h3>Maternity Monitoring</h3>
          {pregnantCows.length > 0 ? (
            <div className="activity-list">
              {pregnantCows.map(cow => (
                <div className="activity-item" key={cow.id}>
                  <div className="activity-badge calve">
                    <Heart size={18} />
                  </div>
                  <div className="activity-details">
                    <span className="activity-text">Cow {cow.id} ({cow.breed})</span>
                    <span className="activity-desc">Lactation: {cow.lactation} • Status: Gestation period active</span>
                    <span className="activity-time">Expected Calving: Approx. 6-8 months</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
              No cows currently marked as Pregnant.
            </p>
          )}
        </div>
      </div>

      {/* Modal: Log Health Event */}
      {openModal === 'health' && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Record Health & Breeding Event</h3>
              <button className="modal-close" onClick={() => setOpenModal(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label htmlFor="healthCow">Cow Tag ID *</label>
                  <select 
                    id="healthCow"
                    className="form-control"
                    required
                    value={healthForm.cowId}
                    onChange={(e) => setHealthForm({...healthForm, cowId: e.target.value})}
                  >
                    <option value="">Select Cow</option>
                    {cows.map(cow => (
                      <option key={cow.id} value={cow.id}>Cow {cow.id} ({cow.breed} - {cow.status})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="eventType">Event Type</label>
                  <select 
                    id="eventType"
                    className="form-control"
                    value={healthForm.type}
                    onChange={(e) => setHealthForm({...healthForm, type: e.target.value})}
                  >
                    <option value="Vaccination">Vaccination</option>
                    <option value="Vet Visit">Veterinary Inspection</option>
                    <option value="Breeding">Artificial Insemination</option>
                    <option value="Calving">Calving event</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="eventDate">Event Date</label>
                  <input 
                    type="date"
                    id="eventDate"
                    className="form-control"
                    required
                    value={healthForm.date}
                    onChange={(e) => setHealthForm({...healthForm, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventStatus">Status</label>
                  <select 
                    id="eventStatus"
                    className="form-control"
                    value={healthForm.status}
                    onChange={(e) => setHealthForm({...healthForm, status: e.target.value})}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Scheduled">Scheduled/Planned</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="healthDesc">Diagnostic / Log Description *</label>
                  <textarea 
                    id="healthDesc"
                    className="form-control"
                    rows="3"
                    placeholder="e.g. Injected 5ml Foot-and-Mouth vaccine, no side effects observed."
                    required
                    value={healthForm.description}
                    onChange={(e) => setHealthForm({...healthForm, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
