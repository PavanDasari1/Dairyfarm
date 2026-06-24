import React from 'react';
import { Milk, Beef, Activity, Award, TrendingUp } from 'lucide-react';

export default function Details() {
  // Pre-calculated stats representing the farm's active state
  const totalCows = 154;
  const averageDailyYield = 3520;
  const averageFat = 4.25;
  const averageProtein = 3.42;

  // Last 7 days production records for chart
  const weeklyYields = [
    { label: 'Mon', value: 3450 },
    { label: 'Tue', value: 3620 },
    { label: 'Wed', value: 3500 },
    { label: 'Thu', value: 3580 },
    { label: 'Fri', value: 3420 },
    { label: 'Sat', value: 3510 },
    { label: 'Sun', value: 3560 }
  ];

  const maxVal = Math.max(...weeklyYields.map(w => w.value));

  return (
    <div className="details-view animate-fade-in">
      {/* 4 KPIs grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Average Daily Yield</span>
            <span className="kpi-value">{averageDailyYield.toLocaleString()} L</span>
            <div className="kpi-change positive">
              <TrendingUp size={14} />
              <span>Stable yield curve</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper milk">
            <Milk size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Total Cattle Herd</span>
            <span className="kpi-value">{totalCows} Cows</span>
            <div className="kpi-change positive" style={{ color: 'var(--text-secondary)' }}>
              <span>120 Milking • 34 Maternity</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper primary">
            <Beef size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Average Butterfat</span>
            <span className="kpi-value">{averageFat}%</span>
            <div className="kpi-change positive" style={{ color: 'var(--success)' }}>
              <span>High Quality Grade A</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper info">
            <Award size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Average Protein</span>
            <span className="kpi-value">{averageProtein}%</span>
            <div className="kpi-change positive" style={{ color: 'var(--info)' }}>
              <span>Excellent nutrient profile</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper primary">
            <Activity size={24} />
          </div>
        </div>
      </div>

      {/* Main Details Area */}
      <div className="dashboard-layout">
        
        {/* Weekly production trends */}
        <div className="content-card">
          <div className="card-title-bar">
            <h3>Weekly Milk Collection (Liters)</h3>
          </div>

          <div className="chart-container">
            <svg className="chart-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="details-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="var(--border-color)" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="var(--border-color)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="600" y2="160" stroke="var(--border-color)" strokeDasharray="4 4" />

              {/* Area path */}
              <path
                fill="url(#details-gradient)"
                opacity="0.15"
                d={`
                  M 0 200
                  ${weeklyYields.map((w, idx) => {
                    const x = (idx / (weeklyYields.length - 1)) * 600;
                    const y = 200 - (w.value / maxVal) * 150;
                    return `L ${x} ${y}`;
                  }).join(' ')}
                  L 600 200 Z
                `}
              />

              {/* Line path */}
              <path
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                d={weeklyYields.map((w, idx) => {
                  const x = (idx / (weeklyYields.length - 1)) * 600;
                  const y = 200 - (w.value / maxVal) * 150;
                  return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
              />

              {/* Points */}
              {weeklyYields.map((w, idx) => {
                const x = (idx / (weeklyYields.length - 1)) * 600;
                const y = 200 - (w.value / maxVal) * 150;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="var(--primary)"
                    stroke="var(--bg-secondary)"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>

          <div className="chart-labels-x">
            {weeklyYields.map((w, idx) => (
              <div key={idx}>{w.label} ({w.value}L)</div>
            ))}
          </div>
        </div>

        {/* Herd & Supply Distribution */}
        <div className="content-card">
          <h3>Herd Composition</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>Holstein-Friesian</span>
                <span>92 Cows (60%)</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar success" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>Jersey</span>
                <span>46 Cows (30%)</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar warning" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>Brown Swiss & Ayrshire</span>
                <span>16 Cows (10%)</span>
              </div>
              <div className="inv-progress-container" style={{ height: '8px' }}>
                <div className="inv-progress-bar danger" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Feed & Sustainability info card */}
      <div className="content-card" style={{ marginTop: '24px' }}>
        <h3>Nutritional and Feeding Integrity</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.6', marginTop: '8px' }}>
          Our pasture-centered management system enforces strict rotational grazing schedules across 12 fenced paddocks. This preserves turf quality and ensures the herd feeds on rich, mineral-dense grass clover. During winter months, their diet is supplemented with natural clover silage, alfalfa grass blocks, and crushed oat concentrates.
        </p>
      </div>
    </div>
  );
}
