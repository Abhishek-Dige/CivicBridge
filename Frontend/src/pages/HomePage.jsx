import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Modules from '../components/Modules';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Impact from '../components/Impact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Modules />
        <Features />
        <HowItWorks />
        <Impact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
