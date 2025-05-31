'use client';

import { useState, useEffect, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import { PokemonDetails } from '@/types/pokemon';

interface PokemonListProps {
  initialPokemon: PokemonDetails[];
  initialTotalCount: number;
  initialHasMore: boolean;
  searchTerm: string;
}

export default function PokemonList({
  initialPokemon,
  initialTotalCount,
  initialHasMore,
  searchTerm
}: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>(initialPokemon);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(searchTerm.length >= 3);

  // Reset state when search term changes
  useEffect(() => {
    if (searchTerm.length >= 3) {
      setIsSearchMode(true);
      handleSearch(searchTerm);
    } else {
      setIsSearchMode(false);
      setFilteredPokemon([]);
      // Reset to initial data when search is cleared
      setPokemonList(initialPokemon);
      setTotalCount(initialTotalCount);
      setHasMore(initialHasMore);
    }
  }, [searchTerm, initialPokemon, initialTotalCount, initialHasMore]);

  const handleSearch = async (query: string) => {
    if (query.length < 3) return;

    setSearching(true);
    try {
      const response = await fetch(`/api/pokemon?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredPokemon(data.pokemon);
      }
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      setFilteredPokemon([]);
    } finally {
      setSearching(false);
    }
  };

  const loadMorePokemon = useCallback(async () => {
    if (loadingMore || !hasMore || isSearchMode) return;

    setLoadingMore(true);
    try {
      const offset = pokemonList.length;
      const response = await fetch(`/api/pokemon?offset=${offset}`);

      if (response.ok) {
        const data = await response.json();
        setPokemonList(prev => [...prev, ...data.pokemon]);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error('Error fetching more Pokemon:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, pokemonList.length, isSearchMode]);

  // Infinite scroll effect
  useEffect(() => {
    if (isSearchMode) return;

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMorePokemon();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePokemon, isSearchMode]);

  const displayedPokemon = isSearchMode ? filteredPokemon : pokemonList;

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pokemon Directory</h1>
        <p className="text-gray-600">
          {isSearchMode
            ? `Found ${filteredPokemon.length} Pokemon matching "${searchTerm}"`
            : `Showing ${pokemonList.length} of ${totalCount} Pokemon`
          }
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {isSearchMode && filteredPokemon.length === 0 && searchTerm.length >= 3 && !searching && (
        <div className="text-center mt-8">
          <p className="text-gray-600">No Pokemon found matching "{searchTerm}". Try a different search term.</p>
        </div>
      )}

      {searching && (
        <div className="text-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      )}

      {!isSearchMode && loadingMore && (
        <div className="text-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading more Pokemon...</p>
        </div>
      )}

      {!isSearchMode && !hasMore && pokemonList.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">You've reached the end! All Pokemon have been loaded.</p>
        </div>
      )}
    </>
  );
}
