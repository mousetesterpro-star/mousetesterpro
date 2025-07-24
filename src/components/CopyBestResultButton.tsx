"use client";
import React, { useState } from 'react';

interface CopyBestResultButtonProps {
    bestResult: {
        latency: number;
        polling: number;
        jitter: number;
    } | null;
}

const CopyBestResultButton = ({ bestResult }: CopyBestResultButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!bestResult) return;
        const url = `${window.location.origin}/?latency=${bestResult.latency}&polling=${bestResult.polling}&jitter=${bestResult.jitter}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            disabled={!bestResult}
            className="w-full bg-white text-black font-bold px-4 py-2 rounded-lg hover:shadow transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] disabled:opacity-50"
        >
            {copied ? 'Link Copied!' : 'Copy Best Result Link'}
        </button>
    );
};

export default React.memo(CopyBestResultButton); 