
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="relative py-24 bg-primary text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L100 100M100 0L0 100"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join Our Community of Explorers
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Sign up to add your own discoveries, create custom trip itineraries, and receive our weekly digest of the world's most wondrous places and things.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent min-w-0 flex-grow sm:max-w-xs"
            />
            <Button className="bg-accent hover:bg-accent/90 rounded-full px-8">
              Join Now
            </Button>
          </div>
          
          <p className="mt-4 text-sm opacity-80">
            Already a member? <a href="#" className="underline hover:text-white/100">Sign in</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
