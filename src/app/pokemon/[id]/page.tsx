'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PokemonDetails } from '@/types/pokemon';

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const pokemonId = params.id as string;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        
        const data: PokemonDetails = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokemon');
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      fetchPokemonDetails();
    }
  }, [pokemonId]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      normal: 'bg-gray-500',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-500',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-400',
      fairy: 'bg-pink-300',
    };
    
    return colors[type] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Pokemon details...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || 'Pokemon not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Pokemon Directory
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-48 h-48 mb-6 md:mb-0 md:mr-8">
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="text-lg opacity-80 mb-2">
                  #{pokemon.id.toString().padStart(3, '0')}
                </div>
                <h1 className="text-4xl font-bold mb-4">
                  {capitalizeFirstLetter(pokemon.name)}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(type.type.name)}`}
                    >
                      {capitalizeFirstLetter(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Basic Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Height:</span>
                    <span className="font-bold text-gray-900">{(pokemon.height / 10).toFixed(1)} m</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Weight:</span>
                    <span className="font-bold text-gray-900">{(pokemon.weight / 10).toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Base Experience:</span>
                    <span className="font-bold text-gray-900">{pokemon.base_experience || 'Unknown'}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Base Stats</h2>
                <div className="space-y-3">
                  {pokemon.stats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium capitalize">
                          {stat.stat.name.replace('-', ' ')}:
                        </span>
                        <span className="font-bold text-gray-900">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Abilities</h2>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability, index) => (
                    <div key={index} className="flex items-center">
                      <span className="font-semibold text-gray-800">
                        {capitalizeFirstLetter(ability.ability.name.replace('-', ' '))}
                      </span>
                      {ability.is_hidden && (
                        <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sprites Section */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sprites</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pokemon.sprites.front_default && (
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <Image
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name} front`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Front</p>
                  </div>
                )}
                {pokemon.sprites.back_default && (
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <Image
                        src={pokemon.sprites.back_default}
                        alt={`${pokemon.name} back`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Back</p>
                  </div>
                )}
                {pokemon.sprites.front_shiny && (
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <Image
                        src={pokemon.sprites.front_shiny}
                        alt={`${pokemon.name} shiny front`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Shiny Front</p>
                  </div>
                )}
                {pokemon.sprites.back_shiny && (
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <Image
                        src={pokemon.sprites.back_shiny}
                        alt={`${pokemon.name} shiny back`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Shiny Back</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
