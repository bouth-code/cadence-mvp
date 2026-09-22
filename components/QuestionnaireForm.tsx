'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'team_size',
    question: 'How many people are in your team?',
    type: 'select',
    options: [
      '1-5 people',
      '6-15 people',
      '16-50 people',
      '51-100 people',
      '100+ people',
    ],
  },
  {
    id: 'primary_challenge',
    question: 'What is your biggest operational challenge?',
    type: 'select',
    options: [
      'Manual data entry and repetitive tasks',
      'Communication and collaboration',
      'Process documentation and tracking',
      'Reporting and analytics',
      'Other',
    ],
  },
  {
    id: 'automation_level',
    question: 'What percentage of your processes are currently automated?',
    type: 'select',
    options: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
  },
  {
    id: 'budget_allocation',
    question:
      'What percentage of your budget is allocated to technology/tools?',
    type: 'select',
    options: ['None', '1-5%', '6-10%', '11-20%', '20%+'],
  },
  {
    id: 'growth_priority',
    question: 'What is your top priority for the next 12 months?',
    type: 'select',
    options: [
      'Increase revenue',
      'Reduce costs',
      'Improve efficiency',
      'Scale operations',
      'Other',
    ],
  },
  {
    id: 'tech_stack',
    question: 'How would you describe your current technology stack?',
    type: 'select',
    options: [
      'Mostly manual, minimal tools',
      'Mix of manual and automated tools',
      'Mostly automated with some manual tasks',
      'Fully integrated and automated',
    ],
  },
  {
    id: 'main_bottleneck',
    question: 'What is your main operational bottleneck?',
    type: 'select',
    options: [
      'Lack of time',
      'Lack of skilled resources',
      'Lack of tools/technology',
      'Lack of process clarity',
      'Multiple bottlenecks equally',
    ],
  },
  {
    id: 'improvement_timeline',
    question: 'What timeline would you prefer for improvements?',
    type: 'select',
    options: [
      'Immediate (within 1 month)',
      'Short-term (1-3 months)',
      'Medium-term (3-6 months)',
      'Long-term (6+ months)',
    ],
  },
  {
    id: 'data_management',
    question: 'How do you currently manage customer/business data?',
    type: 'select',
    options: [
      'Spreadsheets and files',
      'Basic CRM or database',
      'Multiple disconnected systems',
      'Integrated platform',
    ],
  },
  {
    id: 'success_metrics',
    question:
      'Which metric is most important to track for your success?',
    type: 'select',
    options: [
      'Revenue growth',
      'Cost reduction',
      'Time to delivery',
      'Customer satisfaction',
      'Team productivity',
    ],
  },
];

interface QuestionnaireFormProps {
  onSuccess?: (responses: Record<string, string>) => void;
}

export default function QuestionnaireForm({
  onSuccess,
}: QuestionnaireFormProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = QUESTIONS[currentQuestion];
  const totalQuestions = QUESTIONS.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSelectChange = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      [question.id]: value,
    }));
  };

  const handleNext = () => {
    if (!responses[question.id]) {
      setError('Please select an answer before proceeding');
      return;
    }
    setError(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Send responses to API for analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze responses');
      }

      // Store responses and redirect to results
      sessionStorage.setItem('diagnostic_responses', JSON.stringify(responses));
      sessionStorage.setItem('diagnostic_stream_url', '/api/analyze');

      if (onSuccess) {
        onSuccess(responses);
      } else {
        router.push('/questionnaire/results');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          {/* Question */}
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {question.question}
          </h2>

          {/* Options */}
          <div className="mb-6 space-y-3">
            {question.type === 'select' &&
              question.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center rounded-lg border border-gray-300 p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={responses[question.id] === option}
                    onChange={() => handleSelectChange(option)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || isSubmitting}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing...
                </>
              ) : currentQuestion === totalQuestions - 1 ? (
                <>
                  Get Results
                  <ArrowRight size={20} />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Estimated Time */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Estimated time remaining:{' '}
            {Math.max(1, Math.ceil((totalQuestions - currentQuestion) * 0.2))}{' '}
            minute
            {Math.max(1, Math.ceil((totalQuestions - currentQuestion) * 0.2)) >
            1
              ? 's'
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
