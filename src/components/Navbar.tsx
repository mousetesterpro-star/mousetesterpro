"use client";
import React, { useState } from "react";
import { useTestSession } from '@/context/TestSessionContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { startTest } = useTestSession();
  const handleTestAgain = (e: React.MouseEvent) => {
    e.preventDefault();
    startTest();
    
    // Add visual feedback
    const button = e.currentTarget as HTMLAnchorElement;
    const originalText = button.textContent;
    button.textContent = 'Starting...';
    button.style.opacity = '0.7';
    
    // Scroll to test area
    const el = document.getElementById('test-area');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Reset button after a short delay
    setTimeout(() => {
      button.textContent = originalText;
      button.style.opacity = '1';
    }, 1000);
    
    setMenuOpen(false);
  };
  return (
    <nav className="w-full bg-[#0D0D0D] border-b border-[#1A1A1A] px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-[#0D0D0D]/95">
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Mouse Tester Pro Logo" width={48} height={48} className="drop-shadow-[0_0_8px_#60A5FA55]" style={{objectFit: 'contain'}} />
          <span className="font-mono font-extrabold text-xl md:text-2xl text-white tracking-tight" style={{letterSpacing: '0.04em', lineHeight: 1}}>
            MouseTester <span style={{ color: '#A0A0A0', marginLeft: 6 }}>Pro</span>
          </span>
        </a>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/leaderboard" className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">Leaderboard</a>
        <a href="#test-area" onClick={handleTestAgain} className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">Test Again</a>
        <a href="/about" className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">About</a>
        <a href="/guides" className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">Guides/FAQ</a>
        <a href="/contact" className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">Contact</a>
        <a href="/blog" className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">Blog</a>
        <a href="/accessibility" className="text-sm text-gray-300 hover:text-[#60A5FA] transition-all ease-in-out duration-300 font-medium">Accessibility</a>
        
        {/* CTA Button */}
        <button 
          onClick={() => {
            startTest();
            const testArea = document.getElementById('test-area');
            if (testArea) testArea.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Test Now
        </button>
      </div>
      {/* Hamburger Icon */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
        aria-label="Open menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={`block w-6 h-0.5 bg-gray-200 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-200 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-200 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0D0D0D] bg-opacity-95 flex flex-col items-center justify-center gap-8 z-50 animate-fade-in">
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#60A5FA] text-2xl focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <a href="/leaderboard" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={() => setMenuOpen(false)}>Leaderboard</a>
          <a href="#test-area" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={e => { 
            e.preventDefault();
            startTest();
            
            // Add visual feedback for mobile
            const button = e.currentTarget as HTMLAnchorElement;
            const originalText = button.textContent;
            button.textContent = 'Starting...';
            button.style.opacity = '0.7';
            
            // Scroll to test area
            const el = document.getElementById('test-area');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Reset button after a short delay
            setTimeout(() => {
              button.textContent = originalText;
              button.style.opacity = '1';
            }, 1000);
            
            setMenuOpen(false);
          }}>Test Again</a>
          <a href="/about" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/guides" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={() => setMenuOpen(false)}>Guides/FAQ</a>
          <a href="/contact" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/blog" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="/accessibility" className="text-2xl font-heading text-gray-200 hover:text-[#60A5FA]" onClick={() => setMenuOpen(false)}>Accessibility</a>
          
          {/* Mobile CTA Button */}
          <button 
            onClick={() => {
              startTest();
              const testArea = document.getElementById('test-area');
              if (testArea) testArea.scrollIntoView({ behavior: 'smooth' });
              setMenuOpen(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Test Now
          </button>
        </div>
      )}
    </nav>
  );
}