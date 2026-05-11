import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DollarSign, Heart, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — FreeAIHub',
  description: 'Learn about FreeAIHub affiliate relationships, how we earn commissions, and our commitment to honest reviews.',
  robots: 'index, follow',
};

export default function AffiliateDisclosurePage() {
  const lastUpdated = 'May 11, 2026';

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-950 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <DollarSign className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black mb-4">Affiliate Disclosure</h1>
            <p className="text-amber-100 text-lg">
              Transparency is important to us. Here&apos;s how we make money and why it doesn&apos;t affect our recommendations.
            </p>
            <p className="text-amber-200 text-sm mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-900 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-3">Our Commitment to You</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-0 mb-0">
                      FreeAIHub participates in affiliate programs, which means we may earn a commission when you click 
                      on certain links and make a purchase. However, <strong>this never affects our reviews, rankings, 
                      or recommendations</strong>. We only recommend tools we genuinely believe are valuable, regardless 
                      of whether we earn a commission.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What Are Affiliate Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Are Affiliate Links?</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Affiliate links are special tracking URLs that allow us to earn a commission when you:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                <li>✅ Click on a link to a tool from our website</li>
                <li>✅ Sign up for that tool&apos;s service</li>
                <li>✅ Upgrade to a paid plan (if applicable)</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Important:</strong> Using our affiliate links costs 
                you nothing extra. The price you pay is exactly the same whether you use our link or go directly to 
                the tool&apos;s website. The commission comes from the tool provider, not from you.
              </p>
            </section>

            {/* How We Use Affiliate Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Affiliate Links</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We use affiliate links in the following places:
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tool Cards & Listings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The &quot;Try Free&quot; and &quot;Visit&quot; buttons on tool cards may contain affiliate links.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tool Detail Pages</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Links to tool websites from detailed review pages may be affiliate links.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Blog Posts & Articles</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Some links in our blog content may be affiliate links when relevant.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Comparison Pages</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tool comparison pages may include affiliate links to the compared tools.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Editorial Independence */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">Our Editorial Independence</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We maintain strict editorial independence. Here&apos;s what that means:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Honest Reviews:</strong> We review tools based on their actual features, usability, 
                      and value — not on commission rates.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>No Pay-to-Rank:</strong> Tools cannot pay to be featured or ranked higher. 
                      Rankings are based on user ratings, features, and our editorial assessment.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>We List Non-Affiliate Tools:</strong> Many tools in our directory don&apos;t have 
                      affiliate programs. We list them anyway because they&apos;re valuable to our users.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Critical When Needed:</strong> We point out limitations and drawbacks even for 
                      tools with affiliate programs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>User-First:</strong> Our primary goal is helping you find the best free AI tools, 
                      not maximizing commissions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Why We Use Affiliate Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why We Use Affiliate Links</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Running FreeAIHub requires significant time and resources:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                <li>• Manually testing and verifying 1,000+ AI tools</li>
                <li>• Daily monitoring for pricing changes and updates</li>
                <li>• Writing detailed reviews and comparisons</li>
                <li>• Maintaining website infrastructure and hosting</li>
                <li>• Providing customer support and responding to inquiries</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Affiliate commissions help us keep FreeAIHub completely free for users while covering these costs. 
                We don&apos;t charge subscription fees, we don&apos;t have paywalls, and we don&apos;t sell your data. 
                Affiliate commissions allow us to maintain this model.
              </p>
            </section>

            {/* Disclosure Requirements */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">FTC Compliance</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                In accordance with FTC guidelines, we disclose our affiliate relationships in multiple ways:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>📋 This dedicated Affiliate Disclosure page</li>
                <li>📋 A notice in our website footer on every page</li>
                <li>📋 Inline disclosures on pages with affiliate links</li>
                <li>📋 Clear labeling of affiliate links where appropriate</li>
              </ul>
            </section>

            {/* Specific Affiliate Programs */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Affiliate Programs We Participate In</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We participate in various affiliate programs, including but not limited to:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Individual AI tool affiliate programs (varies by tool)</li>
                <li>• Amazon Associates (for AI-related products)</li>
                <li>• Other relevant affiliate networks</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                The specific programs we participate in may change over time as we add new tools and partnerships.
              </p>
            </section>

            {/* Your Choice */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Choice</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Using our affiliate links is completely optional. You can:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>✅ Use our affiliate links to support FreeAIHub at no cost to you</li>
                <li>✅ Go directly to tool websites if you prefer</li>
                <li>✅ Use browser extensions that block affiliate tracking</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                Either way, you&apos;ll get the same great content and recommendations. If you do choose to use our 
                affiliate links, thank you for supporting our work!
              </p>
            </section>

            {/* Questions */}
            <section className="mb-12">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions About Our Affiliate Relationships?</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We&apos;re happy to answer any questions about our affiliate relationships, how we make money, 
                  or our editorial process.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl"
                >
                  Contact Us
                </a>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to This Disclosure</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may update this Affiliate Disclosure from time to time to reflect changes in our affiliate 
                relationships or practices. We will update the &quot;Last Updated&quot; date at the top of this page 
                when we make changes.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
