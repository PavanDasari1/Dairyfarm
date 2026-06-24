import React from 'react';
import { 
  Milk, 
  Beef, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  CalendarDays, 
  Activity,
  PlusCircle
} from 'lucide-react';

export default function Dashboard({ cows, milkLogs, feedInventory, transactions, setActiveTab, setOpenModal }) {
  // 1. Calculate Herd Count
  const totalCows = cows.length;
  const milkingCows = cows.filter(c => c.status === 'Milking').length;
  const sickCows = cows.filter(c => c.status === 'Sick').length;

  // 2. Calculate Today's Milk Yield
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMilkLogs = milkLogs.filter(log => log.date === todayStr);
  const todayYield = todayMilkLogs.reduce((sum, log) => sum + Number(log.liters), 0);

  // Compare with yesterday's yield
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  const yesterdayMilkLogs = milkLogs.filter(log => log.date === yesterdayStr);
  const yesterdayYield = yesterdayMilkLogs.reduce((sum, log) => sum + Number(log.liters), 0);

  const milkDiffPercent = yesterdayYield > 0 
    ? (((todayYield - yesterdayYield) / yesterdayYield) * 100).toFixed(1) 
    : 0;

  // 3. Count Low Feed Alerts (Ignore if stock is 0 but capacity is also 0)
  const lowFeedAlerts = feedInventory.filter(feed => feed.capacity > 0 && (feed.current / feed.capacity) < 0.25).length;

  // 4. Calculate Net Revenue
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const netIncome = totalIncome - totalExpense;

  // Last 7 days milk production for SVG Chart
  const getLast7DaysMilkData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLogs = milkLogs.filter(log => log.date === dateStr);
      const yieldSum = dayLogs.reduce((sum, log) => sum + Number(log.liters), 0);
      
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      data.push({ label: weekday, value: yieldSum });
    }
    return data;
  };

  const chartData = getLast7DaysMilkData();
  const allZero = chartData.every(d => d.value === 0);
  const maxChartValue = allZero ? 100 : Math.max(...chartData.map(d => d.value), 10);

  return (
    <div className="dashboard-view animate-fade-in">
      
      {/* Welcome banner if no cows exist */}
      {totalCows === 0 && (
        <div style={{ 
          background: 'linear-gradient(135deg, var(--bg-topbar), #10b981)', 
          color: 'white', 
          padding: '32px', 
          borderRadius: 'var(--radius-lg)', 
          marginBottom: '32px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Welcome to Geethika Farm Management! 🚜</h2>
          <p style={{ opacity: 0.9, fontSize: '15px', maxWidth: '600px', marginBottom: '20px', lineHeight: '1.6' }}>
            Get started by setting up your dairy herd. Once registered, you will be able to log daily milk yields, track health checkups, deduct feed inventory levels, and balance operating cash flow sheets in real time.
          </p>
          <button className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--bg-topbar)' }} onClick={() => { setActiveTab('herd'); setOpenModal('cow'); }}>
            <Plus size={16} /> Register Your First Cow
          </button>
        </div>
      )}

      {/* 4 KPIs grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Today's Milk Yield</span>
            <span className="kpi-value">{todayYield.toLocaleString()} L</span>
            <div className={`kpi-change ${Number(milkDiffPercent) >= 0 ? 'positive' : 'negative'}`}>
              {Number(milkDiffPercent) >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(milkDiffPercent)}% vs yesterday</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper milk">
            <Milk size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Total Active Herd</span>
            <span className="kpi-value">{totalCows} Cows</span>
            <div className="kpi-change positive" style={{ color: 'var(--text-secondary)' }}>
              <span>{milkingCows} milking • {sickCows} sick</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper primary">
            <Beef size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Low Stock Alerts</span>
            <span className="kpi-value">{lowFeedAlerts} Alerts</span>
            <div className="kpi-change" style={{ color: lowFeedAlerts > 0 ? 'var(--danger)' : 'var(--success)' }}>
              <span>{lowFeedAlerts > 0 ? 'Urgent replenishment' : 'All stocks sufficient'}</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper danger">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Net Income Ledger</span>
            <span className="kpi-value" style={{ color: netIncome >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              {netIncome < 0 && '-'}${Math.abs(netIncome).toLocaleString()}
            </span>
            <div className="kpi-change positive">
              <TrendingUp size={14} />
              <span>Margin: {totalIncome > 0 ? ((netIncome / totalIncome) * 100).toFixed(0) : 0}%</span>
            </div>
          </div>
          <div className="kpi-icon-wrapper info">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Charts & Split View */}
      <div className="dashboard-layout">
        
        {/* Production Trend SVG Chart */}
        <div className="content-card">
          <div className="card-title-bar">
            <h3>Milk Production Trends (7 Days)</h3>
            <button className="btn btn-outline" style={{ padding: '6px 12px', borderRadius: '8px' }} onClick={() => setActiveTab('milk')}>
              View Logs
            </button>
          </div>
          
          {allZero ? (
            <div className="empty-state-container" style={{ height: '240px' }}>
              <div className="empty-state-icon">📈</div>
              <h4>No production logs recorded</h4>
              <p style={{ fontSize: '13px' }}>Yield curves will automatically generate here once logs are registered.</p>
            </div>
          ) : (
            <>
              <div className="chart-container">
                <svg className="chart-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="600" y2="40" className="chart-grid-line" />
                  <line x1="0" y1="100" x2="600" y2="100" className="chart-grid-line" />
                  <line x1="0" y1="160" x2="600" y2="160" className="chart-grid-line" />

                  {/* Chart Line and Area */}
                  {chartData.length > 0 && (
                    <>
                      <path
                        className="chart-area"
                        d={`
                          M 0 200
                          ${chartData.map((d, index) => {
                            const x = (index / (chartData.length - 1)) * 600;
                            const y = 200 - (d.value / maxChartValue) * 160;
                            return `L ${x} ${y}`;
                          }).join(' ')}
                          L 600 200 Z
                        `}
                      />
                      <path
                        className="chart-line"
                        d={chartData.map((d, index) => {
                          const x = (index / (chartData.length - 1)) * 600;
                          const y = 200 - (d.value / maxChartValue) * 160;
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                      />
                      {/* Points */}
                      {chartData.map((d, index) => {
                        const x = (index / (chartData.length - 1)) * 600;
                        const y = 200 - (d.value / maxChartValue) * 160;
                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="5"
                            className="chart-point"
                          />
                        );
                      })}
                    </>
                  )}
                </svg>
              </div>
              
              <div className="chart-labels-x">
                {chartData.map((d, index) => (
                  <div key={index}>{d.label} ({d.value}L)</div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Panel & Feed Notifications */}
        <div className="content-card">
          <div className="card-title-bar">
            <h3>Maternity Notifications</h3>
            <button className="btn btn-outline" style={{ padding: '6px 12px', borderRadius: '8px' }} onClick={() => setActiveTab('health')}>
              <CalendarDays size={16} />
            </button>
          </div>

          <div className="activity-list">
            {cows.filter(c => c.status === 'Pregnant').length > 0 ? (
              cows.filter(c => c.status === 'Pregnant').slice(0, 4).map((cow, index) => (
                <div className="activity-item" key={cow.id}>
                  <div className="activity-badge calve">
                    <Beef size={18} />
                  </div>
                  <div className="activity-details">
                    <span className="activity-text">Pregnancy active: Cow {cow.id}</span>
                    <span className="activity-desc">Gestation monitoring required. Breed: {cow.breed}</span>
                    <span className="activity-time">Registered status</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state-container" style={{ padding: '20px 0' }}>
                <span style={{ fontSize: '32px' }}>💤</span>
                <p style={{ fontSize: '13px', marginTop: '8px' }}>No active pregnancies monitored.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Quick Action Center */}
      <div className="content-card">
        <h3>Quick Action Center</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button className="btn btn-primary" onClick={() => { setActiveTab('herd'); setOpenModal('cow'); }}>
            <Plus size={18} /> Register New Cow
          </button>
          <button className="btn btn-primary" onClick={() => { setActiveTab('milk'); setOpenModal('milk'); }}>
            <Plus size={18} /> Log Milk yield
          </button>
          <button className="btn btn-outline" onClick={() => { setActiveTab('feed'); setOpenModal('feedUpdate'); }}>
            <Plus size={18} /> Update Feed Stock
          </button>
          <button className="btn btn-outline" onClick={() => { setActiveTab('finance'); setOpenModal('transaction'); }}>
            <Plus size={18} /> Add Cash Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
