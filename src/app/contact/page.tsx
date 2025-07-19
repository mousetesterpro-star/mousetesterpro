"use client";

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('contact_messages').insert([
      { name: form.name, email: form.email, message: form.message }
    ]);
    if (!error) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } else {
      alert('There was an error submitting your message. Please try again.');
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
                className="w-full bg-[#23272e] text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#23272e] text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-[#23272e] text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:shadow transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
} 