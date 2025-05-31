import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface FormsProps {
  pokemon: PokemonDetails;
}

export default function Forms({ pokemon }: FormsProps) {
  if (pokemon.forms.length <= 1) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Forms</h2>
      <div className="flex flex-wrap gap-2">
        {pokemon.forms.map((form, index) => (
          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {capitalizeFirstLetter(form.name)}
          </span>
        ))}
      </div>
    </div>
  );
}
