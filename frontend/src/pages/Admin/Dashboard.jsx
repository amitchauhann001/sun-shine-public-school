const Dashboard = () => {
  return (
    <div>
      <h1 className="section-title" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid var(--primary-color)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Active Announcements</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>Manage</p>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid var(--secondary-color)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Recent Achievements</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>Manage</p>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid var(--success)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Carousel Items</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>Manage</p>
        </div>

      </div>

      <div style={{ marginTop: '3rem', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2>Quick Actions</h2>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
          Select an option from the sidebar to manage content on the main school website. Your changes will reflect immediately.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
