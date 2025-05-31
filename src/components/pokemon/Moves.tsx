'use client';

import { useState, useMemo } from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { capitalizeFirstLetter } from '@/utils/pokemon';
import { getGenerationFromVersionGroup, getGenerationDisplayName } from '@/utils/generations';
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
  // Extract all unique generations from version groups
  const availableGenerations = useMemo(() => {
    const generations = new Set<string>();

    pokemon.moves.forEach(move => {
      move.version_group_details.forEach(detail => {
        const generation = getGenerationFromVersionGroup(detail.version_group.name);
        if (generation) {
          generations.add(generation);
        }
      });
    });

    // Sort generations (generation-i, generation-ii, etc.)
    return Array.from(generations).sort();
  }, [pokemon.moves]);

  const [selectedGeneration, setSelectedGeneration] = useState<string>(
    availableGenerations[availableGenerations.length - 1] || ''
  );

  // Get the first version group for the selected generation
  const getVersionGroupForGeneration = (generation: string): string | null => {
    for (const move of pokemon.moves) {
      for (const detail of move.version_group_details) {
        const moveGeneration = getGenerationFromVersionGroup(detail.version_group.name);
        if (moveGeneration === generation) {
          return detail.version_group.name;
        }
      }
    }
    return null;
  };

  // Filter and categorize moves for the selected generation
  const categorizedMoves = useMemo(() => {
    if (!selectedGeneration) return { levelUp: [], machine: [], egg: [] };

    const targetVersionGroup = getVersionGroupForGeneration(selectedGeneration);
    if (!targetVersionGroup) return { levelUp: [], machine: [], egg: [] };

    const levelUp: MoveData[] = [];
    const machine: MoveData[] = [];
    const egg: MoveData[] = [];

    pokemon.moves.forEach(move => {
      const versionDetail = move.version_group_details.find(
        detail => detail.version_group.name === targetVersionGroup
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
  }, [pokemon.moves, selectedGeneration]);

  if (availableGenerations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Moves
        </h2>

        <div className="flex items-center space-x-2">
          <label htmlFor="generation-select" className="text-sm font-medium text-gray-900">
            Generation:
          </label>
          <select
            id="generation-select"
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[180px]"
            style={{
              color: '#111827', // text-gray-900
              backgroundColor: '#f9fafb' // bg-gray-50
            }}
          >
            {availableGenerations.map(generation => (
              <option
                key={generation}
                value={generation}
                style={{
                  color: '#111827', // text-gray-900
                  backgroundColor: '#ffffff', // bg-white
                  padding: '8px 12px'
                }}
              >
                {getGenerationDisplayName(generation)}
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
