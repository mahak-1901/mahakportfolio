import { Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { resumeLikeOutline, resumeLikeOutlineDisabled, buttonHoverOnAccentFill } from '../resumeLikeOutline';

const CONTACT_EMAIL = 'mahakkhandelwal1901@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name}`
        })
      });
      const data = (await res.json()) as { success?: string; message?: string };
      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      setSubmitStatus('idle');
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Based in Jaipur
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Get in touch! I'm always excited to discuss new opportunities, projects, or just connect with fellow creatives.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Feel free to reach out for collaborations or just a friendly chat about design, creativity, and innovation.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/mahak-khandelwal-94a756362/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${resumeLikeOutline} ${buttonHoverOnAccentFill} flex items-center space-x-3 bg-[#ff2d2d] px-6 py-3 rounded-md font-medium group w-fit`}
              >
                <Linkedin className="text-white" size={20} />
                <span className="text-white font-semibold">View LinkedIn</span>
              </a>

              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${resumeLikeOutline} ${buttonHoverOnAccentFill} flex items-center space-x-3 bg-[#ff2d2d] px-6 py-3 rounded-md font-medium group w-fit`}
              >
                <Mail className="text-white" size={20} />
                <span className="text-white font-semibold">Email Me</span>
              </a>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-[#ff2d2d] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-[#ff2d2d] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-[#ff2d2d] focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm text-center" role="status">
                  Thank you! Your message was sent — I&apos;ll get back to you soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center" role="alert">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className={`${resumeLikeOutline} ${resumeLikeOutlineDisabled} ${buttonHoverOnAccentFill} w-full bg-[#ff2d2d] text-white px-8 py-3 rounded-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 disabled:hover:bg-[#ff2d2d]`}
              >
                {submitStatus === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-500">
          © 2024 Mahak Khandelwal. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
