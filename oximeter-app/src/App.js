// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.js';
import OximeterForm from './components/OximeterForm'; // или путь к форме

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<OximeterForm />} />
      </Routes>
    </Router>
  );
};

export default App;