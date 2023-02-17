import MovieCard from "~/components/MovieCard";
import { Root, Viewport, Scrollbar, Thumb } from "@radix-ui/react-scroll-area";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { Movie } from "../tmdb-client";
import { getPopular, getUpcoming } from "../tmdb-client";

export const loader = async () => {
  const [popular, upcoming] = await Promise.all([
    getPopular(),
    new Promise<{ results: Movie[] }>((resolve) => {
      setTimeout(async () => {
        resolve(await getUpcoming());
      }, 2000);
    }),
  ]);

  return json({
    popular: popular.results,
    upcoming: upcoming.results,
  });
};

export default function Index() {
  const { popular, upcoming } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="px-1.5">
        <div>
          <Category header="Most popular 🔥" movies={popular} />
        </div>
        <div className="mt-4">
          <Category header="Upcoming 👀" movies={upcoming} />
        </div>
      </div>
    </>
  );
}

function Category({ header, movies }: { header: string; movies: Movie[] }) {
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
