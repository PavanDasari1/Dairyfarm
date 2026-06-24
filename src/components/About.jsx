import React from 'react';
import { Award, Sprout, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  const farmValues = [
    {
      icon: <Sprout size={24} />,
      title: 'Biodiverse Grasslands',
      desc: 'Rotational paddock schedules preserve natural soils, promoting healthy, nutrient-rich soil biology.'
    },
    {
      icon: <Heart size={24} />,
      title: 'No Added Chemicals',
      desc: 'Zero growth hormones, synthetic fertilizers, or prophylactic antibiotics are used in our operations.'
    },
    {
      icon: <Award size={24} />,
      title: 'Certified USDA Organic',
      desc: 'Our pastures, feed mills, and state-of-the-art milking bays carry full organic certifications.'
    }
  ];

  return (
    <div className="about-view animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Introduction Card */}
      <div className="content-card" style={{ padding: '40px' }}>
        <h2 style={{ color: 'var(--primary-hover)', fontSize: '26px', marginBottom: '16px' }}>Our History & Legacy</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
          Established in 1994, Geethika's Dairy Farm began as a small family farm with just ten Jersey cows. Over the past three decades, we have committed ourselves to chemical-free agriculture, expanding our acres and implementing solar-powered milking bays and eco-friendly compost production systems.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
          Today, we stand as one of the region’s premier suppliers of raw organic milk, delivering fresh pasture dairy products to local markets and families, while keeping animal welfare at the center of everything we do.
        </p>
      </div>

      {/* Value Grid */}
      <div>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '32px', color: 'var(--text-primary)' }}>
          Sustainable Farming Practices
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {farmValues.map((value, idx) => (
            <div className="content-card" key={idx} style={{ padding: '28px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '14px' }}>
                {value.icon}
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)' }}>{value.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animal Care Manifesto */}
      <div className="content-card" style={{ padding: '40px', background: 'var(--primary-light)', borderColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
        <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '16px', borderRadius: '50%', display: 'flex', flexShrink: 0 }}>
          <ShieldCheck size={32} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ color: 'var(--primary-hover)', fontSize: '20px' }}>The Happy Cattle Promise</h3>
          <p style={{ color: 'var(--text-primary)', fontSize: '14.5px', lineHeight: '1.6' }}>
            We believe that high-quality milk can only come from cattle raised in high-comfort environments. Our cows spend their days grazing in open sunlit grasslands, have access to comfortable sand bedding stalls, and are monitored individually with pedometer sensors that track resting, chewing, and general activity metrics.
          </p>
        </div>
      </div>

    </div>
  );
}
