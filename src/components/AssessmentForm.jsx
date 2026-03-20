import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ClipboardList, Download, Loader2 } from 'lucide-react';
import Footer from './Footer';
import generateAssessmentPDF from '../utils/generateAssessmentPDF';

const LIFE_AREAS = [
  'Career/Employment Satisfaction',
  'Financial Stability',
  'Health & Fitness',
  'Marriage/Romantic Relationships',
  'Personal Life Fulfillment',
  'Personal Spiritual Life',
  'Church/Religious Life',
  'Current Ministry',
  'Recreation/Relaxation/Fun',
  'Physical Comfort (ie-Housing, Location, Cars)',
  'Mental/Emotional Health',
  'Extended Family (In-Laws/Relatives)',
  'Friends/Social Life',
  'Lifestyle (Degree of Busyness)',
  'Other',
];

const STEPS = [
  'Personal Info',
  'Life Overview',
  'Strengths & Challenges',
  'Goals & Aspirations',
  'Mindset & Motivation',
  'Support & Resources',
  'Coaching Expectations',
  'Notes & Signature',
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors';

const textareaClass = `${inputClass} resize-none`;

function ProgressBar({ currentStep, totalSteps }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-neutral-500 mb-2">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{STEPS[currentStep]}</span>
      </div>
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Step indicators */}
      <div className="hidden sm:flex justify-between mt-3">
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-col items-center" style={{ width: `${100 / totalSteps}%` }}>
            <div
              className={`w-3 h-3 rounded-full border-2 transition-colors ${
                i < currentStep
                  ? 'bg-primary border-primary'
                  : i === currentStep
                  ? 'bg-white border-primary'
                  : 'bg-white border-neutral-300'
              }`}
            />
            <span className={`text-[10px] mt-1 text-center leading-tight ${
              i <= currentStep ? 'text-primary font-medium' : 'text-neutral-400'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPersonalInfo({ data, onChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Personal Information</h3>
      <p className="text-sm text-neutral-600">Please provide your basic information to get started.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={data.fullName}
            onChange={onChange}
            className={inputClass}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Date of Assessment</label>
          <input
            type="date"
            name="assessmentDate"
            value={data.assessmentDate}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={data.email}
            onChange={onChange}
            className={inputClass}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={onChange}
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
    </div>
  );
}

function StepLifeOverview({ data, onChange }) {
  const handleRatingChange = (area, value) => {
    const num = parseInt(value);
    if (value === '' || (num >= 1 && num <= 10)) {
      onChange({
        target: {
          name: `lifeAreas`,
          value: { ...data.lifeAreas, [area]: { ...data.lifeAreas[area], rating: value } },
        },
      });
    }
  };

  const handleCommentChange = (area, value) => {
    onChange({
      target: {
        name: `lifeAreas`,
        value: { ...data.lifeAreas, [area]: { ...data.lifeAreas[area], comment: value } },
      },
    });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 1: Current Life Overview</h3>
      <p className="text-sm text-neutral-600">
        Rate your satisfaction in each area on a scale of 1–10 (1 = very dissatisfied, 10 = very satisfied).
        Skip any items that do not pertain to you.
      </p>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-900 text-white">
              <th className="text-left py-3 px-4 font-semibold rounded-tl-xl">Life Area</th>
              <th className="text-center py-3 px-4 font-semibold w-28">Rating (1–10)</th>
              <th className="text-left py-3 px-4 font-semibold rounded-tr-xl">Comments/Notes</th>
            </tr>
          </thead>
          <tbody>
            {LIFE_AREAS.map((area, i) => (
              <tr key={area} className={i % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                <td className="py-2.5 px-4 text-neutral-800 font-medium">{area}</td>
                <td className="py-2.5 px-4">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={data.lifeAreas[area]?.rating || ''}
                    onChange={(e) => handleRatingChange(area, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-center text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="1-10"
                  />
                </td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    value={data.lifeAreas[area]?.comment || ''}
                    onChange={(e) => handleCommentChange(area, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="Optional notes..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-4">
        {LIFE_AREAS.map((area) => (
          <div key={area} className="bg-neutral-50 rounded-xl p-4 space-y-2">
            <p className="text-sm font-medium text-neutral-800">{area}</p>
            <div className="flex gap-3">
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={data.lifeAreas[area]?.rating || ''}
                  onChange={(e) => handleRatingChange(area, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-center text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="1-10"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={data.lifeAreas[area]?.comment || ''}
                  onChange={(e) => handleCommentChange(area, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="Notes..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepStrengthsChallenges({ data, onChange }) {
  const handleItemChange = (field, index, value) => {
    const updated = [...(data[field] || ['', '', ''])];
    updated[index] = value;
    onChange({ target: { name: field, value: updated } });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 2: Strengths and Challenges</h3>
      <p className="text-sm text-neutral-600">Identify your key personal strengths and the challenges you're currently facing.</p>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">Top 3 Personal Strengths *</label>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <input
                type="text"
                required
                value={(data.strengths && data.strengths[i]) || ''}
                onChange={(e) => handleItemChange('strengths', i, e.target.value)}
                className={inputClass}
                placeholder={`Strength ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">Top 3 Current Challenges *</label>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <input
                type="text"
                required
                value={(data.challenges && data.challenges[i]) || ''}
                onChange={(e) => handleItemChange('challenges', i, e.target.value)}
                className={inputClass}
                placeholder={`Challenge ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepGoals({ data, onChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 3: Goals and Aspirations</h3>
      <p className="text-sm text-neutral-600">Share your short and long-term goals, and describe what success looks like for you.</p>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Short-term goals (next 3–6 months) *</label>
        <textarea
          name="shortTermGoals"
          required
          rows={3}
          value={data.shortTermGoals}
          onChange={onChange}
          className={textareaClass}
          placeholder="What do you want to accomplish in the next few months?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Long-term goals (1–5 years) *</label>
        <textarea
          name="longTermGoals"
          required
          rows={3}
          value={data.longTermGoals}
          onChange={onChange}
          className={textareaClass}
          placeholder="Where do you see yourself in the next few years?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What would success look like in these areas?</label>
        <textarea
          name="successVision"
          rows={3}
          value={data.successVision}
          onChange={onChange}
          className={textareaClass}
          placeholder="Describe what achieving these goals looks and feels like..."
        />
      </div>
    </div>
  );
}

function StepMindset({ data, onChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 4: Mindset and Motivation</h3>
      <p className="text-sm text-neutral-600">Help your coach understand what drives you and what may be holding you back.</p>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What motivates you most in life? *</label>
        <textarea
          name="motivations"
          required
          rows={3}
          value={data.motivations}
          onChange={onChange}
          className={textareaClass}
          placeholder="What gets you excited and drives you forward?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What drains your energy or motivation?</label>
        <textarea
          name="energyDrains"
          rows={3}
          value={data.energyDrains}
          onChange={onChange}
          className={textareaClass}
          placeholder="What leaves you feeling depleted or unmotivated?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">How do you typically handle setbacks or challenges?</label>
        <textarea
          name="setbackHandling"
          rows={3}
          value={data.setbackHandling}
          onChange={onChange}
          className={textareaClass}
          placeholder="Describe your typical response to obstacles..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What beliefs or habits might be holding you back?</label>
        <textarea
          name="limitingBeliefs"
          rows={3}
          value={data.limitingBeliefs}
          onChange={onChange}
          className={textareaClass}
          placeholder="Any patterns or mindsets you'd like to change..."
        />
      </div>
    </div>
  );
}

function StepSupport({ data, onChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 5: Support and Resources</h3>
      <p className="text-sm text-neutral-600">Tell us about the support systems and resources available to you.</p>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Who or what supports you in achieving your goals? *</label>
        <textarea
          name="currentSupport"
          required
          rows={3}
          value={data.currentSupport}
          onChange={onChange}
          className={textareaClass}
          placeholder="People, communities, or systems that support you..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What additional support do you need right now?</label>
        <textarea
          name="neededSupport"
          rows={3}
          value={data.neededSupport}
          onChange={onChange}
          className={textareaClass}
          placeholder="What's missing in your support system?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What resources (books, mentors, tools) have helped you in the past?</label>
        <textarea
          name="pastResources"
          rows={3}
          value={data.pastResources}
          onChange={onChange}
          className={textareaClass}
          placeholder="Books, programs, mentors, or tools that made a difference..."
        />
      </div>
    </div>
  );
}

function StepCoachingExpectations({ data, onChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 6: Coaching Expectations</h3>
      <p className="text-sm text-neutral-600">Help us tailor the coaching experience to your preferences.</p>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What do you hope to gain from life coaching? *</label>
        <textarea
          name="coachingHopes"
          required
          rows={3}
          value={data.coachingHopes}
          onChange={onChange}
          className={textareaClass}
          placeholder="What outcomes are you looking for?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">How will you know coaching has been successful for you?</label>
        <textarea
          name="successCriteria"
          rows={3}
          value={data.successCriteria}
          onChange={onChange}
          className={textareaClass}
          placeholder="What specific results or changes would signal success?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred coaching style</label>
        <select
          name="coachingStyle"
          value={data.coachingStyle}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select a style</option>
          <option value="directive">Directive</option>
          <option value="reflective">Reflective</option>
          <option value="goal-oriented">Goal-Oriented</option>
          <option value="collaborative">Collaborative</option>
          <option value="no-preference">No Preference</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">Preferred session frequency *</label>
        <div className="flex flex-wrap gap-4">
          {['Weekly', 'BiWeekly', 'Monthly'].map((freq) => (
            <label key={freq} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sessionFrequency"
                value={freq.toLowerCase()}
                checked={data.sessionFrequency === freq.toLowerCase()}
                onChange={onChange}
                className="w-4 h-4 accent-[#2c5f4a]"
              />
              <span className="text-sm text-neutral-700">{freq}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepNotesSignature({ data, onChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-serif font-bold text-neutral-900">Section 7: Additional Notes</h3>
      <p className="text-sm text-neutral-600">Anything else you'd like your coach to know before getting started.</p>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Anything else important to share about your current situation or goals?
        </label>
        <textarea
          name="additionalNotes"
          rows={5}
          value={data.additionalNotes}
          onChange={onChange}
          className={textareaClass}
          placeholder="Share anything else on your mind..."
        />
      </div>
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-lg font-serif font-semibold text-neutral-900 mb-4">Signature</h4>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Client Signature (Full Name) *</label>
            <input
              type="text"
              name="signature"
              required
              value={data.signature}
              onChange={onChange}
              className={inputClass}
              placeholder="Type your full name as signature"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Date *</label>
            <input
              type="date"
              name="signatureDate"
              required
              value={data.signatureDate}
              onChange={onChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ onReset, onDownloadPDF, emailError }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-3">Assessment Submitted!</h2>
      <p className="text-neutral-700 max-w-md mx-auto mb-8">
        Thank you for completing your Life Coaching Assessment. Your coach will review your responses and reach out to discuss next steps.
      </p>
      {emailError && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm max-w-md mx-auto">
          {emailError}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onDownloadPDF}
          className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors cursor-pointer border-none text-base"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3.5 bg-neutral-100 text-neutral-700 font-medium rounded-full hover:bg-neutral-200 transition-colors cursor-pointer border-none text-base"
        >
          Submit Another Assessment
        </button>
      </div>
    </div>
  );
}

const initialFormData = {
  fullName: '',
  assessmentDate: '',
  email: '',
  phone: '',
  lifeAreas: LIFE_AREAS.reduce((acc, area) => {
    acc[area] = { rating: '', comment: '' };
    return acc;
  }, {}),
  strengths: ['', '', ''],
  challenges: ['', '', ''],
  shortTermGoals: '',
  longTermGoals: '',
  successVision: '',
  motivations: '',
  energyDrains: '',
  setbackHandling: '',
  limitingBeliefs: '',
  currentSupport: '',
  neededSupport: '',
  pastResources: '',
  coachingHopes: '',
  successCriteria: '',
  coachingStyle: '',
  sessionFrequency: '',
  additionalNotes: '',
  signature: '',
  signatureDate: '',
};

export default function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const pdfDocRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Generate PDF
      const doc = generateAssessmentPDF(formData, LIFE_AREAS);
      pdfDocRef.current = doc;

      // Get PDF as base64 using arraybuffer -> btoa conversion
      const arrayBuffer = doc.output('arraybuffer');
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const pdfBase64 = btoa(binary);

      // Send PDF to Vercel API route which emails it via Resend
      const response = await fetch('/api/send-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          clientName: formData.fullName,
          clientEmail: formData.email,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(`Email may not have sent (${err.message}), but you can still download your PDF below.`);
      // Still show success and allow PDF download even if email fails
      if (!pdfDocRef.current) {
        const doc = generateAssessmentPDF(formData, LIFE_AREAS);
        pdfDocRef.current = doc;
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadPDF = () => {
    if (pdfDocRef.current) {
      const name = formData.fullName.replace(/\s+/g, '_') || 'assessment';
      pdfDocRef.current.save(`Life_Coaching_Assessment_${name}.pdf`);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setStep(0);
    setSubmitted(false);
    setError('');
    pdfDocRef.current = null;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepPersonalInfo data={formData} onChange={handleChange} />;
      case 1:
        return <StepLifeOverview data={formData} onChange={handleChange} />;
      case 2:
        return <StepStrengthsChallenges data={formData} onChange={handleChange} />;
      case 3:
        return <StepGoals data={formData} onChange={handleChange} />;
      case 4:
        return <StepMindset data={formData} onChange={handleChange} />;
      case 5:
        return <StepSupport data={formData} onChange={handleChange} />;
      case 6:
        return <StepCoachingExpectations data={formData} onChange={handleChange} />;
      case 7:
        return <StepNotesSignature data={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <>
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-2">
              Life Coaching Assessment
            </h1>
            <p className="text-neutral-700 max-w-lg mx-auto">
              Complete this assessment to help your coach understand where you are and where you want to go.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-10">
              <SuccessScreen onReset={handleReset} onDownloadPDF={handleDownloadPDF} emailError={error} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-10">
              <ProgressBar currentStep={step} totalSteps={STEPS.length} />

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                    {error}
                  </div>
                )}
                {renderStep()}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 0}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-colors cursor-pointer border-none ${
                      step === 0
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  {isLastStep ? (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium text-sm rounded-full hover:bg-primary-light transition-colors cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Assessment
                          <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium text-sm rounded-full hover:bg-primary-light transition-colors cursor-pointer border-none"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
