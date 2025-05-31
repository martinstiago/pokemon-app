import Image from 'next/image';
import { PokemonDetails } from '@/types/pokemon';
import { getTypeColor, capitalizeFirstLetter } from '@/utils/pokemon';

interface PokemonHeaderProps {
  pokemon: PokemonDetails;
}

export default function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-48 h-48 mb-6 md:mb-0 md:mr-8">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '/placeholder.png'}
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
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(type.type.name)}`}
              >
                {capitalizeFirstLetter(type.type.name)}
              </span>
            ))}
          </div>
          <div className="text-sm opacity-90">
            <p>Species: {capitalizeFirstLetter(pokemon.species.name)}</p>
            <p>Order: {pokemon.order}</p>
            {pokemon.is_default && <p className="text-green-200">Default form</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
