'use client';

import { useState, useMemo } from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';
import MoveTable from './MoveTable';

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

  // Filter and categorize moves for the selected version group
  const categorizedMoves = useMemo(() => {
    if (!selectedVersionGroup) return { levelUp: [], machine: [], egg: [] };

    const levelUp: MoveData[] = [];
    const machine: MoveData[] = [];
    const egg: MoveData[] = [];

    pokemon.moves.forEach(move => {
      const versionDetail = move.version_group_details.find(
        detail => detail.version_group.name === selectedVersionGroup
      );

      if (versionDetail) {
        const moveData: MoveData = {
          name: move.move.name,
          level: versionDetail.level_learned_at,
          method: versionDetail.move_learn_method.name
        };

        // Categorize by learn method
        if (versionDetail.move_learn_method.name === 'level-up') {
          levelUp.push(moveData);
        } else if (versionDetail.move_learn_method.name === 'machine') {
          machine.push(moveData);
        } else if (versionDetail.move_learn_method.name === 'egg') {
          egg.push(moveData);
        }
      }
    });

    // Sort level-up moves by level, others by name
    levelUp.sort((a, b) => {
      if (a.level !== b.level) {
        if (a.level === 0) return 1;
        if (b.level === 0) return -1;
        return a.level - b.level;
      }
      return a.name.localeCompare(b.name);
    });

    machine.sort((a, b) => a.name.localeCompare(b.name));
    egg.sort((a, b) => a.name.localeCompare(b.name));

    return { levelUp, machine, egg };
  }, [pokemon.moves, selectedVersionGroup]);

  if (versionGroups.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Moves
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
            style={{
              color: '#111827', // text-gray-900
              backgroundColor: '#f9fafb' // bg-gray-50
            }}
          >
            {versionGroups.map(group => (
              <option
                key={group}
                value={group}
                style={{
                  color: '#111827', // text-gray-900
                  backgroundColor: '#ffffff', // bg-white
                  padding: '8px 12px'
                }}
              >
                {capitalizeFirstLetter(group.replace('-', ' '))}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <MoveTable
          moves={categorizedMoves.levelUp}
          title="Level-up Moves"
          showLevel={true}
        />
        <MoveTable
          moves={categorizedMoves.machine}
          title="Machine Moves"
          collapsible={true}
          defaultCollapsed={true}
        />
        <MoveTable
          moves={categorizedMoves.egg}
          title="Egg Moves"
          collapsible={true}
          defaultCollapsed={true}
        />
      </div>
    </div>
  );
}
