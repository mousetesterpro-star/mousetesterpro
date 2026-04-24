import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement | MouseTester Pro',
  description: 'MouseTester Pro is committed to digital accessibility. Learn about our WCAG 2.1 compliance efforts, assistive technology support, and how to report accessibility issues.',
};

export default function AccessibilityPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Accessibility Statement</h1>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 space-y-8 text-gray-300">

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Our Commitment</h2>
          <p className="text-base leading-relaxed">
            <span className="text-[#60A5FA] font-semibold">MouseTester Pro</span> is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We strive to meet or exceed the requirements of the <span className="text-[#60A5FA] font-semibold">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</span>. Accessibility is not an afterthought for us — it is a core part of how we design and build every feature on this site.
          </p>
          <p className="text-base leading-relaxed mt-3">
            We believe that everyone deserves equal access to tools that help them understand and optimize their hardware. Whether you use assistive technology, have a visual or motor impairment, or simply prefer keyboard navigation, our goal is to make MouseTester Pro work for you.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Accessibility Features</h2>
          <p className="text-base leading-relaxed mb-3">
            We have implemented the following accessibility features across our website:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li><strong className="text-white">Semantic HTML:</strong> We use proper heading hierarchy, landmark regions, and semantic elements (nav, main, article, section, footer) so screen readers can navigate the page structure efficiently.</li>
            <li><strong className="text-white">ARIA Attributes:</strong> Interactive elements include appropriate ARIA labels, roles, and states to convey their purpose and current status to assistive technologies.</li>
            <li><strong className="text-white">Keyboard Navigation:</strong> All interactive elements — buttons, links, form fields, and the test interface — are fully accessible via keyboard. You can tab through the interface, activate buttons with Enter or Space, and close modals with Escape.</li>
            <li><strong className="text-white">Color Contrast:</strong> We maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text throughout the site, meeting WCAG AA standards. Our dark theme was designed with contrast accessibility in mind from the beginning.</li>
            <li><strong className="text-white">Focus Indicators:</strong> Visible focus indicators are provided on all interactive elements so keyboard users can always see which element is currently active.</li>
            <li><strong className="text-white">Responsive Design:</strong> The site adapts to different screen sizes and supports text resizing up to 200% without loss of content or functionality.</li>
            <li><strong className="text-white">Alternative Text:</strong> All meaningful images include descriptive alt text. Decorative images are properly marked so screen readers skip them.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Assistive Technology Support</h2>
          <p className="text-base leading-relaxed">
            MouseTester Pro is designed to work with common assistive technologies including:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 mt-3">
            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
            <li>Browser-based accessibility extensions</li>
          </ul>
          <p className="text-base leading-relaxed mt-3">
            We test regularly with VoiceOver on macOS and periodically with NVDA on Windows to identify and resolve issues. Our testing interface is designed to announce results to screen readers as they are generated.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Known Limitations</h2>
          <p className="text-base leading-relaxed">
            While we work to ensure comprehensive accessibility, some aspects of MouseTester Pro present inherent challenges:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 mt-3">
            <li><strong className="text-white">Mouse Testing Interface:</strong> The core latency test requires physical mouse clicks by nature. We provide clear instructions and results that are fully accessible via screen reader, but the test interaction itself requires mouse input.</li>
            <li><strong className="text-white">Real-Time Data Visualizations:</strong> Some chart and graph elements may not be fully accessible to all assistive technologies. We provide text-based alternatives for all key data points alongside visual representations.</li>
          </ul>
          <p className="text-base leading-relaxed mt-3">
            We are actively working to improve these areas and welcome suggestions on how to make them more accessible.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Ongoing Efforts</h2>
          <p className="text-base leading-relaxed">
            Accessibility is an ongoing process. We regularly audit our site for compliance issues, incorporate accessibility into our development workflow, and train our team on best practices. When we add new features, accessibility is part of the design and review process — not a post-launch fix.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Feedback and Contact</h2>
          <p className="text-base leading-relaxed">
            If you experience any difficulty accessing content on this site, or if you have suggestions for how we can improve accessibility, please let us know. We take every report seriously and aim to respond within two business days.
          </p>
          <p className="text-base leading-relaxed mt-3">
            You can reach us through our <a href="/contact" className="text-[#60A5FA] underline hover:text-blue-400">Contact page</a>. When reporting an accessibility issue, please include:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 mt-3">
            <li>The page URL where you encountered the issue</li>
            <li>A description of the problem</li>
            <li>The assistive technology and browser you were using</li>
          </ul>
          <p className="text-base leading-relaxed mt-3">
            This information helps us reproduce and fix the issue as quickly as possible.
          </p>
        </div>

        <p className="text-xs text-gray-500">Last updated: April 2026</p>
      </div>
    </section>
  );
}