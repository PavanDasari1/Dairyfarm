import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        email: '',
        inquiry: 'General Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="contact-view animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
      
      {/* Form Area */}
      <div className="content-card" style={{ padding: '36px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '10px', color: 'var(--text-primary)' }}>Send Us a Message</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '24px' }}>
          Have questions about our milk subscription services, local wholesale orders, or farm tours? Complete the form below and our team will get back to you within 24 hours.
        </p>

        {submitted ? (
          <div className="auth-success-alert" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
            <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>Message Sent Successfully!</h4>
              <p style={{ fontSize: '13px', opacity: 0.9 }}>Thank you for reaching out. We will review your inquiry and contact you shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="contactName">Your Name *</label>
                <input 
                  type="text" 
                  id="contactName"
                  className="form-control"
                  placeholder="Farmer Joe"
                  required
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Email Address *</label>
                <input 
                  type="email" 
                  id="contactEmail"
                  className="form-control"
                  placeholder="joe@gmail.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactInquiry">Inquiry Type</label>
              <select 
                id="contactInquiry"
                className="form-control"
                value={form.inquiry}
                onChange={(e) => setForm({...form, inquiry: e.target.value})}
              >
                <option value="General Inquiry">General Inquiries</option>
                <option value="Milk Subscriptions">Milk Subscriptions / Home Delivery</option>
                <option value="Wholesale Partner">Wholesale / Grocery Supply</option>
                <option value="Educational Tour">School / Group Tours</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contactMessage">Message *</label>
              <textarea 
                id="contactMessage"
                className="form-control"
                rows="5"
                placeholder="Write your message here..."
                required
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 24px' }}>
              <Send size={16} /> Send Inquiry
            </button>
          </form>
        )}
      </div>

      {/* Info Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Contact Info Cards */}
        <div className="content-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Get In Touch</h3>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
              <MapPin size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Farm Location</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px', lineHeight: '1.4' }}>
                450 Grassland Meadow Route,<br />Middlebury, Vermont (VT) 05753
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
              <Phone size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Phone Number</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>
                +1 (802) 555-0142
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
              <Mail size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Email Address</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>
                contact@geethikasdairy.com
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
              <Clock size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Visiting Hours</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px', lineHeight: '1.4' }}>
                Milking tours: Daily 7:00 AM - 11:00 AM<br />
                General store open: 8:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Note on milk safety */}
        <div className="content-card" style={{ padding: '24px', background: 'var(--accent-milk-light)', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
          <h4 style={{ color: 'var(--accent-milk)', marginBottom: '6px' }}>🥛 Fresh Milk Dispensers</h4>
          <p style={{ color: 'var(--text-primary)', fontSize: '13px', lineHeight: '1.5' }}>
            We host a 24/7 solar-powered fresh milk dispenser at the farm gate! Bring your own glass bottle or purchase reusable jars at our farm shop for fresh, organic whole milk.
          </p>
        </div>

      </div>

    </div>
  );
}
