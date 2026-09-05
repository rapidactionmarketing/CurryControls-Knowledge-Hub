import { useState, type FormEvent } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { CONTACT, CONTACT_TOPICS } from '@/data/site';
import { LEGAL } from '@/data/site-legal';
import { trackContactSubmit } from '@/lib/analytics';
import { apiUrl } from '@/lib/api-base';
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
  /** Honeypot. Never shown to a person; a bot that fills it is ignored. */
  website: string;
};

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  topic: '',
  message: '',
  website: '',
};

type Phase = 'form' | 'sent' | 'fallback';
type Delivery = 'emailed' | 'stored';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** How long the form waits for the message service before composing an email instead. */
const SUBMIT_TIMEOUT_MS = 30_000;

const trimmedOrUndefined = (value: string): string | undefined => {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

/** The fallback: the same details composed into the visitor's own mail application. */
function mailtoHref(form: FormState): string {
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
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Contact page for Eric Sullivan.
 *
 * This is not a contact page for Curry Controls Company, Revere Control
 * Systems, Inc., S.J. Electro Systems, LLC, or General Control Systems, Inc.
 * The phone number and this form reach Eric Sullivan directly regarding
 * CurryControls.com and his personal projects. The wording is
 * CONTACT_STATEMENT in the legal record.
 *
 * The form posts to the site's message service, which stores the message and
 * emails Eric. If the service cannot be reached, the same details are composed
 * into an email in the visitor's own mail application rather than discarded.
 */
export function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [phase, setPhase] = useState<Phase>('form');
  const [delivery, setDelivery] = useState<Delivery>('stored');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const reset = () => {
    setPhase('form');
    setForm(EMPTY);
    setError(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email, and message are required.');
      return;
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setError('Please enter a valid email address so Eric can reply.');
      return;
    }
    setError(null);
    setSending(true);
    trackContactSubmit(form.topic, '/contact');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          company: trimmedOrUndefined(form.company),
          email: form.email.trim(),
          phone: trimmedOrUndefined(form.phone),
          subject: trimmedOrUndefined(form.subject),
          topic: trimmedOrUndefined(form.topic),
          message: form.message.trim(),
          page: '/contact',
          website: form.website,
        }),
        signal: controller.signal,
      });

      if (response.status === 400 || response.status === 429) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'The message could not be sent. Please check the form and try again.');
        return;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = (await response.json()) as { ok?: boolean; delivery?: Delivery };
      if (!data.ok) throw new Error('The message service rejected the message.');
      setDelivery(data.delivery === 'emailed' ? 'emailed' : 'stored');
      setPhase('sent');
    } catch {
      // The message service could not be reached. Compose an email in the
      // visitor's own mail application rather than discarding what they wrote.
      window.location.href = mailtoHref(form);
      setPhase('fallback');
    } finally {
      clearTimeout(timer);
      setSending(false);
    }
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
          <h1 className="cc-h1 mt-4">{LEGAL.contact.heading}</h1>
          <p className="cc-lead mt-3 max-w-2xl" data-testid="contact-statement">
            {LEGAL.contact.paragraphs[0]}
          </p>
          <p className="mt-3 max-w-2xl text-[0.9rem] leading-6.5 text-[hsl(var(--ink-2))]" data-testid="contact-phone-statement">
            {LEGAL.contact.paragraphs[1]}
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-9 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 max-w-2xl">
            {phase === 'sent' ? (
              <div className="cc-card p-6" data-testid="contact-submitted">
                <div className="flex items-center gap-2 text-[hsl(var(--teal))]">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span className="cc-eyebrow">Message sent</span>
                </div>
                <h2 className="cc-h2 mt-2">Thank you, your message is on its way</h2>
                <p className="mt-2.5 text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
                  {delivery === 'emailed'
                    ? 'Your message has been emailed to Eric Sullivan and kept in the site’s private message log, so it will not be lost. Replies go to the email address you entered.'
                    : 'Your message has been received and kept in the site’s private message log. The email notification to Eric is on its way; if it cannot be delivered, the message is still there and will be read.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={CONTACT.phoneHref} data-phone-placement="contact-confirmation" className="cc-btn cc-btn-primary">
                    <Phone size={15} aria-hidden="true" />
                    Call {CONTACT.phoneDisplay}
                  </a>
                  <button type="button" onClick={reset} className="cc-btn cc-btn-outline">
                    Write another message
                  </button>
                </div>
              </div>
            ) : phase === 'fallback' ? (
              <div className="cc-card p-6" data-testid="contact-fallback">
                <div className="flex items-center gap-2 text-[hsl(var(--teal))]">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span className="cc-eyebrow">Message prepared</span>
                </div>
                <h2 className="cc-h2 mt-2">Your email application should have opened</h2>
                <p className="mt-2.5 text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
                  The message service could not be reached just now, so the details you entered were
                  composed into an email in your own mail application instead. Send it from there. If
                  nothing opened, the fastest route is a direct call.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={CONTACT.phoneHref} data-phone-placement="contact-confirmation" className="cc-btn cc-btn-primary">
                    <Phone size={15} aria-hidden="true" />
                    Call {CONTACT.phoneDisplay}
                  </a>
                  <button type="button" onClick={reset} className="cc-btn cc-btn-outline">
                    Write another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(event) => void onSubmit(event)} noValidate data-testid="contact-form">
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

                  {/* Honeypot: off screen, skipped by keyboard and screen readers, filled only by bots. */}
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={set('website')}
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="mt-4 text-[0.86rem] font-medium text-[hsl(var(--destructive))]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="cc-btn cc-btn-primary mt-6"
                  disabled={sending}
                  aria-busy={sending}
                  data-testid="button-submit-contact"
                >
                  <Mail size={15} aria-hidden="true" />
                  {sending ? 'Sending…' : 'Send message'}
                </button>

                <p className="mt-3 text-[0.78rem] leading-5 text-[hsl(var(--ink-2))]">
                  Your message is emailed to Eric Sullivan and kept in a private message log so it is not
                  lost. Only what you type here is stored, and it is used only to reply to you. See the{' '}
                  <Link href="/privacy" className="cc-link">
                    privacy notice
                  </Link>
                  .
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
                title={LEGAL.phoneLabel}
                aria-label={`${LEGAL.phoneLabel}, call ${CONTACT.phoneDisplay}`}
              >
                <Phone size={18} aria-hidden="true" />
                <span>
                  <span className="block text-[0.68rem] uppercase tracking-wider text-white/65">
                    {LEGAL.contact.phoneLabel}
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
              {LEGAL.contact.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-[0.82rem] leading-6 text-[hsl(var(--ink-2))]">
                  {paragraph}
                </p>
              ))}
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
