import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Users, Heart, Zap, Shield, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — FreeAIHub',
  description: 'Learn about FreeAIHub, our mission to democratize AI access, and how we help millions discover free AI tools.',
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-950 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-6">About FreeAIHub</h1>
            <p className="text-indigo-100 text-xl leading-relaxed max-w-3xl mx-auto">
              We&apos;re on a mission to democratize access to AI by helping everyone discover the best free AI tools — 
              no credit card required, no hidden paywalls, just genuine free tools.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              FreeAIHub was born from a simple frustration: finding truly free AI tools was nearly impossible. 
              Most directories listed tools with &quot;free trials&quot; that required credit cards, or &quot;freemium&quot; plans 
              that were so limited they were unusable.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We believed AI should be accessible to everyone — students learning new skills, freelancers building 
              their businesses, developers experimenting with new technologies, and anyone curious about AI&apos;s potential.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              So we built FreeAIHub: the only AI directory that manually verifies every tool has a genuine, 
              usable free tier. No misleading listings. No hidden costs. Just honest, verified free AI tools.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-12">
              Our Mission & Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 mb-6">
                  <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Democratize AI Access</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  We believe powerful AI tools shouldn&apos;t be locked behind expensive subscriptions. Everyone deserves 
                  access to AI technology, regardless of their budget.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/30 mb-6">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Verified & Honest</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Every tool is manually tested by our team. We don&apos;t list tools just because they pay us — 
                  we list them because they&apos;re genuinely free and useful.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/30 mb-6">
                  <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community First</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  We listen to our community. User reviews, ratings, and feedback shape our directory. 
                  Your voice matters in helping others discover great tools.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">What Makes Us Different</h2>
          <div className="space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Manual Verification</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Unlike other directories that scrape data or accept paid listings without verification, we manually 
                  test every single tool. We sign up, use the free tier, and confirm it&apos;s genuinely usable before listing it.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Daily Updates</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  AI tools change their pricing frequently. We monitor our entire directory daily and update or remove 
                  tools within 24 hours when their free tier changes or disappears.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Transparent Monetization</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We earn through affiliate commissions when you upgrade to paid plans — but we clearly disclose this. 
                  Our reviews are honest regardless of affiliate relationships. We recommend tools because they&apos;re good, 
                  not because they pay us.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Stats - Updated to remove fake numbers for AdSense compliance */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12">FreeAIHub by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              
              <div className="text-center">
                <div className="text-5xl font-black mb-2">40+</div>
                <div className="text-blue-100 text-sm font-medium">Categories</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-black mb-2">100%</div>
                <div className="text-blue-100 text-sm font-medium">Verified Free</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-black mb-2">Daily</div>
                <div className="text-blue-100 text-sm font-medium">Updates</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-black mb-2">Manual</div>
                <div className="text-blue-100 text-sm font-medium">Verification</div>
              </div>

            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-6">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed mb-12 max-w-2xl mx-auto">
            We&apos;re a small, passionate team of AI enthusiasts, developers, and content creators dedicated to 
            making AI accessible to everyone.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900 p-8 text-center">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Want to join us?</strong> We&apos;re always looking for 
              contributors, tool reviewers, and AI enthusiasts to help grow our community. 
              <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                Get in touch
              </a>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Get weekly updates on the newest free AI tools, exclusive tips, and early access to new features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#newsletter" className="btn-primary px-8 py-4 text-base rounded-xl">
                Subscribe to Newsletter
              </a>
              <a href="/contact" className="btn-secondary px-8 py-4 text-base rounded-xl">
                Contact Us
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
