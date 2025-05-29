'use client';

import { useState, useEffect, useCallback } from 'react';
import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';

const POKEMON_PER_PAGE = 20;

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const fetchInitialPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=0`
      );
      const data: PokemonListResponse = await response.json();
      
      setTotalCount(data.count);
      setHasMore(data.next !== null);

      // Fetch detailed data for each Pokemon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detail: PokemonDetails = await detailResponse.json();
          return detail;
        })
      );

      // Sort by ID to ensure proper order
      pokemonDetails.sort((a, b) => a.id - b.id);
      setPokemonList(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const offset = pokemonList.length;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`
      );
      const data: PokemonListResponse = await response.json();
      
      setHasMore(data.next !== null);

      // Fetch detailed data for each Pokemon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detail: PokemonDetails = await detailResponse.json();
          return detail;
        })
      );

      // Sort by ID to ensure proper order
      pokemonDetails.sort((a, b) => a.id - b.id);
      setPokemonList(prev => [...prev, ...pokemonDetails]);
    } catch (error) {
      console.error('Error fetching more Pokemon:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, pokemonList.length]);

  const searchPokemon = useCallback(async (query: string) => {
    if (query.length < 3) {
      setIsSearchMode(false);
      setFilteredPokemon([]);
      return;
    }

    setSearching(true);
    setIsSearchMode(true);
    
    try {
      // First try exact match
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (response.ok) {
          const pokemon: PokemonDetails = await response.json();
          setFilteredPokemon([pokemon]);
          setSearching(false);
          return;
        }
      } catch {
        // Continue to broader search if exact match fails
      }

      // Get all Pokemon species to search through names
      const speciesResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=10000');
      const speciesData = await speciesResponse.json();
      
      // Filter species by name match
      const matchingSpecies = speciesData.results.filter((species: { name: string }) => 
        species.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20); // Limit to first 20 matches for performance

      // Fetch detailed data for matching Pokemon
      const pokemonDetails = await Promise.all(
        matchingSpecies.map(async (species: { name: string }) => {
          try {
            const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`);
            if (detailResponse.ok) {
              const detail: PokemonDetails = await detailResponse.json();
              return detail;
            }
            return null;
          } catch {
            return null;
          }
        })
      );

      // Filter out null results and sort by ID
      const validPokemon = pokemonDetails.filter(pokemon => pokemon !== null) as PokemonDetails[];
      validPokemon.sort((a, b) => a.id - b.id);
      
      setFilteredPokemon(validPokemon);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      setFilteredPokemon([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length === 0) {
      setIsSearchMode(false);
      setFilteredPokemon([]);
    } else if (value.length >= 3) {
      searchPokemon(value);
    }
  };

  // Initial load
  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  // Scroll event listener (only active when not in search mode)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Pokemon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pokemon Directory</h1>
          <p className="text-gray-600">
            {isSearchMode 
              ? `Found ${filteredPokemon.length} Pokemon matching "${searchTerm}"`
              : `Showing ${pokemonList.length} of ${totalCount} Pokemon`
            }
          </p>
        </header>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          isSearching={searching}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {(isSearchMode ? filteredPokemon : pokemonList).map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        {isSearchMode && filteredPokemon.length === 0 && searchTerm.length >= 3 && !searching && (
          <div className="text-center mt-8">
            <p className="text-gray-600">No Pokemon found matching "{searchTerm}". Try a different search term.</p>
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
      </div>
    </div>
  );
}
