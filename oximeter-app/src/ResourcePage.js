import React from 'react';
import './HomePage.css';
import logo from './logo.png'; 

const ResourcePage = () => {
  return (
    <div className="resource_page">
      <header className="header">
        <img src={logo} alt="OxiMe" className="logo" />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="#test">Test</a>
          <a href="#resource">Resource</a> {/* Updated link to scroll to #resource */}
        </nav>
      </header>

      <section className="hero">
        <p className="subtitle">
          .... 
        </p>
      </section>
      
      {/* Add id="resource" to make this the target of the anchor link */}
      <section id="resource" className="resource-section">
        <h2>Resource Section</h2>
        <p>Details about resources...</p>
      </section>
    </div>
  );
};

export default ResourcePage;
