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
    <p className="text-xs text-gray-500">Last updated: July 2024</p>
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
    <p className="text-xs text-gray-500">Last updated: July 2024</p>
  </div>
);

const SupportContent = () => {
  return (
    <div className="space-y-4 text-gray-200 text-sm max-h-[80vh] sm:max-h-[60vh] overflow-y-auto px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white text-center sm:text-left">Support Us</h2>
      <p className="text-center sm:text-left">If you find this tool helpful, consider supporting us:</p>
      
      {/* Buy Me Coffee Section */}
      <div className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 mb-4">
        <div className="text-2xl sm:text-3xl">☕</div>
        <div className="text-center sm:text-left">
          <div className="font-semibold text-gray-800 text-sm sm:text-base">Buy Me Coffee</div>
          <a 
            href="https://www.buymeacoffee.com/bobthetechbuilder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs sm:text-sm"
          >
            Click here to support
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Footer() {
  const [modal, setModal] = useState<null | "privacy" | "terms" | "support">(null);

  return (
    <>
      <FooterAd />
      <footer className="w-full bg-[#10131a] border-t border-[#23272e] py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Mouse Tester Pro</span>
          <span className="hidden md:inline">|</span>
          <button className="hover:text-[#60A5FA] underline ml-2" onClick={() => setModal("privacy")}>Privacy Policy</button>
          <span className="hidden md:inline">|</span>
          <button className="hover:text-[#60A5FA] underline ml-2" onClick={() => setModal("terms")}>Terms of Service</button>
        </div>
        <div className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Mouse Tester Pro. All rights reserved.</div>
        
        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-[#181c24] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg relative border border-[#23272e] max-h-[90vh] overflow-hidden">
              <button onClick={() => setModal(null)} className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-[#60A5FA] text-xl sm:text-2xl font-bold focus:outline-none z-10">×</button>
              {modal === "privacy" ? privacyContent : modal === "terms" ? termsContent : <SupportContent />}
            </div>
          </div>
        )}
      </footer>

      {/* Simple floating support button */}
      <button
        onClick={() => setModal("support")}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        title="Support Us"
      >
        <div className="text-red-500 text-xl group-hover:scale-110 transition-transform duration-300">
          ☕
        </div>
      </button>
    </>
  );
}