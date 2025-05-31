import BackButton from '@/components/BackButton';
import PokemonNavigation from '@/components/PokemonNavigation';
import PokemonHeader from '@/components/pokemon/PokemonHeader';
import BasicInformation from '@/components/pokemon/BasicInformation';
import BaseStats from '@/components/pokemon/BaseStats';
import Abilities from '@/components/pokemon/Abilities';
import Forms from '@/components/pokemon/Forms';
import GameAppearances from '@/components/pokemon/GameAppearances';
import HeldItems from '@/components/pokemon/HeldItems';
import Moves from '@/components/pokemon/Moves';
import Sprites from '@/components/pokemon/Sprites';
import PastTypes from '@/components/pokemon/PastTypes';
import { PokemonDetails } from '@/types/pokemon';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

async function fetchPokemonDetails(id: string): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cache: 'force-cache'
    });

    if (!response.ok) {
      return null;
    }

    const data: PokemonDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return null;
  }
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const pokemon = await fetchPokemonDetails(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <BackButton />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <PokemonHeader pokemon={pokemon} />

          {/* Details Section */}
          <div className="p-8">
            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BasicInformation pokemon={pokemon} />
              <BaseStats pokemon={pokemon} />
              <Abilities pokemon={pokemon} />
            </div>

            {/* Additional Sections */}
            <Forms pokemon={pokemon} />
            <GameAppearances pokemon={pokemon} />
            <HeldItems pokemon={pokemon} />
            <Moves pokemon={pokemon} />
            <Sprites pokemon={pokemon} />
            <PastTypes pokemon={pokemon} />

            {/* Navigation Section */}
            <PokemonNavigation currentId={pokemon.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
