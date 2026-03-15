import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Modules from './components/Modules';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Modules />
        <Features />
        <HowItWorks />
        <Impact />
      </main>
      <Footer />
    </div>
  );
}

export default App;