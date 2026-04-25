import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: "Privacy Policy | MouseTester Pro",
  description: "Privacy Policy for MouseTester Pro. Learn how we collect, use, and protect your data."
};

export default function PrivacyPage() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Privacy Policy</h1>
      
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 space-y-6 text-gray-300">
        <div>
          <p className="text-sm text-gray-400 mb-4">Last updated: April 2026</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
          <p>
            Your privacy is important to us. Mouse Tester Pro ("we," "our," or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-white mb-2 mt-4">Information You Provide</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Contact Information:</strong> When you use our contact form, we collect your name and email address.</li>
            <li><strong>Messages:</strong> Any messages or feedback you submit through our contact form.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-2 mt-4">Automatically Collected Information</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Test Results:</strong> Mouse latency, polling rate, and jitter measurements from your testing sessions.</li>
            <li><strong>Device Information:</strong> Browser type, operating system, screen resolution, and other technical details.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and interaction patterns.</li>
            <li><strong>Anonymous ID:</strong> A randomly generated identifier stored in your browser's local storage to track your test history.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide and improve our mouse testing services</li>
            <li>Store your test history and statistics</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Ensure website security and prevent abuse</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
          <p>
            Test results and related data are stored securely using Supabase, a cloud database service. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="mt-2">
            Your anonymous ID is stored locally in your browser and is not shared with third parties. Test results are associated with this anonymous ID to provide personalized statistics and history.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics:</strong> To understand how visitors use our website. This service may collect anonymized usage data.</li>
            <li><strong>Google AdSense:</strong> To display advertisements. AdSense may use cookies and similar technologies to show relevant ads.</li>
            <li><strong>Supabase:</strong> For secure data storage and database services.</li>
          </ul>
          <p className="mt-2">
            These services have their own privacy policies. We encourage you to review them.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Local Storage</h2>
          <p>
            We use cookies and local storage to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Store your anonymous user ID for test history</li>
            <li>Remember your preferences</li>
            <li>Analyze website traffic and usage patterns</li>
          </ul>
          <p className="mt-2">
            You can control cookies through your browser settings. Note that disabling cookies may affect some website functionality.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>When required by law or legal process</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who assist in operating our website (under strict confidentiality agreements)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access your test data and history</li>
            <li>Request deletion of your data</li>
            <li>Opt out of data collection (by clearing your browser's local storage)</li>
            <li>Contact us with privacy-related questions</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our <a href="/contact" className="text-[#60A5FA] hover:text-blue-400 underline">Contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

