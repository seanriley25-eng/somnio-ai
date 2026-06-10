import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Somnio',
  description: 'How Somnio collects, stores, and protects your data, including your dream journal, account information, and generated images.',
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'June 10, 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <p>
              This Privacy Policy explains how Somnio (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;), operated by <strong>Farallone Media LLC</strong> at{' '}
              <strong>daily-dreams.ai</strong>, collects, uses, stores,
              and shares information about you when you use our service. Please read it carefully.
              By using Somnio you agree to the practices described here.
            </p>
          </section>

          {/* What we collect */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect the following categories of personal information:
            </p>

            <h3 className="text-lg font-semibold text-purple-300 mb-2">Account information</h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>
                <strong>Email address</strong> — collected when you create an account or sign in
                via OAuth (Google). Used for authentication, service notifications, and, with your
                consent, occasional product updates.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-300 mb-2">Dream journal data</h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>
                <strong>Dream descriptions</strong> — the text you enter describing your dream.
                This is stored in our database so you can access your personal journal over time.
              </li>
              <li>
                <strong>AI-generated interpretations</strong> — the textual analysis produced by
                Claude Haiku 4.5. Stored alongside your dream entry.
              </li>
              <li>
                <strong>AI-generated images</strong> — the visual artwork produced by FLUX schnell
                based on your dream. Stored and associated with your dream entry.
              </li>
              <li>
                <strong>Share IDs</strong> — a unique identifier created when you choose to share
                a dream. Anyone with the share link can view the dream, interpretation, and image
                publicly (see <em>Public Share Links</em> below).
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              Automatically collected data
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>
                <strong>Session data</strong> — authentication tokens stored in cookies (see
                <em> Cookies</em> below).
              </li>
              <li>
                <strong>Usage analytics</strong> — if you consent, aggregate page-view and
                interaction data via Google Analytics. This data is associated with a pseudonymous
                cookie identifier, not your email.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              What we do <em>not</em> collect
            </h3>
            <p>
              We do not collect payment information (there is currently no paid tier), precise
              geolocation, or any biometric data.
            </p>
          </section>

          {/* Public share links */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Public Share Links</h2>
            <p className="mb-3">
              When you click &quot;Share&quot; on a dream entry, Somnio generates a unique URL of
              the form{' '}
              <code className="bg-purple-900/40 px-1 rounded text-purple-300 text-sm">
                daily-dreams.ai/dream/[share_id]
              </code>
              . Anyone who knows this URL — including people who are not signed in — can view the
              full dream text, interpretation, and generated image.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-100/90 text-sm">
                <strong>Important:</strong> Think carefully before sharing. Once a share link is
                created, the content at that URL is publicly accessible. Do not share dreams
                containing sensitive personal information you are not comfortable making public.
                You can delete a dream entry from your journal at any time, which will also
                deactivate its share link.
              </p>
            </div>
          </section>

          {/* How we use your data */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Authenticate you and maintain your session.</li>
              <li>Store and display your dream journal entries.</li>
              <li>
                Send your dream text to Anthropic&apos;s Claude API to generate an interpretation
                (see Third-Party Processors below).
              </li>
              <li>
                Send a prompt to Replicate&apos;s FLUX schnell model to generate a dream image.
              </li>
              <li>Display aggregated, anonymised analytics to help us improve the service.</li>
              <li>Respond to your support or privacy enquiries.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> sell your personal data. We do not use your dream content
              to train AI models.
            </p>
          </section>

          {/* Third-party processors */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Processors</h2>
            <p className="mb-4">
              We share your data with the following sub-processors, solely to deliver the service:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-purple-300">
                  Anthropic (Claude Haiku 4.5) — Interpretation
                </h3>
                <p className="text-sm">
                  Your dream text is sent to Anthropic&apos;s API to generate an interpretation.
                  Anthropic processes this data in accordance with their{' '}
                  <a
                    href="https://www.anthropic.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Privacy Policy
                  </a>
                  . Anthropic&apos;s API usage policy prohibits them from training on your inputs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">
                  Replicate (FLUX schnell) — Image Generation
                </h3>
                <p className="text-sm">
                  A text prompt derived from your dream is sent to Replicate to generate an image.
                  Replicate processes this in accordance with their{' '}
                  <a
                    href="https://replicate.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">
                  Supabase — Authentication &amp; Database
                </h3>
                <p className="text-sm">
                  Your account credentials, dream entries, interpretations, and images are stored
                  in Supabase (hosted on AWS). Supabase processes this data in accordance with
                  their{' '}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">Google — AdSense &amp; Analytics</h3>
                <p className="text-sm">
                  We use Google AdSense (pub-8082302563728806) to display ads. With your consent,
                  we also use Google Analytics for aggregate usage analytics. Google&apos;s data
                  practices are governed by their{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Privacy Policy
                  </a>
                  . We implement Google Consent Mode v2; personalised advertising and analytics
                  cookies are only set with your consent.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">Vercel — Hosting</h3>
                <p className="text-sm">
                  The Somnio application is hosted on Vercel. Vercel may log request metadata
                  (IP address, user agent) for security and performance purposes. See{' '}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Vercel&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-purple-300">Essential cookies</h3>
                <p className="text-sm">
                  We set a session cookie to keep you signed in. This cookie is strictly necessary
                  for the service to function and does not require consent.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">
                  Analytics &amp; advertising cookies (consent required)
                </h3>
                <p className="text-sm">
                  Google AdSense and Google Analytics set cookies to measure ad performance and
                  usage patterns. We use Google Consent Mode v2 — these cookies are only set after
                  you click &quot;Accept&quot; in the cookie banner. You can change your preference
                  at any time by clearing your browser cookies or clicking the cookie preference
                  link in the footer.
                </p>
              </div>
            </div>
          </section>

          {/* Data retention */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention &amp; Deletion</h2>
            <p className="mb-3">
              <strong>Dream journal entries</strong> are retained for as long as your account is
              active, or until you delete them. You can delete individual dream entries at any time
              from your dream journal (<Link href="/dreams" className="text-purple-400 hover:text-purple-300 underline">/dreams</Link>).
            </p>
            <p className="mb-3">
              <strong>Your account</strong> (and all associated data) can be deleted by contacting
              us at{' '}
              <a
                href="mailto:privacy@farallone.com"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                privacy@farallone.com
              </a>
              . We will process deletion requests within 30 days.
            </p>
            <p>
              <strong>Backups</strong> may retain data for up to 90 days after deletion before
              being permanently purged.
            </p>
          </section>

          {/* Your rights */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p className="mb-4">
              Depending on your jurisdiction, you may have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Access &amp; portability</strong> — request a copy of the personal data
                we hold about you.
              </li>
              <li>
                <strong>Rectification</strong> — request correction of inaccurate data.
              </li>
              <li>
                <strong>Erasure (GDPR Art. 17 / &quot;Right to be forgotten&quot;)</strong> —
                request deletion of your personal data.
              </li>
              <li>
                <strong>Restriction of processing</strong> — request that we limit how we use
                your data while a dispute is resolved.
              </li>
              <li>
                <strong>Objection</strong> — object to processing based on legitimate interests.
              </li>
              <li>
                <strong>CCPA opt-out</strong> — California residents may opt out of the &quot;sale&quot;
                or &quot;sharing&quot; of personal data. We do not sell personal data; however you
                may opt out of personalised advertising by rejecting cookies in our consent banner.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a
                href="mailto:privacy@farallone.com"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                privacy@farallone.com
              </a>{' '}
              or via our{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                contact page
              </Link>
              .
            </p>
          </section>

          {/* Children */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Children&apos;s Privacy</h2>
            <p>
              Somnio is not directed at children under the age of 13. If you are in the EU or UK,
              you must be at least 16 years old to use this service (or the applicable age of
              digital consent in your country). We do not knowingly collect personal data from
              anyone below these ages. If you believe a child has provided us with personal
              information, please contact us immediately and we will delete it.
            </p>
          </section>

          {/* Changes */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will update the &quot;Last
              updated&quot; date at the top of this page and, for material changes, notify you by
              email or a prominent notice on the site.
            </p>
          </section>

          {/* Contact */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
            <p>
              For privacy enquiries, data requests, or concerns, please contact us at:{' '}
              <a
                href="mailto:privacy@farallone.com"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                privacy@farallone.com
              </a>{' '}
              or via our{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
