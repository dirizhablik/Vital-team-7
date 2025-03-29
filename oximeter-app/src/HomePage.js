import React from 'react';
import './HomePage.css';
import logo from './logo.png'; // Make sure this path is correct

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Restored Header */}
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="OxiMe" className="logo" />
          <nav className="nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="test" className="nav-link">Measurement</a>
            <a href="#resources" className="nav-link">Resources</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="hero-title">
              <span className="quote-mark">“</span>
              Empowering Health, One Test at a Time”
            </h1>
            <p className="hero-subtitle">
              Assess your hypoxemia risk with our 5-minute test.
              <span className="highlight">Accurate for all skin tones.</span>
            </p>

            <button className="cta-button">
            <a href="test" className="nav-link"> Start Free Assessment</a>
              {/* Start Free Assessment */}
              <span className="button-arrow">→</span>
            </button>
          </div>
          
          <div className="illustration-container">
            <img 
              src="https://www.fda.gov/files/Picture1_16.png" 
              alt="Health assessment illustration"
              className="hero-illustration"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-content">
          <h2 className="stats-heading">Why It Matters</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>3rd</h3>
              <p>Leading cause of death (respiratory diseases, 2017)</p>
            </div>
            <div className="stat-item">
              <h3>100M+</h3>
              <p>People affected by hypoxemia worldwide</p>
            </div>
            <div className="stat-item">
              <h3>40%</h3>
              <p>Improved accuracy for darker skin tones</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;