import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface HeldItemsProps {
  pokemon: PokemonDetails;
}

export default function HeldItems({ pokemon }: HeldItemsProps) {
  if (pokemon.held_items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Held Items</h2>
      <div className="space-y-3">
        {pokemon.held_items.map((heldItem, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-4">
            <div className="font-semibold text-gray-800">
              {capitalizeFirstLetter(heldItem.item.name.replace('-', ' '))}
            </div>
            <div className="text-sm text-gray-600">
              Found in: {heldItem.version_details.map(vd =>
                capitalizeFirstLetter(vd.version.name)
              ).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
