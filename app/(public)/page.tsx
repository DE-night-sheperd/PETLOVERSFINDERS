'use client';

import { signIn } from 'next-auth/react';
import { ArrowRight } from 'lucide-react';
import { RunningDogsHero } from '@/components/RunningDogsHero';

const providers = [
  {
    id: 'google',
    name: 'Google',
    icon: '🔍',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '⊞',
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: '🍎',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                Safe Pet Rehoming Platform
              </span>
              
              <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
                Find your pup's perfect home
              </h1>
              
              <p className="mt-6 max-w-xl text-xl text-slate-600">
                Secure, transparent pet rehoming with PLF oversight. Protect your privacy while finding the right match for your furry friend.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="mt-1 text-sm text-slate-600">Happy rehomings</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-3xl font-bold text-slate-900">99%</div>
                  <div className="mt-1 text-sm text-slate-600">Vet verified</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-3xl font-bold text-slate-900">100%</div>
                  <div className="mt-1 text-sm text-slate-600">Private & Secure</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft overflow-hidden">
              <RunningDogsHero />
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-12 shadow-soft">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Get started in seconds
            </h2>
            <p className="mt-3 text-center text-slate-600">
              Sign in securely with your preferred provider. Your data stays private.
            </p>

            <div className="mt-10 space-y-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
                  className="w-full group flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-6 py-4 font-semibold text-slate-900 transition hover:border-brand-300 hover:bg-brand-50 hover:shadow-soft"
                >
                  <span className="text-2xl">{provider.icon}</span>
                  <span>Continue with {provider.name}</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              By signing in, you agree to our{' '}
              <a href="/privacy" className="font-semibold text-brand-600 hover:text-brand-700">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="/terms" className="font-semibold text-brand-600 hover:text-brand-700">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Why choose Pet Lovers Finders?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                emoji: '🔒',
                title: 'Privacy First',
                description: 'Your personal information is never shared. Login required for all access.',
              },
              {
                emoji: '✅',
                title: 'Verified Listings',
                description: 'Every dog is vet-checked and verified by PLF oversight team.',
              },
              {
                emoji: '🤝',
                title: 'Transparent Process',
                description: 'Track every step from application to handover with our secure dashboard.',
              },
              {
                emoji: '🛡️',
                title: 'Data Protection',
                description: 'Enterprise-grade security protects all user data and transactions.',
              },
              {
                emoji: '📱',
                title: 'Easy to Use',
                description: 'Sign in once with your social account. No extra passwords to remember.',
              },
              {
                emoji: '❤️',
                title: 'For Good',
                description: 'We partner with vets and shelters to ensure every dog finds their forever home.',
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-soft transition">
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-8 sm:px-12 py-12 text-center shadow-soft">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to find your perfect match?
            </h2>
            <p className="mt-4 text-lg text-brand-100">
              Secure login protects your privacy. View listings and connect with pet lovers today.
            </p>
            <button
              onClick={() => {
                const authSection = document.querySelector('[data-auth-section]');
                authSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-brand-600 shadow-soft transition hover:bg-brand-50"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
