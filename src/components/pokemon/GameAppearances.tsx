import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface GameAppearancesProps {
  pokemon: PokemonDetails;
}

export default function GameAppearances({ pokemon }: GameAppearancesProps) {
  if (pokemon.game_indices.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Game Appearances</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemon.game_indices.slice(0, 8).map((gameIndex, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-gray-700">
              {capitalizeFirstLetter(gameIndex.version.name)}
            </div>
            <div className="text-lg font-bold text-gray-900">
              #{gameIndex.game_index}
            </div>
          </div>
        ))}
      </div>
      {pokemon.game_indices.length > 8 && (
        <p className="text-sm text-gray-600 mt-4">
          And {pokemon.game_indices.length - 8} more versions...
        </p>
      )}
    </div>
  );
}
