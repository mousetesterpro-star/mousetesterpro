"use client";
import React, { useState } from "react";
import { FooterAd } from './AdSense';

const privacyContent = (
  <div className="space-y-4 text-gray-200 text-sm max-h-[60vh] overflow-y-auto">
    <h2 className="text-xl font-bold mb-2 text-white">Privacy Policy</h2>
    <p>Your privacy is important to us. Mouse Tester Pro collects only the data necessary to provide and improve our services. We do not sell or share your personal information with third parties except as required by law.</p>
    <ul className="list-disc list-inside ml-4">
      <li>We collect test results, device/browser info, and feedback for analytics and improvement.</li>
      <li>Contact form submissions are stored securely and used only to respond to your inquiries.</li>
      <li>We use cookies/local storage for session management and personalization.</li>
      <li>Third-party analytics (e.g., Google Analytics) may be used to understand site usage.</li>
    </ul>
    <p>You may contact us via our <a href="/contact" className="text-[#60A5FA] underline">Contact page</a> for any privacy-related questions.</p>
    <p className="text-xs text-gray-500">Last updated: December 2024</p>
  </div>
);

const termsContent = (
  <div className="space-y-4 text-gray-200 text-sm max-h-[60vh] overflow-y-auto">
    <h2 className="text-xl font-bold mb-2 text-white">Terms of Service</h2>
    <p>By using Mouse Tester Pro, you agree to the following terms:</p>
    <ul className="list-disc list-inside ml-4">
      <li>This site is provided for informational and entertainment purposes only.</li>
      <li>We do not guarantee the accuracy or fitness of results for any particular purpose.</li>
      <li>You are responsible for your use of the site and any actions taken based on test results.</li>
      <li>Do not attempt to disrupt or misuse the service.</li>
      <li>We reserve the right to update these terms at any time.</li>
    </ul>
    <p>For questions, please use our <a href="/contact" className="text-[#60A5FA] underline">Contact page</a>.</p>
    <p className="text-xs text-gray-500">Last updated: December 2024</p>
  </div>
);


export default function Footer() {
  const [modal, setModal] = useState<null | "privacy" | "terms">(null);

  return (
    <>
      <FooterAd />
      <footer className="w-full bg-[#10131a] border-t border-[#23272e] py-8 px-4">
        {/* Footer Links Grid */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {/* Tools Column */}
            <div>
              <h3 className="font-semibold text-white mb-3">Tools</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Mouse Latency Test</a></li>
                <li><a href="/cps-test" className="text-gray-400 hover:text-[#60A5FA] transition-colors">CPS Test</a></li>
                <li><a href="/keyboard-test" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Keyboard Test</a></li>
                <li><a href="/monitor-test" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Monitor Test</a></li>
              </ul>
            </div>
            
            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-white mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/how-it-works" className="text-gray-400 hover:text-[#60A5FA] transition-colors">How It Works</a></li>
                <li><a href="/complete-guide" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Complete Guide</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-[#60A5FA] transition-colors">FAQ</a></li>
                <li><a href="/guides" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Guides & Tips</a></li>
              </ul>
            </div>
            
            {/* Community Column */}
            <div>
              <h3 className="font-semibold text-white mb-3">Community</h3>
              <ul className="space-y-2">
                <li><a href="/leaderboard" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Leaderboard</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Blog</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div>
              <h3 className="font-semibold text-white mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-[#60A5FA] transition-colors">About Us</a></li>
                <li><a href="/accessibility" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Accessibility</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-[#60A5FA] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-[#23272e] flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Mouse Tester Pro</span>
            <span className="text-gray-600">—</span>
            <span className="text-gray-500">Professional Mouse Performance Testing</span>
          </div>
          <div className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Mouse Tester Pro. All rights reserved.</div>
        </div>
        
        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-[#181c24] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg relative border border-[#23272e] max-h-[90vh] overflow-hidden">
              <button onClick={() => setModal(null)} className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-[#60A5FA] text-xl sm:text-2xl font-bold focus:outline-none z-10">×</button>
              {modal === "privacy" ? privacyContent : termsContent}
            </div>
          </div>
        )}
      </footer>

    </>
  );
}