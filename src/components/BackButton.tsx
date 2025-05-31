'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleBack}
      className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Pokemon Directory
    </button>
  );
}
