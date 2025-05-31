'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

interface SearchWrapperProps {
  initialSearchTerm: string;
}

export default function SearchWrapper({ initialSearchTerm }: SearchWrapperProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (value.length === 0) {
      // Clear search - go back to main page
      router.push('/');
    } else if (value.length >= 3) {
      setIsSearching(true);
      // Update URL with search parameter
      const params = new URLSearchParams();
      params.set('search', value);
      router.push(`/?${params.toString()}`);
      // Reset searching state after a short delay to show the loading indicator
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  return (
    <SearchBar
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      isSearching={isSearching}
    />
  );
}
