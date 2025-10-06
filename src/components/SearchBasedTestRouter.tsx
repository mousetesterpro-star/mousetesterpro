"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BasicMouseTest from './BasicMouseTest';
import PollingRateCard from './PollingRateCard';
import ClickLatencyCard from './ClickLatencyCard';
import JitterAnalysisCard from './JitterAnalysisCard';
import PerformanceComparison from './PerformanceComparison';

interface TestConfig {
  component: React.ComponentType;
  title: string;
  description: string;
  priority: number;
}

const testMappings: Record<string, TestConfig[]> = {
  // Latency-related searches
  'latency': [
    { component: BasicMouseTest, title: 'Click Latency Test', description: 'Measure mouse click response time', priority: 1 },
    { component: ClickLatencyCard, title: 'Advanced Latency Analysis', description: 'Detailed latency measurement', priority: 2 }
  ],
  'delay': [
    { component: BasicMouseTest, title: 'Input Delay Test', description: 'Test mouse input delay', priority: 1 },
    { component: ClickLatencyCard, title: 'Delay Analysis', description: 'Comprehensive delay measurement', priority: 2 }
  ],
  'response time': [
    { component: BasicMouseTest, title: 'Response Time Test', description: 'Measure mouse response time', priority: 1 },
    { component: ClickLatencyCard, title: 'Response Analysis', description: 'Detailed response time analysis', priority: 2 }
  ],
  'input lag': [
    { component: BasicMouseTest, title: 'Input Lag Test', description: 'Test mouse input lag', priority: 1 },
    { component: ClickLatencyCard, title: 'Lag Analysis', description: 'Comprehensive input lag analysis', priority: 2 }
  ],
  'click delay': [
    { component: BasicMouseTest, title: 'Click Delay Test', description: 'Measure click delay specifically', priority: 1 },
    { component: ClickLatencyCard, title: 'Click Analysis', description: 'Detailed click delay analysis', priority: 2 }
  ],

  // Polling rate searches
  'polling': [
    { component: PollingRateCard, title: 'Polling Rate Test', description: 'Measure mouse polling rate', priority: 1 },
    { component: BasicMouseTest, title: 'Rate Analysis', description: 'Comprehensive rate testing', priority: 2 }
  ],
  'hz': [
    { component: PollingRateCard, title: 'Hz Rate Test', description: 'Test mouse Hz rate', priority: 1 },
    { component: BasicMouseTest, title: 'Frequency Analysis', description: 'Detailed frequency analysis', priority: 2 }
  ],
  'rate': [
    { component: PollingRateCard, title: 'Mouse Rate Test', description: 'Test mouse rate performance', priority: 1 },
    { component: BasicMouseTest, title: 'Rate Performance', description: 'Comprehensive rate testing', priority: 2 }
  ],

  // Jitter searches
  'jitter': [
    { component: JitterAnalysisCard, title: 'Jitter Test', description: 'Measure mouse jitter', priority: 1 },
    { component: BasicMouseTest, title: 'Jitter Analysis', description: 'Comprehensive jitter analysis', priority: 2 }
  ],
  'stability': [
    { component: JitterAnalysisCard, title: 'Stability Test', description: 'Test mouse stability', priority: 1 },
    { component: BasicMouseTest, title: 'Stability Analysis', description: 'Detailed stability analysis', priority: 2 }
  ],
  'smoothness': [
    { component: JitterAnalysisCard, title: 'Smoothness Test', description: 'Test mouse smoothness', priority: 1 },
    { component: BasicMouseTest, title: 'Smoothness Analysis', description: 'Comprehensive smoothness analysis', priority: 2 }
  ],

  // Gaming searches
  'gaming': [
    { component: PerformanceComparison, title: 'Gaming Performance Test', description: 'Comprehensive gaming mouse test', priority: 1 },
    { component: BasicMouseTest, title: 'Gaming Analysis', description: 'Gaming-focused mouse analysis', priority: 2 }
  ],
  'competitive': [
    { component: PerformanceComparison, title: 'Competitive Gaming Test', description: 'Test for competitive gaming', priority: 1 },
    { component: BasicMouseTest, title: 'Competitive Analysis', description: 'Competitive gaming analysis', priority: 2 }
  ],
  'fps': [
    { component: PerformanceComparison, title: 'FPS Gaming Test', description: 'Test optimized for FPS gaming', priority: 1 },
    { component: BasicMouseTest, title: 'FPS Analysis', description: 'FPS gaming mouse analysis', priority: 2 }
  ],

  // Wireless searches
  'wireless': [
    { component: BasicMouseTest, title: 'Wireless Mouse Test', description: 'Test wireless mouse performance', priority: 1 },
    { component: PerformanceComparison, title: 'Wireless Analysis', description: 'Wireless mouse analysis', priority: 2 }
  ],
  'bluetooth': [
    { component: BasicMouseTest, title: 'Bluetooth Mouse Test', description: 'Test Bluetooth mouse performance', priority: 1 },
    { component: PerformanceComparison, title: 'Bluetooth Analysis', description: 'Bluetooth mouse analysis', priority: 2 }
  ]
};

export default function SearchBasedTestRouter() {
  const searchParams = useSearchParams();
  const [detectedTests, setDetectedTests] = useState<TestConfig[]>([]);
  const [searchContext, setSearchContext] = useState<string>('');

  useEffect(() => {
    // Get search query from URL parameters
    const query = searchParams.get('q') || searchParams.get('query') || searchParams.get('test') || '';
    const latency = searchParams.get('latency');
    const polling = searchParams.get('polling');
    const jitter = searchParams.get('jitter');

    if (query) {
      setSearchContext(query);
      const tests = findRelevantTests(query.toLowerCase());
      setDetectedTests(tests);
    } else if (latency || polling || jitter) {
      // Direct parameter access
      setSearchContext('Direct test parameters');
      const tests = [];
      if (latency) tests.push(...testMappings['latency'] || []);
      if (polling) tests.push(...testMappings['polling'] || []);
      if (jitter) tests.push(...testMappings['jitter'] || []);
      setDetectedTests(tests.slice(0, 2)); // Limit to 2 most relevant
    } else {
      // Default to basic test
      setDetectedTests([testMappings['latency'][0]]);
    }
  }, [searchParams]);

  const findRelevantTests = (query: string): TestConfig[] => {
    const matchedTests: TestConfig[] = [];
    
    // Check for exact matches first
    Object.entries(testMappings).forEach(([keyword, tests]) => {
      if (query.includes(keyword)) {
        matchedTests.push(...tests);
      }
    });

    // If no exact matches, try partial matches
    if (matchedTests.length === 0) {
      Object.entries(testMappings).forEach(([keyword, tests]) => {
        if (keyword.includes(query) || query.includes(keyword)) {
          matchedTests.push(...tests);
        }
      });
    }

    // Sort by priority and return top 2
    return matchedTests
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 2);
  };

  if (detectedTests.length === 0) {
    return (
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Mouse Performance Test</h2>
        <BasicMouseTest />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Context Header */}
      {searchContext && (
        <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {searchContext === 'Direct test parameters' 
              ? 'Mouse Performance Analysis' 
              : `Tests for "${searchContext}"`
            }
          </h2>
          <p className="text-gray-300">
            {searchContext === 'Direct test parameters'
              ? 'Comprehensive mouse performance analysis based on your parameters.'
              : `Based on your search, here are the most relevant mouse tests.`
            }
          </p>
        </div>
      )}

      {/* Dynamic Test Components */}
      {detectedTests.map((test, index) => {
        const TestComponent = test.component;
        return (
          <div key={index} className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-2">{test.title}</h3>
              <p className="text-gray-300">{test.description}</p>
            </div>
            <TestComponent />
          </div>
        );
      })}
    </div>
  );
}
