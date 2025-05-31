import PokemonList from '@/components/PokemonList';
import SearchWrapper from '@/components/SearchWrapper';
import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';

const POKEMON_PER_PAGE = 20;

interface PageProps {
  searchParams: {
    search?: string;
  };
}

async function fetchInitialPokemon(): Promise<{ pokemon: PokemonDetails[], totalCount: number, hasMore: boolean }> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=0`,
      { cache: 'force-cache' }
    );
    const data: PokemonListResponse = await response.json();

    // Fetch detailed data for each Pokemon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url, { cache: 'force-cache' });
        const detail: PokemonDetails = await detailResponse.json();
        return detail;
      })
    );

    // Sort by ID to ensure proper order
    pokemonDetails.sort((a, b) => a.id - b.id);

    return {
      pokemon: pokemonDetails,
      totalCount: data.count,
      hasMore: data.next !== null
    };
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return { pokemon: [], totalCount: 0, hasMore: false };
  }
}

export default async function Home({ searchParams }: PageProps) {
  const searchTerm = searchParams.search || '';
  const initialData = await fetchInitialPokemon();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <SearchWrapper initialSearchTerm={searchTerm} />

        <PokemonList
          initialPokemon={initialData.pokemon}
          initialTotalCount={initialData.totalCount}
          initialHasMore={initialData.hasMore}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
