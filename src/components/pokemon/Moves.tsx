import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface MovesProps {
  pokemon: PokemonDetails;
}

export default function Moves({ pokemon }: MovesProps) {
  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Moves ({pokemon.moves.length} total)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {pokemon.moves.slice(0, 20).map((move, index) => (
          <div key={index} className="bg-white p-3 rounded border">
            <div className="font-semibold text-gray-800">
              {capitalizeFirstLetter(move.move.name.replace('-', ' '))}
            </div>
            <div className="text-xs text-gray-600">
              {move.version_group_details[0] && (
                <>
                  Level {move.version_group_details[0].level_learned_at} -
                  {capitalizeFirstLetter(move.version_group_details[0].move_learn_method.name)}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {pokemon.moves.length > 20 && (
        <p className="text-sm text-gray-600 mt-4">
          Showing 20 of {pokemon.moves.length} moves
        </p>
      )}
    </div>
  );
}
