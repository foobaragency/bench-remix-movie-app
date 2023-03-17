import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { getMovieCredits } from "~/tmdb-client";
import Person from "~/components/Person";
import { IMAGE_BASE_URL } from "~/config";

export const loader = async ({ request, params }: LoaderArgs) => {
  //TODO: handle case of missing movie (i.e 404)
  const id = params.id;
  //TODO: better deal with missing params as error or 404 pages
  if (!id) throw new Error("ID is required");

  return json(await getMovieCredits(id));
};

export default function Index() {
  const {
    movie: { title, id, poster_path, release_date },
    cast,
    crew,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex items-center gap-10 bg-slate-500 px-10 py-5">
        <img
          className="w-24"
          src={`${IMAGE_BASE_URL}/original${poster_path}`}
          alt={title}
        />
        <div className="flex flex-col">
          <h1 className="text-3xl text-white">
            {title}
            <span className="opacity-80">
              ({new Date(release_date).getFullYear()})
            </span>
          </h1>
          <Link to={`/movies/${id}`} className="text-white hover:underline">
            &larr; Go back
          </Link>
        </div>
      </div>

      <div className="px-10">
        <h2 className="text:xl mb-3 mt-10 font-bold lg:text-3xl">Cast 🍿</h2>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
          {cast.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </div>
        <h2 className="text:xl my-3 font-bold lg:text-3xl">Crew 🎥</h2>
        {Object.keys(crew).map((key) => {
          return (
            <>
              <h3 className="text-xl">{key}</h3>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-7 xl:grid-cols-8">
                {crew[key].map((person) => (
                  <Person key={person.id} person={person} />
                ))}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
