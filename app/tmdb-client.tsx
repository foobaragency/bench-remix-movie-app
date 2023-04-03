import { API_KEY } from "./config";

export interface Movie {
  id: number;
  adult: boolean;
  genre_ids: number[];
  overview: string;
  backdrop_path: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  original_language: string;
  original_title: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type CastMember = {
  id: number;
  character: string;
  name: string;
  profile_path: string;
};

export type CrewMember = {
  id: number;
  job: string;
  name: string;
  profile_path: string;
};

export type MovieCredits = {
  cast: CastMember[];
  crew: CrewMember[];
};

export async function getPopular() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
  );

  return response.json<{ results: Movie[] }>();
}

export async function getUpcoming() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?page=1&sort_by=popularity.desc&api_key=${API_KEY}`
  );

  return response.json<{ results: Movie[] }>();
}

export async function search(query: string, page: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`
  );

  return response.json<{
    results: Movie[];
    total_pages: number;
    page: number;
  }>();
}

export async function getMovie(id: string) {
  const movieDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  );

  const { cast, crew } = await credits.json<MovieCredits>();

  const similarMoviesPromise = fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
  );

  return {
    movie: await movieDetails.json<
      Movie & {
        genres: { id: number; name: string }[];
        runtime: number;
        tagline: string;
      }
    >(),
    cast,
    crew,
    similar: similarMoviesPromise
      .then((response) => response.json<{ results: Movie[] }>())
      .then((movies) => movies.results),
  };
}

export async function getMovieCredits(id: string) {
  const movieDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  );

  const { cast, crew } = await credits.json<MovieCredits>();

  return {
    movie: await movieDetails.json<Movie>(),
    cast,
    crew: crew.reduce((acc, cur) => {
      acc[cur.job] = acc[cur.job] || [];
      acc[cur.job].push(cur);
      return acc;
    }, {} as Record<string, CrewMember[]>),
  };
}
