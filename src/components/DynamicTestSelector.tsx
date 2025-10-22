"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BasicMouseTest from './BasicMouseTest';
import ClickLatencyCard from './ClickLatencyCard';
import PollingRateCard from './PollingRateCard';
import JitterAnalysisCard from './JitterAnalysisCard';
import PerformanceComparison from './PerformanceComparison';

interface TestConfig {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  priority: number;
}

interface TestCategory {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  tests: TestConfig[];
}

const testCategories: TestCategory[] = [
  {
    id: 'latency',
    name: 'Mouse Latency Tests',
    description: 'Measure click response time and input delay',
    keywords: ['latency', 'delay', 'response time', 'input lag', 'click delay', 'ms test'],
    tests: [
      {
        id: 'basic-latency',
        name: 'Basic Click Latency Test',
        description: 'Quick test to measure mouse click response time',
        component: BasicMouseTest,
        priority: 1
      },
      {
        id: 'advanced-latency',
        name: 'Advanced Latency Analysis',
        description: 'Comprehensive latency measurement with detailed analysis',
        component: ClickLatencyCard,
        priority: 2
      }
    ]
  },
  {
    id: 'polling',
    name: 'Polling Rate Tests',
    description: 'Test mouse polling frequency and Hz rate',
    keywords: ['polling', 'hz', 'rate', 'frequency', 'polling rate', 'mouse rate'],
    tests: [
      {
        id: 'polling-rate',
        name: 'Polling Rate Measurement',
        description: 'Measure your mouse polling rate in Hz',
        component: PollingRateCard,
        priority: 1
      },
      {
        id: 'rate-checker',
        name: 'Rate Checker Tool',
        description: 'Advanced polling rate analysis',
        component: PollingRateCard,
        priority: 2
      }
    ]
  },
  {
    id: 'jitter',
    name: 'Jitter & Stability Tests',
    description: 'Test mouse movement consistency and jitter',
    keywords: ['jitter', 'stability', 'consistency', 'smoothness', 'stutter'],
    tests: [
      {
        id: 'jitter-analysis',
        name: 'Jitter Analysis',
        description: 'Measure mouse movement consistency and jitter',
        component: JitterAnalysisCard,
        priority: 1
      },
      {
        id: 'stability-test',
        name: 'Stability Test',
        description: 'Test mouse tracking stability',
        component: JitterAnalysisCard,
        priority: 2
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming Performance Tests',
    description: 'Comprehensive gaming mouse performance analysis',
    keywords: ['gaming', 'competitive', 'fps', 'esports', 'performance'],
    tests: [
      {
        id: 'gaming-suite',
        name: 'Gaming Performance Suite',
        description: 'Complete gaming mouse analysis',
        component: PerformanceComparison,
        priority: 1
      },
      {
        id: 'competitive-test',
        name: 'Competitive Gaming Test',
        description: 'Test optimized for competitive gaming',
        component: PerformanceComparison,
        priority: 2
      }
    ]
  },
  {
    id: 'wireless',
    name: 'Wireless Mouse Tests',
    description: 'Specialized tests for wireless mouse performance',
    keywords: ['wireless', 'bluetooth', 'rf', 'battery'],
    tests: [
      {
        id: 'wireless-latency',
        name: 'Wireless Latency Test',
        description: 'Test wireless mouse input delay',
        component: BasicMouseTest,
        priority: 1
      },
      {
        id: 'battery-impact',
        name: 'Battery Impact Analysis',
        description: 'Test how battery level affects performance',
        component: BasicMouseTest,
        priority: 2
      }
    ]
  }
];

export default function DynamicTestSelector() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('latency');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTest, setSelectedTest] = useState<TestConfig | null>(null);

  useEffect(() => {
    // Get search query from URL parameters or detect from page
    const query = searchParams.get('q') || searchParams.get('query') || '';
    setSearchQuery(query);

    // Determine best category based on search query
    if (query) {
      const bestCategory = findBestCategory(query.toLowerCase());
      setSelectedCategory(bestCategory);
    }
  }, [searchParams]);

  const findBestCategory = (query: string): string => {
    let bestMatch = 'latency';
    let maxMatches = 0;

    testCategories.forEach(category => {
      const matches = category.keywords.filter(keyword => 
        query.includes(keyword)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = category.id;
      }
    });

    return bestMatch;
  };

  const selectedCategoryData = testCategories.find(cat => cat.id === selectedCategory);

  const handleTestSelect = (test: TestConfig) => {
    setSelectedTest(test);
  };

  const handleBackToSelection = () => {
    setSelectedTest(null);
  };

  // If a test is selected, render the test component
  if (selectedTest) {
    const TestComponent = selectedTest.component;
    return (
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <div className="mb-6">
          <button
            onClick={handleBackToSelection}
            className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
          >
            ← Back to Test Selection
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">{selectedTest.name}</h2>
          <p className="text-gray-300">{selectedTest.description}</p>
        </div>
        <TestComponent />
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {searchQuery ? `Tests for "${searchQuery}"` : 'Select Test Type'}
        </h2>
        <p className="text-gray-300">
          {searchQuery 
            ? `Based on your search, here are the most relevant tests for mouse ${selectedCategoryData?.name.toLowerCase()}.`
            : 'Choose the type of mouse test you want to perform.'
          }
        </p>
      </div>

      {/* Category Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {testCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category.id
                  ? 'bg-[#60A5FA] text-black'
                  : 'bg-[#23272e] text-gray-300 hover:bg-[#2a2f3a] hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Info */}
      {selectedCategoryData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            {selectedCategoryData.name}
          </h3>
          <p className="text-gray-300 mb-4">
            {selectedCategoryData.description}
          </p>

          {/* Available Tests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategoryData.tests.map((test) => (
              <div
                key={test.id}
                className="bg-[#23272e] rounded-lg p-4 border border-[#2a2f3a] hover:border-[#60A5FA] transition"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {test.name}
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  {test.description}
                </p>
                <button 
                  onClick={() => handleTestSelect(test)}
                  className="bg-[#60A5FA] text-black font-medium px-4 py-2 rounded-lg hover:bg-[#4090e6] transition"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search-based Recommendations */}
      {searchQuery && (
        <div className="mt-6 p-4 bg-[#23272e] rounded-lg">
          <h4 className="text-white font-semibold mb-2">Search-based Recommendations</h4>
          <p className="text-gray-300 text-sm">
            Based on your search for "{searchQuery}", we recommend starting with the {selectedCategoryData?.name.toLowerCase()} tests above. 
            These tests are specifically designed to measure the performance aspects you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
