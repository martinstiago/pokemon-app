'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PokemonDetails } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 transform transition-transform"
    >
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-2">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
        
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {capitalizeFirstLetter(pokemon.name)}
        </h3>
        
        <div className="flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(type.type.name)}`}
            >
              {capitalizeFirstLetter(type.type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
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
}
