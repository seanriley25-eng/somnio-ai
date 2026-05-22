import type { Metadata } from 'next';
import { Mail, MessageSquare, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact — Somnio',
  description: 'Get in touch with the Somnio team for support, feedback, privacy requests, or general enquiries.',
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <MessageSquare className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg">
            We&apos;d love to hear from you — feedback, bug reports, privacy requests, or just
            to say hello.
          </p>
        </div>

        <div className="space-y-6">
          {/* Primary email */}
          <div className="glass rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <h2 className="text-xl font-semibold text-white">Email Us</h2>
            </div>
            <p className="text-gray-300 mb-4">
              The fastest way to reach us is by email. We aim to respond within 2 business days.
            </p>
            <a
              href="mailto:sean@riley-solutions.com"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>sean@riley-solutions.com</span>
            </a>
          </div>

          {/* What to include */}
          <div className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">What to Include</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-purple-400 mt-1 flex-shrink-0">→</span>
                <span>
                  <strong className="text-white">Bug reports:</strong> Describe what you were
                  doing, what you expected, and what happened. Screenshots help.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-400 mt-1 flex-shrink-0">→</span>
                <span>
                  <strong className="text-white">Feature requests:</strong> Tell us what you&apos;d
                  love to see and why it would be useful to you.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-400 mt-1 flex-shrink-0">→</span>
                <span>
                  <strong className="text-white">Account / billing issues:</strong> Include the
                  email address on your account so we can look it up.
                </span>
              </li>
            </ul>
          </div>

          {/* Privacy requests */}
          <div className="glass rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <h2 className="text-xl font-semibold text-white">Privacy &amp; Data Requests</h2>
            </div>
            <p className="text-gray-300 mb-3">
              To exercise your data rights (access, deletion, portability, GDPR/CCPA requests),
              please email us at the address above with the subject line{' '}
              <strong className="text-white">Privacy Request</strong>. Include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
              <li>Your account email address</li>
              <li>The specific right you wish to exercise</li>
              <li>Any relevant context</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              We will respond within 30 days as required by applicable law. See our{' '}
              <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </a>{' '}
              for full details of your rights.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
