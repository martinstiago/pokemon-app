import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface AbilitiesProps {
  pokemon: PokemonDetails;
}

export default function Abilities({ pokemon }: AbilitiesProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Abilities</h2>
      <div className="space-y-2">
        {pokemon.abilities.map((ability, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">
              {capitalizeFirstLetter(ability.ability.name.replace('-', ' '))}
            </span>
            <div className="flex gap-2">
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                Slot {ability.slot}
              </span>
              {ability.is_hidden && (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  Hidden
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
