"use client";

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

// Input validation and sanitization
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

const validateMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 1000;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: sanitizeInput(value) });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!validateName(form.name)) {
      newErrors.name = 'Name must be between 2 and 50 characters';
    }

    if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateMessage(form.message)) {
      newErrors.message = 'Message must be between 10 and 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('contact_messages').insert([
        { 
          name: sanitizeInput(form.name), 
          email: sanitizeInput(form.email), 
          message: sanitizeInput(form.message),
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error('Contact form error:', error);
        setErrors({ submit: 'There was an error submitting your message. Please try again.' });
      } else {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ submit: 'There was an error submitting your message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Contact & Feedback</h1>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
        {submitted ? (
          <div className="text-green-400 text-center font-semibold">Thank you for your feedback!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`w-full bg-[#23272e] text-white rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-[#60A5FA] ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
                required
                maxLength={50}
                disabled={loading}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full bg-[#23272e] text-white rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-[#60A5FA] ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                required
                maxLength={100}
                disabled={loading}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`w-full bg-[#23272e] text-white rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-[#60A5FA] ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                }`}
                rows={4}
                required
                maxLength={1000}
                disabled={loading}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>
            {errors.submit && <p className="text-red-400 text-sm">{errors.submit}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:shadow transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
} 