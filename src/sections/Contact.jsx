import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Section } from '../components/Section';
import { personalInfo } from '../data/mockData';
import { ArrowUpRight, Loader2, CheckCircle2, XCircle, Mail, Github, Linkedin } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ and sign up for free.
// 2. Create a new Service (connect your Gmail via "Email Services").
// 3. Create an Email Template. In the template body use the variables:
//      {{from_name}}   ← user's name
//      {{from_email}}  ← user's email
//      {{message}}     ← user's message
//    Set the "To Email" to: neyajahmad6585@gmail.com
// 4. Copy your SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY below.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_yas0ygw';   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = 'template_9hn16xx';  // e.g. "template_xyz456"
const EMAILJS_PUBLIC_KEY  = 'bSZAjJvt9kByIY2CR';   // e.g. "ABCDEfghIJKLmno"

export function Contact() {
  const formRef = useRef(null);
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const inputClasses = (name) => `
    w-full bg-transparent border-b outline-none
    py-4 text-background placeholder-background/30 font-light text-lg md:text-xl
    transition-all duration-300
    ${focused === name ? 'border-background' : 'border-background/20'}
  `;

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current.reset();
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <Section id="contact" dark className="pt-32 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">
        
        {/* Left Column — Info */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-6xl md:text-8xl leading-[0.9]">Let's Build<br />Together.</h2>
            <p className="text-background/60 font-light max-w-sm text-lg mt-6">
              I'm always open to discussing product design work, collaboration opportunities, or technical challenges.
            </p>
          </div>

          <div className="mt-20 md:mt-32 flex flex-col gap-8">
            <div>
              <span className="uppercase tracking-widest text-xs font-semibold text-background/40 block mb-3">Email</span>
              <a 
                href={`mailto:${personalInfo.contact.email}`} 
                className="text-xl md:text-2xl hover:text-terracotta transition-colors flex items-center gap-2 group w-max"
              >
                <Mail size={20} className="opacity-60 shrink-0" />
                {personalInfo.contact.email}
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="flex gap-8">
              <a href={`https://${personalInfo.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors flex items-center gap-2 underline underline-offset-4 decoration-background/30">
                <Github size={16} className="opacity-70" />
                GitHub
              </a>
              <a href={`https://${personalInfo.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors flex items-center gap-2 underline underline-offset-4 decoration-background/30">
                <Linkedin size={16} className="opacity-70" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Column — Form */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center"
        >
          <form ref={formRef} className="flex flex-col gap-10" onSubmit={sendEmail}>
            
            {/* Name Field */}
            <div className="relative">
              <input 
                type="text" 
                name="name"
                placeholder="What's your name?" 
                required
                className={inputClasses('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
              <motion.div 
                animate={{ width: focused === 'name' ? '100%' : '0%' }}
                className="absolute bottom-0 left-0 h-[1px] bg-background pointer-events-none"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email id" 
                required
                className={inputClasses('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              <motion.div 
                animate={{ width: focused === 'email' ? '100%' : '0%' }}
                className="absolute bottom-0 left-0 h-[1px] bg-background pointer-events-none"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Message Field */}
            <div className="relative mt-4">
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                rows={4}
                required
                className={`resize-none ${inputClasses('message')}`}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
              <motion.div 
                animate={{ width: focused === 'message' ? '100%' : '0%' }}
                className="absolute bottom-0 left-0 h-[1px] bg-background pointer-events-none"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="group mt-4 relative overflow-hidden py-4 px-8 border border-background/20 rounded-full flex items-center justify-between hover:border-background transition-colors duration-500 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm font-semibold group-hover:text-text transition-colors duration-500 flex items-center gap-2">
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : 'Send Message'}
              </span>
              <motion.div className="absolute inset-0 bg-background origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              <ArrowUpRight size={20} className="relative z-10 group-hover:text-text group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
            </button>

            {/* Status Messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 text-green-400 text-sm font-medium"
                >
                  <CheckCircle2 size={18} />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 text-red-400 text-sm font-medium"
                >
                  <XCircle size={18} />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </motion.div>
      </div>
      
      <div className="mt-32 pt-8 border-t border-background/10 text-center text-sm tracking-widest uppercase font-light text-background/40">
        &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
      </div>
    </Section>
  );
}
