// Pokemon type color constants
export const POKEMON_TYPE_COLORS = {
  NORMAL: 'bg-gray-500',
  FIRE: 'bg-red-500',
  WATER: 'bg-blue-500',
  ELECTRIC: 'bg-yellow-500',
  GRASS: 'bg-green-500',
  ICE: 'bg-blue-300',
  FIGHTING: 'bg-red-700',
  POISON: 'bg-purple-500',
  GROUND: 'bg-yellow-600',
  FLYING: 'bg-indigo-400',
  PSYCHIC: 'bg-pink-500',
  BUG: 'bg-green-400',
  ROCK: 'bg-yellow-800',
  GHOST: 'bg-purple-700',
  DRAGON: 'bg-indigo-700',
  DARK: 'bg-gray-800',
  STEEL: 'bg-gray-400',
  FAIRY: 'bg-pink-300',
} as const;

export const getTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    normal: POKEMON_TYPE_COLORS.NORMAL,
    fire: POKEMON_TYPE_COLORS.FIRE,
    water: POKEMON_TYPE_COLORS.WATER,
    electric: POKEMON_TYPE_COLORS.ELECTRIC,
    grass: POKEMON_TYPE_COLORS.GRASS,
    ice: POKEMON_TYPE_COLORS.ICE,
    fighting: POKEMON_TYPE_COLORS.FIGHTING,
    poison: POKEMON_TYPE_COLORS.POISON,
    ground: POKEMON_TYPE_COLORS.GROUND,
    flying: POKEMON_TYPE_COLORS.FLYING,
    psychic: POKEMON_TYPE_COLORS.PSYCHIC,
    bug: POKEMON_TYPE_COLORS.BUG,
    rock: POKEMON_TYPE_COLORS.ROCK,
    ghost: POKEMON_TYPE_COLORS.GHOST,
    dragon: POKEMON_TYPE_COLORS.DRAGON,
    dark: POKEMON_TYPE_COLORS.DARK,
    steel: POKEMON_TYPE_COLORS.STEEL,
    fairy: POKEMON_TYPE_COLORS.FAIRY,
  };

  return colors[type] || POKEMON_TYPE_COLORS.NORMAL;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Array of all Pokemon type colors for Tailwind CSS safelist
export const pokemonTypeColors = Object.values(POKEMON_TYPE_COLORS);
