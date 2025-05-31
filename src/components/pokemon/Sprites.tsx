import Image from 'next/image';
import { PokemonDetails } from '@/types/pokemon';

interface SpritesProps {
  pokemon: PokemonDetails;
}

export default function Sprites({ pokemon }: SpritesProps) {
  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sprites</h2>

      {/* Main Sprites */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Main Sprites</h3>
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
          {pokemon.sprites.front_female && (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src={pokemon.sprites.front_female}
                  alt={`${pokemon.name} female`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <p className="text-sm text-gray-600">Female</p>
            </div>
          )}
          {pokemon.sprites.back_female && (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src={pokemon.sprites.back_female}
                  alt={`${pokemon.name} female back`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <p className="text-sm text-gray-600">Female Back</p>
            </div>
          )}
        </div>
      </div>

      {/* Dream World & Home Sprites */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Special Artwork</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pokemon.sprites.other.dream_world.front_default && (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={`${pokemon.name} dream world`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <p className="text-sm text-gray-600">Dream World</p>
            </div>
          )}
          {pokemon.sprites.other.home.front_default && (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src={pokemon.sprites.other.home.front_default}
                  alt={`${pokemon.name} home`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <p className="text-sm text-gray-600">Home</p>
            </div>
          )}
          {pokemon.sprites.other['official-artwork'].front_shiny && (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_shiny}
                  alt={`${pokemon.name} official shiny`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <p className="text-sm text-gray-600">Official Shiny</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
