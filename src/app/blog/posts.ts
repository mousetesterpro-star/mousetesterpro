// Blog posts data for the dynamic [slug] route.
// Only include posts that DON'T have their own dedicated page directory.
// Posts with dedicated pages (e.g., /blog/welcome-to-mousetester-pro/page.tsx)
// are handled by their own route and don't need entries here.
export const posts = [
  {
    slug: 'welcome-to-mousetester-pro',
    title: 'Welcome to MouseTester Pro!',
    date: '2024-07-19',
    summary: 'We\'re excited to launch our new mouse performance dashboard. Test your latency, polling rate, and jitter with pro-grade tools.'
  },
  {
    slug: 'new-feature-shareable-results',
    title: 'New Feature: Shareable Results',
    date: '2024-07-18',
    summary: 'You can now share your test results with friends or on social media. Just click "Copy Link" in your history or comparison cards!'
  },
  {
    slug: 'guides-faq-now-live',
    title: 'Guides & FAQ Now Live',
    date: '2024-07-17',
    summary: 'Check out our new educational section for tips on optimizing your mouse and understanding performance metrics.'
  }
];