'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Discover Your Organization's{' '}
            <span className="text-blue-600">Hidden Opportunities</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Cadence provides AI-powered organizational audits. Get a personalized diagnostic analysis in just 2 minutes and discover how automation can transform your business.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Start Your Diagnostic
              <ArrowRight size={20} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-900 hover:border-gray-400 transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                No credit card required
              </span>
            </div>
            <div className="hidden h-6 border-l border-gray-300 sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                2-minute questionnaire
              </span>
            </div>
            <div className="hidden h-6 border-l border-gray-300 sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Instant results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-t border-gray-200 bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Answer Questions
              </h3>
              <p className="text-gray-600">
                Respond to 10 targeted questions about your organization. Takes just 2 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Our advanced AI diagnostic engine analyzes your responses and generates insights.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Get Results
              </h3>
              <p className="text-gray-600">
                Receive your diagnostic score and personalized recommendations for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          What You'll Discover
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Process Inefficiencies',
              description:
                'Identify workflows that can be optimized or automated.',
            },
            {
              title: 'Automation Opportunities',
              description:
                'Discover specific areas where automation can save time and costs.',
            },
            {
              title: 'Growth Potential',
              description:
                'Uncover strategies to scale your organization more efficiently.',
            },
            {
              title: 'Cost Reduction',
              description:
                'Find opportunities to reduce operational expenses.',
            },
            {
              title: 'Team Productivity',
              description:
                'Learn how to improve team efficiency and satisfaction.',
            },
            {
              title: 'Technology Gaps',
              description:
                'Identify tools and systems that could enhance your operations.',
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="mb-2 font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Optimize Your Organization?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Get your personalized diagnostic analysis in 2 minutes. No credit card required.
          </p>
          <Link
            href="/questionnaire"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Start Your Diagnostic
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
