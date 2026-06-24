import React from 'react';
import { Sprout, Heart, ArrowRight, Milk, Sparkles } from 'lucide-react';

export default function Home({ setActiveTab }) {
  return (
    <div className="home-view animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>100% Organic Certified Dairy</span>
          </div>

          <h1>Freshness & Purity From Our Pastures To Your Table</h1>

          <p>
            At Geethika's Dairy Farm, we raise our cattle in open grasslands
            with sustainable farming practices, delivering rich, chemical-free
            milk and premium organic dairy products.
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => setActiveTab('details')}
            >
              Explore Operations <ArrowRight size={16} />
            </button>

            <button
              className="btn btn-outline"
              onClick={() => setActiveTab('contact')}
              style={{
                color: 'var(--text-on-dark)',
                borderColor: 'rgba(255,255,255,0.3)'
              }}
            >
              Inquire / Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ margin: '60px 0' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '28px',
            marginBottom: '40px',
            color: 'var(--text-primary)'
          }}
        >
          Geethika's Standard
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          <div
            className="content-card"
            style={{
              padding: '30px',
              textAlign: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Sprout size={28} />
            </div>

            <h3>100% Pasture Raised</h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14.5px',
                lineHeight: '1.6',
                marginTop: '10px'
              }}
            >
              Our herd roams freely on 500+ acres of pesticide-free lush
              fields, ensuring they enjoy a natural, healthy grass-fed
              lifestyle.
            </p>
          </div>

          <div
            className="content-card"
            style={{
              padding: '30px',
              textAlign: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-milk-light)',
                color: 'var(--accent-milk)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Milk size={28} />
            </div>

            <h3>Pure Organic Milk</h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14.5px',
                lineHeight: '1.6',
                marginTop: '10px'
              }}
            >
              We feed zero synthetic additives, hormones, or chemical feeds.
              The result is pure milk, rich in Omega-3 and natural cream taste.
            </p>
          </div>

          <div
            className="content-card"
            style={{
              padding: '30px',
              textAlign: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger-light)',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Heart size={28} />
            </div>

            <h3>Ethical Animal Care</h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14.5px',
                lineHeight: '1.6',
                marginTop: '10px'
              }}
            >
              Animal welfare is at the core of our operations. Happy cows
              produce sweet milk, which is why we monitor vet health and
              comfort daily.
            </p>
          </div>
        </div>
      </section>

      {/* Operations Quick Stats Highlights */}
      <section
        className="content-card"
        style={{
          padding: '40px',
          background: 'var(--bg-topbar)',
          color: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          textAlign: 'center'
        }}
      >
        <div>
          <h4
            style={{
              fontSize: '36px',
              color: 'var(--primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: '800'
            }}
          >
            500+
          </h4>
          <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '4px' }}>
            Acres of Fresh Grasslands
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: '36px',
              color: 'var(--primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: '800'
            }}
          >
            150+
          </h4>
          <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '4px' }}>
            Jersey & Holstein Cows
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: '36px',
              color: 'var(--primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: '800'
            }}
          >
            3,500 L
          </h4>
          <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '4px' }}>
            Daily Raw Milk Yield
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: '36px',
              color: 'var(--primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: '800'
            }}
          >
            100%
          </h4>
          <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '4px' }}>
            Eco-Friendly Operations
          </p>
        </div>
      </section>
    </div>
  );
}