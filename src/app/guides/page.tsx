import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/guides' },
  title: 'Mouse Performance Guides — Latency, Polling Rate & Optimization | MouseTester Pro',
  description: 'In-depth guides on mouse latency, polling rate, jitter, and setup optimization. Learn what your test results mean and how to improve your gaming mouse performance.',
  openGraph: {
    title: 'Mouse Performance Guides — Latency, Polling Rate & Optimization',
    description: 'Practical guides covering mouse latency, polling rate, jitter, and step-by-step optimization for Windows and macOS.',
    url: 'https://mousetesterpro.com/guides',
    siteName: 'Mouse Tester Pro',
    type: 'website',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Optimize Your Mouse for Gaming",
  "description": "A step-by-step guide to understanding and reducing mouse latency on Windows and macOS.",
  "step": [
    { "@type": "HowToStep", "text": "Check and set your mouse polling rate to 1000Hz in your mouse software." },
    { "@type": "HowToStep", "text": "Plug your mouse directly into a rear motherboard USB port, bypassing any hubs." },
    { "@type": "HowToStep", "text": "Disable 'Enhance pointer precision' in Windows mouse settings." },
    { "@type": "HowToStep", "text": "Set your Windows power plan to High Performance and disable USB Selective Suspend." },
    { "@type": "HowToStep", "text": "Install the latest drivers and firmware from your mouse manufacturer's website." },
    { "@type": "HowToStep", "text": "Enable Windows Game Mode in Settings → Gaming → Game Mode." }
  ]
};

export default function GuidesPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Mouse Performance Guides</h1>
      <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
        Practical, honest explanations of mouse latency, polling rate, and jitter — plus a step-by-step optimization checklist for getting the most out of your setup.
      </p>

      {/* Guide 1: Mouse Latency */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Understanding Mouse Latency</h2>
        <p className="text-base text-gray-300 mb-4">
          Mouse latency is the total time between your physical click and the moment the action registers on your computer. It&apos;s not just one number from one component — it&apos;s the sum of several different delays stacked on top of each other.
        </p>
        <p className="text-base text-gray-300 mb-4">
          The chain goes like this: your finger presses the switch → the switch actuates and bounces (the firmware debounches it, adding 1–8ms) → the mouse sends the event via USB at the next polling interval → the OS receives and processes the interrupt → the application gets the event and responds. Every step adds time.
        </p>
        <p className="text-base text-gray-300 mb-4">
          For perspective: at 60fps, a single frame lasts 16.7ms. If your click latency is 12ms, you&apos;re consuming the majority of a frame&apos;s worth of time just in the click-to-action chain, before the game even begins rendering the result. Gaming mice reduce this by optimizing each step — faster switches, consistent polling, efficient firmware.
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li><span className="text-[#60A5FA] font-semibold">1–5ms:</span> Excellent — high-end gaming mice, well-optimized system</li>
          <li><span className="text-[#60A5FA] font-semibold">5–10ms:</span> Good — where most quality gaming mice land</li>
          <li><span className="text-[#60A5FA] font-semibold">10–20ms:</span> Acceptable — standard mice or suboptimal settings</li>
          <li><span className="text-[#60A5FA] font-semibold">20ms+:</span> Worth investigating — hardware or driver issue likely</li>
        </ul>
      </div>

      {/* Guide 2: Polling Rate */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Polling Rate — What It Actually Means</h2>
        <p className="text-base text-gray-300 mb-4">
          Polling rate is how often your mouse reports its position to your computer, measured in Hertz. 1000Hz means 1000 position updates per second — one every millisecond. 125Hz means one every 8ms.
        </p>
        <p className="text-base text-gray-300 mb-4">
          The practical implication: a lower polling rate means the mouse can only &quot;check in&quot; less frequently. If you make a fast flick movement between two polling intervals, that movement gets interpolated rather than precisely captured. At 1000Hz with 1ms intervals, this is barely noticeable. At 125Hz with 8ms intervals, fast movements can feel slightly spongy.
        </p>
        <p className="text-base text-gray-300 mb-4">
          What about 8000Hz mice? Technically more accurate, but the practical benefit is minimal for most people. The gap from 125Hz to 1000Hz is massive. The gap from 1000Hz to 8000Hz is much smaller, and comes with a slight CPU overhead. For the vast majority of gaming situations, 1000Hz is the optimal balance.
        </p>
        <p className="text-base text-gray-300">
          To check your current polling rate: open your mouse manufacturer software (Logitech G Hub, Razer Synapse, SteelSeries GG, etc.) and look for the polling rate setting. If it&apos;s not at 1000Hz, change it. That&apos;s a free upgrade.
        </p>
      </div>

      {/* Guide 3: Jitter */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Jitter — The Hidden Performance Killer</h2>
        <p className="text-base text-gray-300 mb-4">
          Jitter is the inconsistency in your mouse&apos;s polling timing. Even at 1000Hz, the actual intervals between updates won&apos;t be a perfect 1.000ms every time — they&apos;ll vary by small amounts. That variation is jitter.
        </p>
        <p className="text-base text-gray-300 mb-4">
          Why is this a problem? Your muscle memory is built on predictable, consistent feedback. When you practice a flick shot hundreds of times, your brain learns the timing based on reliable input behavior. High jitter means the input response is sometimes slightly early, sometimes slightly late in ways you can&apos;t consciously track. Your aim feels inconsistent even when your execution is good, because the goalposts keep moving.
        </p>
        <p className="text-base text-gray-300 mb-4">
          Jitter below 0.5ms is excellent. Below 1ms is fine for almost everyone. Above 2ms can cause noticeable aim inconsistency in competitive gaming. Common causes of high jitter: USB hubs in the connection chain, wireless interference, poor USB controller on older motherboards, and outdated drivers.
        </p>
        <p className="text-base text-gray-300">
          If your jitter is high: try a different USB port (directly on the motherboard rear panel), remove any USB hubs, update your drivers, and if wireless — move the receiver closer to the mouse using a USB extension cable.
        </p>
      </div>

      {/* Guide 4: Optimization Checklist */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Step-by-Step Optimization Checklist</h2>
        <p className="text-base text-gray-300 mb-4">
          Work through these in order. The first few are free and have the most consistent impact. Later steps have diminishing returns but matter at higher competitive levels.
        </p>

        <h3 className="text-lg font-semibold text-[#60A5FA] mb-3">Hardware Setup</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-5">
          <li>Plug mouse directly into a rear motherboard USB port — skip front panels and hubs</li>
          <li>Use a USB 3.0 port if available; less bandwidth contention than USB 2.0</li>
          <li>For wireless: use a USB extension cable to bring the receiver within 30cm of your mousepad</li>
          <li>Use a consistent, non-reflective mousepad — glossy or glass surfaces confuse optical sensors</li>
        </ul>

        <h3 className="text-lg font-semibold text-[#60A5FA] mb-3">Mouse Software Settings</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-5">
          <li>Set polling rate to 1000Hz in your mouse manufacturer software</li>
          <li>Update to latest firmware — manufacturers regularly improve debounce and polling consistency</li>
          <li>Disable any &quot;smoothing&quot; or &quot;acceleration&quot; options in mouse software</li>
        </ul>

        <h3 className="text-lg font-semibold text-[#60A5FA] mb-3">Windows Settings</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-5">
          <li>Disable &quot;Enhance pointer precision&quot; — Control Panel → Mouse → Pointer Options</li>
          <li>Set power plan to High Performance — Control Panel → Power Options</li>
          <li>Disable USB Selective Suspend — Power Options → Advanced → USB Settings</li>
          <li>Enable Game Mode — Settings → Gaming → Game Mode</li>
          <li>Set your game&apos;s GPU preference to High Performance in Graphics Settings</li>
        </ul>

        <h3 className="text-lg font-semibold text-[#60A5FA] mb-3">macOS Settings</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Disable mouse acceleration: run <code className="text-blue-300 bg-[#23272e] px-1 rounded text-sm">defaults write .GlobalPreferences com.apple.mouse.scaling -1</code> in Terminal</li>
          <li>Use manufacturer software if available, otherwise the built-in System Settings → Mouse is fine</li>
          <li>Keep macOS and USB drivers updated</li>
        </ul>
      </div>

      {/* FAQ Teaser */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Common Questions</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What is a good latency for gaming?</h3>
          <p className="text-gray-300 mt-1">Under 10ms is competitive-ready. Under 5ms is excellent. The more important factor is consistency — a steady 8ms is better than an average of 6ms with spikes to 30ms.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">Does polling rate really matter?</h3>
          <p className="text-gray-300 mt-1">Yes, but the biggest gain is from 125Hz to 1000Hz. Going higher than 1000Hz gives diminishing returns for most people and adds small CPU overhead. Stick at 1000Hz unless you have a specific reason to go higher.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">Why can&apos;t the site detect my mouse model or DPI?</h3>
          <p className="text-gray-300 mt-1">Browsers don&apos;t expose USB device identity information to web pages for privacy and security reasons. We measure performance metrics, not device identity.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">How do I reduce input lag?</h3>
          <p className="text-gray-300 mt-1">Follow the optimization checklist above. The biggest free wins: plug into a rear motherboard port, set polling rate to 1000Hz, disable USB Selective Suspend, and turn off pointer acceleration.</p>
        </div>

        <div className="mt-6">
          <Link
            href="/faq"
            className="text-[#60A5FA] hover:text-blue-400 font-medium"
          >
            View Full FAQ (12 detailed answers) →
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Test Your Mouse Now
        </Link>
      </div>
    </section>
  );
}