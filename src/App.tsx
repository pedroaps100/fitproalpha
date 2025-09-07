import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState<'site' | 'dashboard'>('site');
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigation = (section: string) => {
    if (section === 'dashboard') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('site');
      setCurrentSection(section);
    }
  };

  if (currentView === 'dashboard') {
    return <Dashboard onNavigateToSite={() => setCurrentView('site')} />;
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header onNavigate={handleNavigation} currentSection={currentSection} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
