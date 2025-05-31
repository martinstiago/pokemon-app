'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface PokemonNavigationProps {
  currentId: number;
}

interface PokemonInfo {
  id: number;
  name: string;
}

export default function PokemonNavigation({ currentId }: PokemonNavigationProps) {
  const [previousPokemon, setPreviousPokemon] = useState<PokemonInfo | null>(null);
  const [nextPokemon, setNextPokemon] = useState<PokemonInfo | null>(null);

  useEffect(() => {
    const fetchPokemonInfo = async (id: number): Promise<PokemonInfo | null> => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) return null;
        const data = await response.json();
        return { id: data.id, name: data.name };
      } catch {
        return null;
      }
    };

    // Fetch previous Pokemon
    if (currentId > 1) {
      fetchPokemonInfo(currentId - 1).then(setPreviousPokemon);
    }

    // Fetch next Pokemon
    if (currentId < 1010) {
      fetchPokemonInfo(currentId + 1).then(setNextPokemon);
    }
  }, [currentId]);

  return (
    <div className="mt-8 flex justify-between items-center">
      {previousPokemon ? (
        <Link
          href={`/pokemon/${previousPokemon.id}`}
          className="flex items-center px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium text-gray-600">
              #{previousPokemon.id.toString().padStart(3, '0')}
            </span>
            <span className="ml-2 text-sm font-semibold text-gray-800 hidden sm:inline">
              {capitalizeFirstLetter(previousPokemon.name)}
            </span>
          </div>
        </Link>
      ) : (
        <div></div>
      )}

      {nextPokemon ? (
        <Link
          href={`/pokemon/${nextPokemon.id}`}
          className="flex items-center px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
        >
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">
              #{nextPokemon.id.toString().padStart(3, '0')}
            </span>
            <span className="ml-2 text-sm font-semibold text-gray-800 hidden sm:inline">
              {capitalizeFirstLetter(nextPokemon.name)}
            </span>
            <svg className="w-5 h-5 ml-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
