import React from 'react';
import './HomePage.css';
import logo from './logo.png';


const HomePage = () => {
 return (
   <div className="homepage">
     <header className="header">
       <img src={logo} alt="OxiMe" className="logo" />
       <nav className="nav">
         <a href="#home">Home</a>
         <a href="#features">Features</a>
         <a href="#team">Resources</a>
       </nav>
     </header>


     <section className="hero">
       <h1 className="quote">"Empowering Health, One Test at a Time"</h1>
       <p className="subtitle">
         Take our quick 5-minute test to assess your risk for hypoxemia. Our results are designed to be accurate for people of all skin tones.
       </p>
       <button className="cta-button">Start the Test</button>
       {/* <div className="hero-image">
         <img src={logo} alt="OxiMe" className="hero-logo" />
       </div> */}
       <p className="long-description">
         In 2017, respiratory diseases were the 3rd leading cause of death. Hypoxemia, a condition where the body’s oxygen levels are dangerously low, affects many people with respiratory diseases. It demands a well-rounded diagnostic tool because it can lead to lifelong brain damage or death.
         Unfortunately, many countries lack accessible and accurate diagnostic resources. Our goal is to improve the accuracy of the pulse oximeter, an affordable device for measuring blood oxygen levels, especially for those with darker skin tones. Our model, trained on diverse health data, aims to address these accuracy issues and promote healthcare equity.
       </p>
     </section>


     <div className="illustration">
       <img src="/images/hero-illustration.png" alt="illustration" />
     </div>
   </div>
 );
};


export default HomePage;
