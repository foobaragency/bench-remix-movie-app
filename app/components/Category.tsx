import { Root, Viewport, Scrollbar, Thumb } from "@radix-ui/react-scroll-area";
import type { Movie } from "~/tmdb-client";
import MovieCard from "./MovieCard";

export default function Category({
  header,
  movies,
}: {
  header: string;
  movies: Movie[];
}) {
  return (
    <>
      <h2 className="text:xl mb-3 font-bold lg:text-3xl">{header}</h2>
      <Root>
        <Viewport>
          <div className="flex pb-2 [&>*]:mr-2 [&>*]:w-48">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} imageWidth="185" />
            ))}
          </div>
        </Viewport>
        <Scrollbar className="bg-transparent" orientation="horizontal">
          <Thumb className="w-4 rounded-md bg-gray-300 p-1" />
        </Scrollbar>
      </Root>
    </>
  );
}
