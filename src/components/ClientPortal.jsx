import { useState } from 'react';
import { Lock, LogOut, FileText, ClipboardList, User, ChevronRight } from 'lucide-react';

const CLIENT_PASSWORD = 'kccoaching2026';

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CLIENT_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2">Client Portal</h2>
            <p className="text-neutral-700 text-sm">Enter your password to access your portal</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="portal-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="portal-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors cursor-pointer border-none text-base"
            >
              Access Portal
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-6">
            Contact your coach if you need your password reset
          </p>
        </div>
      </div>
    </div>
  );
}

function IntakeForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    goals: '',
    challenges: '',
    previousCoaching: '',
    availability: '',
    additionalNotes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2">Form Submitted!</h3>
        <p className="text-neutral-700">Thank you for completing your intake form. Your coach will review it shortly.</p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', phone: '', dob: '', goals: '', challenges: '', previousCoaching: '', availability: '', additionalNotes: '' }); }}
          className="mt-6 px-6 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-full hover:bg-neutral-200 transition-colors cursor-pointer border-none text-sm"
        >
          Submit Another
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(555) 123-4567" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What are your primary goals? *</label>
        <textarea name="goals" required rows={3} value={formData.goals} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Describe what you'd like to achieve through coaching..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">What challenges are you currently facing?</label>
        <textarea name="challenges" rows={3} value={formData.challenges} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Describe any obstacles or challenges..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Have you worked with a coach before?</label>
        <select name="previousCoaching" value={formData.previousCoaching} onChange={handleChange} className={inputClass}>
          <option value="">Select an option</option>
          <option value="no">No, this is my first time</option>
          <option value="yes-positive">Yes, and it was a positive experience</option>
          <option value="yes-mixed">Yes, with mixed results</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred session availability</label>
        <input type="text" name="availability" value={formData.availability} onChange={handleChange} className={inputClass} placeholder="e.g., Weekday mornings, Tuesday evenings" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Additional Notes</label>
        <textarea name="additionalNotes" rows={3} value={formData.additionalNotes} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Anything else you'd like to share..." />
      </div>
      <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors cursor-pointer border-none text-base">
        Submit Intake Form
      </button>
    </form>
  );
}

function ProgressForm() {
  const [formData, setFormData] = useState({
    sessionDate: '',
    mood: '',
    wins: '',
    struggles: '',
    actionItems: '',
    rating: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2">Check-in Submitted!</h3>
        <p className="text-neutral-700">Great job staying on track. Your coach will review your progress.</p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ sessionDate: '', mood: '', wins: '', struggles: '', actionItems: '', rating: '' }); }}
          className="mt-6 px-6 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-full hover:bg-neutral-200 transition-colors cursor-pointer border-none text-sm"
        >
          Submit Another
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Session / Check-in Date *</label>
          <input type="date" name="sessionDate" required value={formData.sessionDate} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Overall Mood *</label>
          <select name="mood" required value={formData.mood} onChange={handleChange} className={inputClass}>
            <option value="">How are you feeling?</option>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="okay">Okay</option>
            <option value="struggling">Struggling</option>
            <option value="overwhelmed">Overwhelmed</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Wins this week *</label>
        <textarea name="wins" required rows={3} value={formData.wins} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="What went well? What are you proud of?" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Struggles or challenges</label>
        <textarea name="struggles" rows={3} value={formData.struggles} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="What was difficult? Where did you get stuck?" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Action items for next week</label>
        <textarea name="actionItems" rows={3} value={formData.actionItems} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="What do you plan to work on next?" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Rate your progress (1-10)</label>
        <input type="number" name="rating" min="1" max="10" value={formData.rating} onChange={handleChange} className={inputClass} placeholder="1 = no progress, 10 = amazing progress" />
      </div>
      <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors cursor-pointer border-none text-base">
        Submit Check-in
      </button>
    </form>
  );
}

function PortalDashboard({ onLogout }) {
  const [activeForm, setActiveForm] = useState(null);

  const forms = [
    {
      id: 'intake',
      title: 'New Client Intake Form',
      description: 'Complete this form before your first session',
      icon: FileText,
    },
    {
      id: 'progress',
      title: 'Weekly Progress Check-in',
      description: 'Track your progress and share updates with your coach',
      icon: ClipboardList,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">Client Portal</h1>
            <p className="text-neutral-700 mt-1">Welcome back! Select a form below.</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>

        {activeForm === null ? (
          /* Form Selection */
          <div className="grid sm:grid-cols-2 gap-6">
            {forms.map((form) => {
              const Icon = form.icon;
              return (
                <button
                  key={form.id}
                  onClick={() => setActiveForm(form.id)}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 text-left hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                    {form.title}
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors" />
                  </h3>
                  <p className="text-sm text-neutral-700">{form.description}</p>
                </button>
              );
            })}
          </div>
        ) : (
          /* Active Form */
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
            <button
              onClick={() => setActiveForm(null)}
              className="text-sm text-primary hover:text-primary-light font-medium mb-6 flex items-center gap-1 bg-transparent border-none cursor-pointer p-0"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to forms
            </button>

            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">
              {forms.find((f) => f.id === activeForm)?.title}
            </h2>

            {activeForm === 'intake' && <IntakeForm />}
            {activeForm === 'progress' && <ProgressForm />}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClientPortal() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('kc_portal_auth') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('kc_portal_auth', 'true');
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kc_portal_auth');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <PortalDashboard onLogout={handleLogout} />;
}
