import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, AlertCircle, Scale, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — FreeAIHub',
  description: 'Terms and conditions for using FreeAIHub. Read our terms of service, user responsibilities, and legal agreements.',
  robots: 'index, follow',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'May 11, 2026';

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-950 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
            <p className="text-purple-100 text-lg">
              Please read these terms carefully before using FreeAIHub
            </p>
            <p className="text-purple-200 text-sm mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Agreement */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-2">Agreement to Terms</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-0">
                    By accessing or using FreeAIHub (&quot;the Website&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these 
                    Terms of Service. If you disagree with any part of these terms, you may not access the Website.
                  </p>
                </div>
              </div>
            </section>

            {/* Use of Service */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use of Service</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Permitted Use</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                FreeAIHub provides a directory of free AI tools. You may use the Website for:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li>✅ Browsing and discovering free AI tools</li>
                <li>✅ Reading reviews and ratings</li>
                <li>✅ Submitting AI tools for review</li>
                <li>✅ Subscribing to our newsletter</li>
                <li>✅ Saving and organizing your favorite tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Prohibited Use</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree NOT to:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>❌ Use the Website for any illegal purpose</li>
                <li>❌ Scrape, copy, or reproduce content without permission</li>
                <li>❌ Submit false, misleading, or spam content</li>
                <li>❌ Attempt to hack, disrupt, or damage the Website</li>
                <li>❌ Impersonate others or provide false information</li>
                <li>❌ Use automated bots or scripts without authorization</li>
                <li>❌ Violate any applicable laws or regulations</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you create an account or subscribe to our newsletter:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• You must provide accurate and complete information</li>
                <li>• You are responsible for maintaining account security</li>
                <li>• You must be at least 13 years old to use our services</li>
                <li>• You are responsible for all activities under your account</li>
                <li>• You must notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            {/* Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Content</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All content on FreeAIHub, including text, graphics, logos, images, and software, is owned by FreeAIHub 
                or its content suppliers and is protected by copyright and intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">User-Generated Content</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you submit content (reviews, ratings, tool submissions):
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• You retain ownership of your content</li>
                <li>• You grant us a license to use, display, and distribute your content</li>
                <li>• You confirm you have the right to submit the content</li>
                <li>• You agree your content does not violate any laws or third-party rights</li>
                <li>• We reserve the right to remove any content at our discretion</li>
              </ul>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Links and Services</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                FreeAIHub contains links to third-party websites and AI tools. We are not responsible for:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• The content or privacy practices of third-party websites</li>
                <li>• The accuracy of information about third-party tools</li>
                <li>• Any transactions between you and third-party services</li>
                <li>• Changes to third-party pricing or features</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                We verify that tools have free tiers, but we cannot guarantee the availability or quality of third-party services.
              </p>
            </section>

            {/* Affiliate Disclosure */}
            <section className="mb-12">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-900">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Affiliate Disclosure</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      FreeAIHub participates in affiliate programs. When you click on certain links and make a purchase, 
                      we may earn a commission at no extra cost to you. This helps us keep the website free and maintain 
                      our directory. Our reviews and recommendations are always honest and unbiased, regardless of affiliate 
                      relationships. Learn more in our{' '}
                      <a href="/affiliate-disclosure" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                        Affiliate Disclosure
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">Disclaimer of Warranties</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    THE WEBSITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• We do not guarantee the Website will be uninterrupted or error-free</li>
                    <li>• We do not warrant the accuracy or completeness of information</li>
                    <li>• We do not guarantee that third-party tools will remain free</li>
                    <li>• We are not responsible for changes to third-party services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FREEAIHUB SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Any indirect, incidental, special, or consequential damages</li>
                <li>• Loss of profits, data, or business opportunities</li>
                <li>• Damages arising from your use of the Website or third-party tools</li>
                <li>• Any errors or omissions in the content</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Indemnification</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You agree to indemnify and hold harmless FreeAIHub, its affiliates, and their respective officers, 
                directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including 
                legal fees) arising from your use of the Website or violation of these Terms.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Suspend or terminate your access to the Website at any time</li>
                <li>• Remove any content that violates these Terms</li>
                <li>• Modify or discontinue the Website without notice</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                You may stop using the Website at any time. Upon termination, your right to use the Website will immediately cease.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by 
                posting the new Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of the 
                Website after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to 
                conflict of law provisions. Any disputes arising from these Terms or your use of the Website shall be 
                resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">FreeAIHub</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                  <span className="block">Email: <a href="mailto:legal@freeaihub.io" className="text-blue-600 dark:text-blue-400 hover:underline">legal@freeaihub.io</a></span>
                  <span className="block">Website: <a href="https://freeaihub.io" className="text-blue-600 dark:text-blue-400 hover:underline">https://freeaihub.io</a></span>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
