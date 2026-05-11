import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Send, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — FreeAIHub',
  description: 'Get in touch with FreeAIHub. Contact us for support, partnerships, tool submissions, or general inquiries.',
  robots: 'index, follow',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-950 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black mb-4">Contact Us</h1>
            <p className="text-green-100 text-lg">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                </div>

                <form className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="tool-submission">Submit a Tool</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="bug-report">Report a Bug</option>
                      <option value="feedback">Feedback</option>
                      <option value="advertising">Advertising Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-base font-semibold rounded-xl
                               flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              
              {/* Email */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      For general inquiries and support
                    </p>
                    <a 
                      href="mailto:hello@freeaihub.io" 
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                    >
                      hello@freeaihub.io
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Response Time</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We aim to respond to all inquiries within 24-48 hours during business days (Monday-Friday).
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Location</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We operate globally and serve users worldwide. Our team is distributed across multiple time zones.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                              rounded-2xl border border-blue-100 dark:border-blue-900 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/submit-tool" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                      → Submit a Tool
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                      → Read Our Blog
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                      → Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                      → Terms of Service
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">How do I submit a tool?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visit our <a href="/submit-tool" className="text-blue-600 dark:text-blue-400 hover:underline">Submit Tool</a> page 
                  and fill out the form. We review all submissions within 3-5 business days.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">How do you verify tools are free?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our team manually tests each tool to confirm it has a genuine free tier. We update listings when pricing changes.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Can I advertise on FreeAIHub?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! We offer various advertising and partnership opportunities. Contact us at{' '}
                  <a href="mailto:partnerships@freeaihub.io" className="text-blue-600 dark:text-blue-400 hover:underline">
                    partnerships@freeaihub.io
                  </a>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">How can I report incorrect information?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use the contact form above with subject &quot;Bug Report&quot; or email us directly. We appreciate your help keeping our directory accurate!
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
