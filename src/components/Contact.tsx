import { useState, FormEvent } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Replace with your form submission logic (e.g. EmailJS, Formspree)
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 bg-gray-950 text-white px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact</h2>
        <p className="text-gray-400 text-center mb-8">
          Have a project in mind? Let's talk.
        </p>
        <div className="text-center text-gray-300 space-y-2 mb-10">
          <p>
            <a
              href="mailto:evansbenyeogor@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              evansbenyeogor@gmail.com
            </a>
          </p>
          <p>
            <a
              href="tel:+16825647737"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              1 (682) 564-7737
            </a>
          </p>
          <p>Aubrey, TX 76227</p>
        </div>
        {sent ? (
          <p className="text-center text-indigo-400 text-lg">
            Thanks! I'll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              placeholder="Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
