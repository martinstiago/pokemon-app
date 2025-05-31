import { PokemonDetails } from '@/types/pokemon';
import { getTypeColor, capitalizeFirstLetter } from '@/utils/pokemon';

interface PastTypesProps {
  pokemon: PokemonDetails;
}

export default function PastTypes({ pokemon }: PastTypesProps) {
  if (pokemon.past_types.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Types</h2>
      <div className="space-y-4">
        {pokemon.past_types.map((pastType, index) => (
          <div key={index} className="border-l-4 border-purple-500 pl-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Generation: {capitalizeFirstLetter(pastType.generation.name)}
            </div>
            <div className="flex flex-wrap gap-2">
              {pastType.types.map((type, typeIndex) => (
                <span
                  key={typeIndex}
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(type.type.name)}`}
                >
                  {capitalizeFirstLetter(type.type.name)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
