import { NextRequest, NextResponse } from 'next/server';
import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';

const POKEMON_PER_PAGE = 20;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const search = searchParams.get('search') || '';

  try {
    if (search && search.length >= 3) {
      // Handle search
      const searchResults = await searchPokemon(search);
      return NextResponse.json({
        pokemon: searchResults,
        hasMore: false,
        totalCount: searchResults.length
      });
    } else {
      // Handle pagination
      const result = await fetchPokemonList(offset);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon' },
      { status: 500 }
    );
  }
}

async function fetchPokemonList(offset: number = 0): Promise<{ pokemon: PokemonDetails[], totalCount: number, hasMore: boolean }> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`,
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

async function searchPokemon(query: string): Promise<PokemonDetails[]> {
  if (query.length < 3) {
    return [];
  }

  try {
    // First try exact match
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`, { cache: 'force-cache' });
      if (response.ok) {
        const pokemon: PokemonDetails = await response.json();
        return [pokemon];
      }
    } catch {
      // Continue to broader search if exact match fails
    }

    // Get all Pokemon species to search through names
    const speciesResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=10000', { cache: 'force-cache' });
    const speciesData = await speciesResponse.json();

    // Filter species by name match
    const matchingSpecies = speciesData.results.filter((species: { name: string }) =>
      species.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 20); // Limit to first 20 matches for performance

    // Fetch detailed data for matching Pokemon
    const pokemonDetails = await Promise.all(
      matchingSpecies.map(async (species: { name: string }) => {
        try {
          const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`, { cache: 'force-cache' });
          if (detailResponse.ok) {
            const detail: PokemonDetails = await detailResponse.json();
            return detail;
          }
          return null;
        } catch {
          return null;
        }
      })
    );

    // Filter out null results and sort by ID
    const validPokemon = pokemonDetails.filter(pokemon => pokemon !== null) as PokemonDetails[];
    validPokemon.sort((a, b) => a.id - b.id);

    return validPokemon;
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    return [];
  }
}
