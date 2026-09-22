import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cadence - Organizational Audit & Automation',
  description:
    'Diagnostic analysis for your organization. Uncover opportunities for growth and automation in 2 minutes.',
  keywords:
    'organizational audit, automation, business process, diagnosis, SME',
  openGraph: {
    title: 'Cadence - Organizational Audit & Automation',
    description:
      'Get your organization diagnosed by AI. Discover improvement opportunities in 2 minutes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Analytics - configured on Day 13 */}
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <nav className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-blue-600">Cadence</div>
                <span className="text-sm text-gray-600">
                  Audit & Automation
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span className="trust-badge">🇫🇷 Hosted in France</span>
                <span className="trust-badge">✓ RGPD Compliant</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600">
              <p>
                Cadence © {new Date().getFullYear()} • Organizational Automation
              </p>
              <p className="mt-2">
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
                {' '} • {' '}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
