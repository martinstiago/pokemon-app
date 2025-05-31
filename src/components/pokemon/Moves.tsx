'use client';

import { useState, useMemo } from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface MovesProps {
  pokemon: PokemonDetails;
}

interface MoveData {
  name: string;
  level: number;
  method: string;
}

export default function Moves({ pokemon }: MovesProps) {
  // Extract all unique version groups
  const versionGroups = useMemo(() => {
    const groups = new Set<string>();
    pokemon.moves.forEach(move => {
      move.version_group_details.forEach(detail => {
        groups.add(detail.version_group.name);
      });
    });
    return Array.from(groups).sort();
  }, [pokemon.moves]);

  const [selectedVersionGroup, setSelectedVersionGroup] = useState<string>(
    versionGroups[0] || ''
  );

  // Filter moves for the selected version group
  const filteredMoves = useMemo(() => {
    if (!selectedVersionGroup) return [];

    const moves: MoveData[] = [];

    pokemon.moves.forEach(move => {
      const versionDetail = move.version_group_details.find(
        detail => detail.version_group.name === selectedVersionGroup
      );

      if (versionDetail) {
        moves.push({
          name: move.move.name,
          level: versionDetail.level_learned_at,
          method: versionDetail.move_learn_method.name
        });
      }
    });

    // Sort by level (0 for non-level moves), then by name
    return moves.sort((a, b) => {
      if (a.level !== b.level) {
        // Put level 0 moves at the end
        if (a.level === 0) return 1;
        if (b.level === 0) return -1;
        return a.level - b.level;
      }
      return a.name.localeCompare(b.name);
    });
  }, [pokemon.moves, selectedVersionGroup]);

  if (versionGroups.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Moves ({filteredMoves.length} total)
        </h2>

        <div className="flex items-center space-x-2">
          <label htmlFor="version-group" className="text-sm font-medium text-gray-900">
            Version Group:
          </label>
          <select
            id="version-group"
            value={selectedVersionGroup}
            onChange={(e) => setSelectedVersionGroup(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[180px]"
          >
            {versionGroups.map(group => (
              <option key={group} value={group}>
                {capitalizeFirstLetter(group.replace('-', ' '))}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredMoves.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Move Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Learn Method
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMoves.map((move, index) => (
                <tr key={`${move.name}-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {move.level === 0 ? '—' : move.level}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {capitalizeFirstLetter(move.name.replace('-', ' '))}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {capitalizeFirstLetter(move.method.replace('-', ' '))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No moves found for this version group.</p>
        </div>
      )}
    </div>
  );
}
