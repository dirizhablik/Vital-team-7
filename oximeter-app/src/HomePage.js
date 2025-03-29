import React from 'react';
import './HomePage.css';
import logo from './logo.png'; 

const HomePage = () => {
 return (
   <div className="homepage">
     <header className="header">
       <img src={logo} alt="OxiMe" className="logo" />
       <nav className="nav">
         <a href="#test">Home</a>
         <a href="#features">Test</a>
         <a href="#team">Resource</a>
       </nav>
     </header>


     <section className="hero">
       <h1 className="quote">"SLOGAN"</h1>
       <img src={logo} alt="OxiMe" className="logo" />
       <p className="subtitle">
        YAP
       </p>
       <button className="cta-button">Start the Test</button>
       <p className="subtitle">
        In 2017, respiratory diseases were the 3rd leading cause of death. Hypoxemia, the condition where the body’s oxygen becomes very low, affects many people with respiratory diseases. Hypoxemia demands a well-rounded diagnostic tool because it’s often deadly and can lead to lifelong brain damage. However, many countries and regions don’t have accessible and accurate diagnostic resources, which we hope to address by improving the accuracy of the pulse oximeter, an inexpensive at-home device for measuring the blood oxygen level of patients. One key issue in the design of the pulse oximeter is that its accuracy decreases on people with darker skin tones. We created a model trained on health data, accounting for skin tone diversity. We hope our model will address accuracy issues in existing pulse oximeters and will promote equity in accessible healthcare.
       </p>
     </section>


     <div className="illustration">
       <img src="/images/hero-illustration.png" alt="illustration" />
     </div>
   </div>
 );
};


export default HomePage;