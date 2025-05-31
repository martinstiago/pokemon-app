import { PokemonDetails } from '@/types/pokemon';

interface BasicInformationProps {
  pokemon: PokemonDetails;
}

export default function BasicInformation({ pokemon }: BasicInformationProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-700 font-medium">Height:</span>
          <span className="font-bold text-gray-900">{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-700 font-medium">Weight:</span>
          <span className="font-bold text-gray-900">{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-700 font-medium">Base Experience:</span>
          <span className="font-bold text-gray-900">{pokemon.base_experience || 'Unknown'}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700 font-medium">Default Form:</span>
          <span className="font-bold text-gray-900">{pokemon.is_default ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
}
