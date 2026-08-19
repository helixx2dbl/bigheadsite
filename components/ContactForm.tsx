"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/contact";

// Static site, no backend, so the form composes a pre-filled email and opens
// the visitor's mail app addressed to us. The address is shown alongside for
// anyone who'd rather write to us directly.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject || `Message from ${name || "a BigHead fan"}`)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 font-semibold text-ink outline-none transition-colors focus:border-teal";
  const labelClass = "mb-1.5 block text-sm font-extrabold text-ink";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="What's up?"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Tell us what you need: order questions, bulk requests, a photo that's giving you trouble…"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-berry px-8 py-3.5 text-base font-black text-cream shadow-lg transition-transform hover:scale-[1.02] hover:bg-berry-deep"
      >
        Send message
      </button>

      {sent && (
        <p className="text-center text-sm font-semibold text-teal-deep">
          Your email app should have opened with the message ready to send. If it didn&rsquo;t, email us
          directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-extrabold text-berry underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
