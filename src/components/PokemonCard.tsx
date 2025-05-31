import Image from 'next/image';
import Link from 'next/link';
import { PokemonDetails } from '@/types/pokemon';
import { getTypeColor, capitalizeFirstLetter } from '@/utils/pokemon';

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const spriteUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '';

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border border-gray-200 hover:border-gray-300">
        <div className="relative w-full h-32 mb-4">
          <Image
            src={spriteUrl}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
    </Link>
  );
}
