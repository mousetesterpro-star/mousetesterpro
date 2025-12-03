import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | MouseTester Pro",
  description: "Terms of Service for MouseTester Pro. Read our terms and conditions for using our mouse latency testing service.",
  robots: 'noindex, follow'
};

export default function TermsPage() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Terms of Service</h1>
      
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 space-y-6 text-gray-300">
        <div>
          <p className="text-sm text-gray-400 mb-4">Last updated: December 2024</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
          <p>
            By accessing or using Mouse Tester Pro ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Use of Service</h2>
          <h3 className="text-xl font-semibold text-white mb-2 mt-4">Permitted Use</h3>
          <p>You may use our Service for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Testing mouse latency, polling rate, and jitter</li>
            <li>Personal or commercial use (subject to these Terms)</li>
            <li>Educational and research purposes</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-2 mt-4">Prohibited Use</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Attempt to disrupt, damage, or interfere with the Service</li>
            <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Transmit viruses, malware, or any harmful code</li>
            <li>Impersonate others or provide false information</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
          <p>
            We strive to provide a reliable service, but we do not guarantee that the Service will be available at all times. The Service may be unavailable due to maintenance, updates, technical issues, or circumstances beyond our control. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Accuracy of Results</h2>
          <p>
            Our mouse latency testing tool provides measurements based on browser performance APIs. While we strive for accuracy, results may vary based on:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your hardware configuration</li>
            <li>System load and background processes</li>
            <li>Browser and operating system differences</li>
            <li>Network conditions (for wireless mice)</li>
          </ul>
          <p className="mt-2">
            <strong>We do not guarantee the accuracy or fitness of results for any particular purpose.</strong> Test results are provided for informational purposes only and should not be the sole basis for purchasing decisions or competitive gaming strategies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
          <p>
            The Service, including its original content, features, and functionality, is owned by Mouse Tester Pro and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className="mt-2">
            You may not copy, modify, distribute, sell, or lease any part of our Service without our written permission.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">User Content</h2>
          <p>
            When you submit test results, feedback, or other content through our Service, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and display that content for the purpose of providing and improving our Service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p className="mt-2">
            We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be corrected.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MOUSE TESTER PRO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Mouse Tester Pro, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the Service or violation of these Terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through our <a href="/contact" className="text-[#60A5FA] hover:text-blue-400 underline">Contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

