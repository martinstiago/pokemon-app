// Generation constants
const GENERATION_I = 'generation-i';
const GENERATION_II = 'generation-ii';
const GENERATION_III = 'generation-iii';
const GENERATION_IV = 'generation-iv';
const GENERATION_V = 'generation-v';
const GENERATION_VI = 'generation-vi';
const GENERATION_VII = 'generation-vii';
const GENERATION_VIII = 'generation-viii';
const GENERATION_IX = 'generation-ix';

// Version groups to generation mapping
const VERSION_GROUP_TO_GENERATION: { [key: string]: string } = {
  // Generation I
  'red-blue': GENERATION_I,
  'yellow': GENERATION_I,

  // Generation II
  'gold-silver': GENERATION_II,
  'crystal': GENERATION_II,

  // Generation III
  'ruby-sapphire': GENERATION_III,
  'emerald': GENERATION_III,
  'firered-leafgreen': GENERATION_III,

  // Generation IV
  'diamond-pearl': GENERATION_IV,
  'platinum': GENERATION_IV,
  'heartgold-soulsilver': GENERATION_IV,

  // Generation V
  'black-white': GENERATION_V,
  'black-2-white-2': GENERATION_V,

  // Generation VI
  'x-y': GENERATION_VI,
  'omegaruby-alphasapphire': GENERATION_VI,

  // Generation VII
  'sun-moon': GENERATION_VII,
  'ultra-sun-ultra-moon': GENERATION_VII,
  'lets-go-pikachu-lets-go-eevee': GENERATION_VII,

  // Generation VIII
  'sword-shield': GENERATION_VIII,
  'brilliant-diamond-shining-pearl': GENERATION_VIII,
  'legends-arceus': GENERATION_VIII,

  // Generation IX
  'scarlet-violet': GENERATION_IX,
};

// Generation names mapping
const GENERATION_NAMES: { [key: string]: string } = {
  [GENERATION_I]: 'Generation I',
  [GENERATION_II]: 'Generation II',
  [GENERATION_III]: 'Generation III',
  [GENERATION_IV]: 'Generation IV',
  [GENERATION_V]: 'Generation V',
  [GENERATION_VI]: 'Generation VI',
  [GENERATION_VII]: 'Generation VII',
  [GENERATION_VIII]: 'Generation VIII',
  [GENERATION_IX]: 'Generation IX',
};

/**
 * Given a version group name, returns the generation group it belongs to
 * @param versionGroup - The version group name (e.g., 'red-blue', 'sword-shield')
 * @returns The generation group name (e.g., 'generation-i', 'generation-viii') or null if not found
 */
export const getGenerationFromVersionGroup = (versionGroup: string): string | null => {
  return VERSION_GROUP_TO_GENERATION[versionGroup] || null;
};

/**
 * Given a generation group name, returns the display name
 * @param generationGroup - The generation group name (e.g., 'generation-i')
 * @returns The display name (e.g., 'Generation I') or null if not found
 */
export const getGenerationDisplayName = (generationGroup: string): string | null => {
  return GENERATION_NAMES[generationGroup] || null;
};

/**
 * Given a version group name, returns the generation display name
 * @param versionGroup - The version group name (e.g., 'red-blue')
 * @returns The generation display name (e.g., 'Generation I') or null if not found
 */
export const getGenerationDisplayNameFromVersionGroup = (versionGroup: string): string | null => {
  const generationGroup = getGenerationFromVersionGroup(versionGroup);
  if (!generationGroup) return null;
  return getGenerationDisplayName(generationGroup);
};
