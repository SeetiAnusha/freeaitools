import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Mail, Database, Cookie, Eye, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — FreeAIHub',
  description: 'Learn how FreeAIHub collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'May 11, 2026';

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-950 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
            <p className="text-blue-100 text-lg">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-blue-200 text-sm mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-2">Introduction</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-0">
                    Welcome to FreeAIHub. We respect your privacy and are committed to protecting your personal data. 
                    This privacy policy explains how we collect, use, disclose, and safeguard your information when you 
                    visit our website.
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Information You Provide</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                    <li><strong>Email Address:</strong> When you subscribe to our newsletter or submit a tool</li>
                    <li><strong>Tool Submissions:</strong> Information you provide when submitting AI tools to our directory</li>
                    <li><strong>Ratings and Reviews:</strong> Your ratings and reviews of AI tools</li>
                    <li><strong>Contact Information:</strong> When you contact us through our contact form</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Automatically Collected Information</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                    <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, and navigation patterns</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                    <li><strong>IP Address:</strong> For analytics and security purposes (anonymized)</li>
                    <li><strong>Cookies:</strong> Small data files stored on your device (see Cookie Policy below)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Third-Party Information</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li><strong>Analytics:</strong> Google Analytics collects anonymous usage statistics</li>
                    <li><strong>Advertising:</strong> Google AdSense may collect data for personalized ads</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We use the collected information for the following purposes:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>✅ <strong>Provide Services:</strong> Deliver the AI tools directory and related features</li>
                    <li>✅ <strong>Newsletter:</strong> Send weekly updates about new free AI tools (you can unsubscribe anytime)</li>
                    <li>✅ <strong>Improve Website:</strong> Analyze usage patterns to enhance user experience</li>
                    <li>✅ <strong>Personalization:</strong> Remember your saved tools and preferences</li>
                    <li>✅ <strong>Security:</strong> Detect and prevent fraud, spam, and abuse</li>
                    <li>✅ <strong>Analytics:</strong> Understand how visitors use our website</li>
                    <li>✅ <strong>Advertising:</strong> Display relevant ads through Google AdSense</li>
                    <li>✅ <strong>Communication:</strong> Respond to your inquiries and support requests</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies Policy */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">Cookie Policy</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We use cookies and similar tracking technologies to improve your browsing experience.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Types of Cookies We Use:</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Essential Cookies (Required)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Necessary for the website to function. These include session management, security, and saved preferences.
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Analytics Cookies (Optional)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Help us understand how visitors interact with our website through Google Analytics. All data is anonymized.
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Advertising Cookies (Optional)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Used by Google AdSense to display relevant ads. You can opt out through your cookie preferences.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    You can control cookies through our cookie consent banner or your browser settings. Note that disabling 
                    cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use the following third-party services that may collect information:
              </p>
              
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Google Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tracks website usage and visitor behavior. 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      Google Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Google AdSense</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Displays advertisements on our website. 
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      How Google uses data
                    </a>
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Supabase</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hosts our database and stores user data securely. 
                    <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      Supabase Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>🔒 <strong>Encryption:</strong> All data transmitted is encrypted using SSL/TLS</li>
                <li>🔒 <strong>Secure Hosting:</strong> Data stored on secure servers with regular backups</li>
                <li>🔒 <strong>Access Control:</strong> Limited access to personal data by authorized personnel only</li>
                <li>🔒 <strong>Regular Audits:</strong> Periodic security assessments and updates</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Privacy Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>📋 <strong>Access:</strong> Request a copy of your personal data</li>
                <li>✏️ <strong>Correction:</strong> Request correction of inaccurate data</li>
                <li>🗑️ <strong>Deletion:</strong> Request deletion of your personal data</li>
                <li>⛔ <strong>Object:</strong> Object to processing of your data</li>
                <li>📤 <strong>Portability:</strong> Request transfer of your data</li>
                <li>🚫 <strong>Unsubscribe:</strong> Opt out of marketing emails anytime</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@freeaihub.io" className="text-blue-600 dark:text-blue-400 hover:underline">
                  privacy@freeaihub.io
                </a>
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe your child has provided 
                us with personal information, please contact us immediately.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the 
                new privacy policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review 
                this privacy policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">Contact Us</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                    <p className="text-gray-900 dark:text-white font-semibold mb-2">FreeAIHub</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                      <span className="block">Email: <a href="mailto:privacy@freeaihub.io" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@freeaihub.io</a></span>
                      <span className="block">Website: <a href="https://aifreetoolshub.com" className="text-blue-600 dark:text-blue-400 hover:underline">https://freeaihub.io</a></span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
