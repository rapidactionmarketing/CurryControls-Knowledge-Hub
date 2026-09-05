import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { CONTACT, CONTACT_TOPICS } from '@/data/site';
import { trackContactSubmit } from '@/lib/analytics';
import {
  breadcrumbSchema,
  contactPageSchema,
  graph,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  topic: string;
  message: string;
};

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  topic: '',
  message: '',
};

/**
 * Contact page for Eric Sullivan.
 *
 * This is not a Curry Controls Company contact page and it is not a General
 * Control Systems contact page. The phone number and this form reach Eric
 * Sullivan directly regarding CurryControls.com and his personal projects.
 */
export function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email, and message are required.');
      return;
    }
    setError(null);

    // No message backend is connected yet, so the form composes an email
    // rather than silently discarding what someone wrote.
    const body = [
      `Name: ${form.name}`,
      form.company && `Company / Organization: ${form.company}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.topic && `Topic: ${form.topic}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n');

    const subject = form.subject || `CurryControls.com enquiry${form.topic ? ` — ${form.topic}` : ''}`;
    trackContactSubmit(form.topic, '/contact');
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const trail = [{ name: 'Contact Eric Sullivan', path: '/contact' }];

  return (
    <>
      <Seo
        title="Contact Eric Sullivan"
        description={`Contact Eric Sullivan about CurryControls.com, a controls or automation topic, or one of his personal projects. Phone ${CONTACT.phoneDisplay}.`}
        path="/contact"
        jsonLd={graph(websiteSchema(), personSchema(), contactPageSchema(), breadcrumbSchema(trail))}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Contact Eric Sullivan</h1>
          <p className="cc-lead mt-3 max-w-2xl">
            Have a question related to CurryControls.com, one of Eric's personal projects, or a
            controls and automation topic?
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-9 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 max-w-2xl">
            {submitted ? (
              <div className="cc-card p-6" data-testid="contact-submitted">
                <div className="flex items-center gap-2 text-[hsl(var(--teal))]">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span className="cc-eyebrow">Message prepared</span>
                </div>
                <h2 className="cc-h2 mt-2">Your email client should have opened</h2>
                <p className="mt-2.5 text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
                  The details you entered were composed into an email. If nothing opened, the fastest
                  route is a direct call.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={CONTACT.phoneHref} data-phone-placement="contact-confirmation" className="cc-btn cc-btn-primary">
                    <Phone size={15} aria-hidden="true" />
                    Call {CONTACT.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(EMPTY);
                    }}
                    className="cc-btn cc-btn-outline"
                  >
                    Write another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate data-testid="contact-form">
                <h2 className="cc-h2">Send a message</h2>
                <p className="mt-2 text-[0.9rem] text-[hsl(var(--ink-2))]">
                  Fields marked with an asterisk are required.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" required value={form.name} onChange={set('name')} />
                  <Field
                    id="company"
                    label="Company / Organization"
                    value={form.company}
                    onChange={set('company')}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                  />
                  <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={set('phone')} />
                  <div className="sm:col-span-2">
                    <Field id="subject" label="Subject" value={form.subject} onChange={set('subject')} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="topic" className="mb-1.5 block text-[0.82rem] font-semibold text-[hsl(var(--navy))]">
                      Topic
                    </label>
                    <select
                      id="topic"
                      value={form.topic}
                      onChange={set('topic')}
                      className="cc-input"
                      data-testid="select-topic"
                    >
                      <option value="">Select a topic</option>
                      {CONTACT_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-[0.82rem] font-semibold text-[hsl(var(--navy))]"
                    >
                      Message <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={7}
                      value={form.message}
                      onChange={set('message')}
                      className="cc-input resize-y"
                      required
                      data-testid="input-message"
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="mt-4 text-[0.86rem] font-medium text-[hsl(var(--destructive))]">
                    {error}
                  </p>
                )}

                <button type="submit" className="cc-btn cc-btn-primary mt-6" data-testid="button-submit-contact">
                  <Mail size={15} aria-hidden="true" />
                  Send message
                </button>

                <p className="mt-3 text-[0.78rem] leading-5 text-[hsl(var(--ink-2))]">
                  This form composes an email in your own mail application. Nothing is transmitted or
                  stored by this website.
                </p>
              </form>
            )}
          </div>

          <aside className="lg:sticky lg:top-[140px] lg:self-start">
            <div className="cc-card p-5">
              <p className="cc-eyebrow">Direct contact</p>
              <p className="cc-h3 mt-2">{CONTACT.person}</p>
              <a
                href={CONTACT.phoneHref}
                data-phone-placement="contact-page"
                className="mt-3 flex items-center gap-3 rounded bg-[hsl(var(--navy))] px-4 py-3 text-white"
                data-testid="link-phone-contact-page"
              >
                <Phone size={18} aria-hidden="true" />
                <span>
                  <span className="block text-[0.68rem] uppercase tracking-wider text-white/65">
                    Phone
                  </span>
                  <span className="cc-phone">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
              <p className="mt-4 text-[0.82rem] leading-6 text-[hsl(var(--ink-2))]">
                {CONTACT.attribution}
              </p>
            </div>

            <div className="cc-card mt-4 bg-[hsl(var(--surface))] p-5">
              <p className="cc-eyebrow">Please note</p>
              <p className="mt-2 text-[0.82rem] leading-6 text-[hsl(var(--ink-2))]">
                This page is for contacting Eric Sullivan regarding CurryControls.com and his personal
                projects. It is not a contact page for Curry Controls Company, and it is not a contact
                page for General Control Systems, Inc.
              </p>
            </div>

            <Disclaimer kind="engineering" className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.82rem] font-semibold text-[hsl(var(--navy))]">
        {label}
        {required && (
          <>
            {' '}
            <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="cc-input"
        data-testid={`input-${id}`}
      />
    </div>
  );
}
