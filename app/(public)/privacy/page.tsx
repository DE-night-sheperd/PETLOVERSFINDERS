import { metadata as rootMetadata } from '@/app/layout';

export const metadata = {
  title: "Privacy Policy - petLoversFinders",
  description: "Our commitment to protecting your data and privacy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <section className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🔒 Data Protection</h2>
            <p className="text-slate-600 leading-relaxed">
              At petLoversFinders, we take your privacy seriously. We use enterprise-grade encryption and secure OAuth authentication to protect your personal information. Your data is never shared with third parties without your explicit consent.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🔑 Authentication</h2>
            <p className="text-slate-600 leading-relaxed">
              We use secure OAuth providers (Google, GitHub, Microsoft, Apple) for authentication. This means we never store your passwords. Your authentication credentials are handled by these trusted providers.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Data Collection</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We only collect information necessary to provide our service:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Email address from your OAuth provider</li>
              <li>Dog information you submit for listings</li>
              <li>Application information for adoptions</li>
              <li>Your preferences and profile settings</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">✋ Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Control your privacy settings</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📝 Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              For privacy concerns, please contact us at privacy@petloversfinders.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
