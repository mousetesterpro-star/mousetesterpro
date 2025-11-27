"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTestSession } from '@/context/TestSessionContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { startTest } = useTestSession();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);
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
    <nav className="w-full bg-[#0D0D0D] border-b border-[#1A1A1A] px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm bg-[#0D0D0D]/95">
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.webp" alt="Mouse Tester Pro Logo" width={48} height={48} className="drop-shadow-[0_0_8px_#60A5FA55]" style={{objectFit: 'contain'}} />
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
        className="md:hidden flex flex-col justify-center items-center w-12 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60A5FA] hover:bg-gray-800/50 transition-all duration-200 active:scale-95"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={`block w-6 h-0.5 bg-gray-200 mb-1.5 transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-200 mb-1.5 transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0 scale-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
      </button>
      {/* Mobile Menu */}
      {menuOpen && typeof window !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu Content */}
          <div className="fixed inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-6 z-[9999] animate-fade-in overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-gray-300 hover:text-[#60A5FA] text-3xl focus:outline-none focus:ring-2 focus:ring-[#60A5FA] rounded-full transition-all duration-200"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            
            {/* Menu Items */}
            <div className="flex flex-col items-center gap-6 pt-16 pb-8">
              <a 
                href="/leaderboard" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={() => setMenuOpen(false)}
              >
                Leaderboard
              </a>
              <a 
                href="#test-area" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={e => { 
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
                }}
              >
                Test Again
              </a>
              <a 
                href="/about" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/guides" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={() => setMenuOpen(false)}
              >
                Guides/FAQ
              </a>
              <a 
                href="/contact" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="/blog" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="/accessibility" 
                className="text-xl md:text-2xl font-heading text-gray-200 hover:text-[#60A5FA] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
                onClick={() => setMenuOpen(false)}
              >
                Accessibility
              </a>
              
              {/* Mobile CTA Button */}
              <button 
                onClick={() => {
                  startTest();
                  const testArea = document.getElementById('test-area');
                  if (testArea) testArea.scrollIntoView({ behavior: 'smooth' });
                  setMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4"
              >
                Start Test Now
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </nav>
  );
}