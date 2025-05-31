import { PokemonDetails } from '@/types/pokemon';

interface BaseStatsProps {
  pokemon: PokemonDetails;
}

export default function BaseStats({ pokemon }: BaseStatsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Base Stats</h2>
      <div className="space-y-3">
        {pokemon.stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 font-medium capitalize">
                {stat.stat.name.replace('-', ' ')}:
              </span>
              <div className="text-right">
                <span className="font-bold text-gray-900">{stat.base_stat}</span>
                {stat.effort > 0 && (
                  <span className="text-xs text-blue-600 ml-2">(+{stat.effort} EV)</span>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
