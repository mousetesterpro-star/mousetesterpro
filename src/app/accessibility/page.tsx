import React from 'react';

export default function AccessibilityPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Accessibility Statement</h1>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
        <p className="text-base text-gray-300 mb-4">
          <span className="text-[#60A5FA] font-semibold">MouseTester Pro</span> is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We strive to meet or exceed the requirements of the <span className="text-[#60A5FA] font-semibold">Web Content Accessibility Guidelines (WCAG) 2.1</span>.
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-4">
          <li>We use semantic HTML and ARIA attributes to improve screen reader support.</li>
          <li>All interactive elements are keyboard accessible.</li>
          <li>We maintain high color contrast for readability.</li>
          <li>We regularly test our site for accessibility issues and welcome user feedback.</li>
        </ul>
        <p className="text-base text-gray-300 mb-2">
          If you experience any difficulty accessing content on this site, please contact us via our <a href="/contact" className="text-[#60A5FA] underline">Contact page</a> and we will do our best to assist you.
        </p>
        <p className="text-xs text-gray-500">Last updated: July 2024</p>
      </div>
    </section>
  );
} 