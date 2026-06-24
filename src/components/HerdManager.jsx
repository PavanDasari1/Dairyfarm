import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Trash2, Eye, X } from 'lucide-react';

export default function HerdManager({ cows, onAddCow, onDeleteCow, openModal, setOpenModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [breedFilter, setBreedFilter] = useState('All');
  const [selectedCow, setSelectedCow] = useState(null);
  
  // Local form state for registering a new cow
  const [newCow, setNewCow] = useState({
    id: '',
    breed: 'Holstein-Friesian',
    status: 'Milking',
    lactation: '1st',
    dob: '',
    lastMilkYield: '0'
  });

  // Unique breed list from data
  const breeds = ['All', ...new Set(cows.map(c => c.breed))];

  // Filtered cow list
  const filteredCows = cows.filter(cow => {
    const matchesSearch = cow.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cow.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cow.status === statusFilter;
    const matchesBreed = breedFilter === 'All' || cow.breed === breedFilter;
    return matchesSearch && matchesStatus && matchesBreed;
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!newCow.id) return alert('Please enter a Tag ID!');
    
    // Check if ID already exists
    if (cows.some(c => c.id.toUpperCase() === newCow.id.toUpperCase())) {
      return alert('A cow with this Tag ID is already registered!');
    }

    const age = newCow.dob 
      ? Math.floor((new Date() - new Date(newCow.dob)) / (1000 * 60 * 60 * 24 * 365.25)) 
      : 2;

    onAddCow({
      ...newCow,
      id: newCow.id.toUpperCase(),
      age: age || 1,
      lastMilkYield: Number(newCow.lastMilkYield)
    });

    // Reset Form
    setNewCow({
      id: '',
      breed: 'Holstein-Friesian',
      status: 'Milking',
      lactation: '1st',
      dob: '',
      lastMilkYield: '0'
    });
    setOpenModal(null);
  };

  return (
    <div className="herd-view animate-fade-in">
      <div className="content-header" style={{ marginBottom: '20px' }}>
        <div className="header-title">
          <h1>Herd Registry</h1>
          <p>Manage, track health status, and lactation stages of your dairy cows</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenModal('cow')}>
          <Plus size={18} /> Register Cow
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} className="text-light" />
          <input 
            type="text" 
            placeholder="Search by Tag ID or Breed..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} className="text-secondary" />
            <select 
              className="select-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Milking">Milking</option>
              <option value="Dry">Dry</option>
              <option value="Pregnant">Pregnant</option>
              <option value="Sick">Sick</option>
            </select>

            <select 
              className="select-filter"
              value={breedFilter}
              onChange={(e) => setBreedFilter(e.target.value)}
            >
              {breeds.map(b => (
                <option key={b} value={b}>{b === 'All' ? 'All Breeds' : b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid List of Cows */}
      <div className="content-card">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Tag ID</th>
                <th>Breed</th>
                <th>Age (Years)</th>
                <th>Lactation Stage</th>
                <th>Status</th>
                <th>Last Session Yield</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCows.length > 0 ? (
                filteredCows.map(cow => (
                  <tr key={cow.id}>
                    <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      🐄 {cow.id}
                    </td>
                    <td>{cow.breed}</td>
                    <td>{cow.age} yrs</td>
                    <td>{cow.lactation}</td>
                    <td>
                      <span className={`tag ${cow.status.toLowerCase()}`}>
                        {cow.status}
                      </span>
                    </td>
                    <td>{cow.lastMilkYield} Liters</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '6px 10px', borderRadius: '8px' }}
                          onClick={() => setSelectedCow(cow)}
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '6px 10px', borderRadius: '8px', color: 'var(--danger)' }}
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove Cow ${cow.id}?`)) {
                              onDeleteCow(cow.id);
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                    No cows found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: View Cow Details */}
      {selectedCow && (
        <div className="modal-overlay" onClick={() => setSelectedCow(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Cow Details: {selectedCow.id}</h3>
              <button className="modal-close" onClick={() => setSelectedCow(null)}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', fontSize: '64px', padding: '20px 0' }}>
                🐄
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Tag ID</span>
                  <p style={{ fontWeight: '600' }}>{selectedCow.id}</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Status</span>
                  <p><span className={`tag ${selectedCow.status.toLowerCase()}`}>{selectedCow.status}</span></p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Breed</span>
                  <p style={{ fontWeight: '600' }}>{selectedCow.breed}</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Age</span>
                  <p style={{ fontWeight: '600' }}>{selectedCow.age} Years</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Lactation Stage</span>
                  <p style={{ fontWeight: '600' }}>{selectedCow.lactation}</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Last Yield</span>
                  <p style={{ fontWeight: '600' }}>{selectedCow.lastMilkYield} Liters</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Date of Birth</span>
                  <p style={{ fontWeight: '600' }}>{selectedCow.dob || 'N/A'}</p>
                </div>
              </div>

              <div className="btn-group">
                <button className="btn btn-secondary" onClick={() => setSelectedCow(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Register New Cow */}
      {openModal === 'cow' && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Register New Cow</h3>
              <button className="modal-close" onClick={() => setOpenModal(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-grid" style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label htmlFor="tagId">Tag ID *</label>
                  <input 
                    type="text" 
                    id="tagId"
                    className="form-control"
                    placeholder="e.g. COW-105"
                    required
                    value={newCow.id}
                    onChange={(e) => setNewCow({...newCow, id: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="breed">Breed</label>
                  <select 
                    id="breed"
                    className="form-control"
                    value={newCow.breed}
                    onChange={(e) => setNewCow({...newCow, breed: e.target.value})}
                  >
                    <option value="Holstein-Friesian">Holstein-Friesian</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Brown Swiss">Brown Swiss</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Ayrshire">Ayrshire</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select 
                    id="status"
                    className="form-control"
                    value={newCow.status}
                    onChange={(e) => setNewCow({...newCow, status: e.target.value})}
                  >
                    <option value="Milking">Milking</option>
                    <option value="Dry">Dry</option>
                    <option value="Pregnant">Pregnant</option>
                    <option value="Sick">Sick</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lactation">Lactation Stage</label>
                  <select 
                    id="lactation"
                    className="form-control"
                    value={newCow.lactation}
                    onChange={(e) => setNewCow({...newCow, lactation: e.target.value})}
                  >
                    <option value="1st">1st Lactation</option>
                    <option value="2nd">2nd Lactation</option>
                    <option value="3rd">3rd Lactation</option>
                    <option value="4th+">4th+ Lactation</option>
                    <option value="None (Heifer)">None (Heifer)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input 
                    type="date" 
                    id="dob"
                    className="form-control"
                    value={newCow.dob}
                    onChange={(e) => setNewCow({...newCow, dob: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="yield">Initial Milk Yield (L)</label>
                  <input 
                    type="number" 
                    id="yield"
                    min="0"
                    step="0.1"
                    className="form-control"
                    value={newCow.lastMilkYield}
                    onChange={(e) => setNewCow({...newCow, lastMilkYield: e.target.value})}
                  />
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
