'use client';

import { useState } from 'react';
import { capitalizeFirstLetter } from '@/utils/pokemon';

interface MoveData {
  name: string;
  level: number;
  method: string;
}

interface MoveTableProps {
  moves: MoveData[];
  title: string;
  showLevel?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export default function MoveTable({
  moves,
  title,
  showLevel = false,
  collapsible = false,
  defaultCollapsed = false
}: MoveTableProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  if (moves.length === 0) {
    return null;
  }

  const handleToggle = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div
        className={`p-6 ${collapsible ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors duration-150`}
        onClick={handleToggle}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {title} ({moves.length})
          </h3>
          {collapsible && (
            <svg
              className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                isCollapsed ? 'rotate-0' : 'rotate-180'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {showLevel && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Level
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Move Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {moves.map((move, index) => (
                <tr key={`${move.name}-${index}`} className="hover:bg-gray-50">
                  {showLevel && (
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {move.level === 0 ? '—' : move.level}
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {capitalizeFirstLetter(move.name.replace('-', ' '))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
