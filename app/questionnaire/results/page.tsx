'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface DiagnosticResult {
  score: number;
  scoreLabel: string;
  summary: string;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: string;
  }>;
  nextSteps: string[];
}

export default function ResultsPage() {
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamedContent, setStreamedContent] = useState('');

  useEffect(() => {
    const analyzeResponses = async () => {
      try {
        const responses = sessionStorage.getItem('diagnostic_responses');
        if (!responses) {
          setError('No diagnostic data found. Please complete the questionnaire.');
          setLoading(false);
          return;
        }

        const parsedResponses = JSON.parse(responses);

        // Fetch analysis with streaming
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responses: parsedResponses }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze responses');
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          setStreamedContent(buffer);

          // Try to parse complete JSON object
          const jsonMatch = buffer.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[0]);
              if (
                parsed.score &&
                parsed.scoreLabel &&
                parsed.summary &&
                parsed.recommendations &&
                parsed.nextSteps
              ) {
                setResult(parsed);
              }
            } catch {
              // Continue streaming until we have a complete JSON
            }
          }
        }

        // Final parse attempt
        const jsonMatch = buffer.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as DiagnosticResult;
          setResult(parsed);
        } else {
          throw new Error('No valid response received');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while analyzing your responses'
        );
        setLoading(false);
      }
    };

    analyzeResponses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-lg">
            <div className="mb-4 inline-block rounded-full bg-blue-100 p-3">
              <Zap className="h-6 w-6 animate-spin text-blue-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Analyzing Your Organization
            </h2>
            <p className="text-gray-600">
              Our AI is generating personalized recommendations...
            </p>
            {streamedContent && (
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-left">
                <p className="text-xs text-gray-600">
                  Analysis in progress...
                </p>
                <p className="mt-2 font-mono text-xs text-gray-700">
                  {streamedContent.slice(0, 200)}
                  {streamedContent.length > 200 ? '...' : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h2 className="mb-2 text-2xl font-bold text-red-900">{error}</h2>
            <p className="mb-6 text-red-700">
              Please try again or contact support if the problem persists.
            </p>
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Retake Questionnaire
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              No Results Found
            </h2>
            <Link
              href="/questionnaire"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Retake Questionnaire
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const scoreColor = {
    'Poor': 'text-red-600 bg-red-50',
    'Fair': 'text-yellow-600 bg-yellow-50',
    'Good': 'text-blue-600 bg-blue-50',
    'Excellent': 'text-green-600 bg-green-50',
  }[result.scoreLabel] || 'text-blue-600 bg-blue-50';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
        {/* Score Card */}
        <div className={`rounded-lg border p-8 text-center shadow-lg ${scoreColor}`}>
          <p className="text-sm font-medium">Your Diagnostic Score</p>
          <h1 className="mb-2 text-6xl font-bold">{result.score}</h1>
          <p className="text-lg font-semibold">{result.scoreLabel}</p>
        </div>

        {/* Summary */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Summary</h2>
          <p className="text-lg text-gray-700">{result.summary}</p>
        </div>

        {/* Top Recommendations */}
        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Top Recommendations
          </h2>
          <div className="space-y-4">
            {result.recommendations.map((rec, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 rounded-full p-2 ${
                        rec.priority === 'high'
                          ? 'bg-red-100'
                          : rec.priority === 'medium'
                            ? 'bg-yellow-100'
                            : 'bg-blue-100'
                      }`}
                    >
                      <TrendingUp
                        size={20}
                        className={
                          rec.priority === 'high'
                            ? 'text-red-600'
                            : rec.priority === 'medium'
                              ? 'text-yellow-600'
                              : 'text-blue-600'
                        }
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {rec.title}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Priority: {rec.priority}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {rec.estimatedImpact}
                  </span>
                </div>
                <p className="text-gray-700">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border-2 border-blue-600 bg-blue-50 p-8">
          <h2 className="mb-4 text-2xl font-bold text-blue-900">Next Steps</h2>
          <ol className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 rounded-full bg-blue-600 px-3 py-1 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Ready to Transform Your Organization?
          </h3>
          <p className="mb-6 text-gray-600">
            Let&apos;s discuss how to implement these recommendations and unlock your organization&apos;s full potential.
          </p>
          <a
            href="mailto:contact@cadence.ai"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Schedule a Consultation
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-2 font-semibold text-gray-900 hover:bg-gray-50 transition-colors text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/questionnaire"
            className="rounded-lg border border-gray-300 px-6 py-2 font-semibold text-gray-900 hover:bg-gray-50 transition-colors text-center"
          >
            Retake Questionnaire
          </Link>
        </div>
      </div>
    </div>
  );
}
