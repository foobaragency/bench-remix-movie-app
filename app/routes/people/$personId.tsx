import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Root, Viewport, Scrollbar, Thumb } from "@radix-ui/react-scroll-area";
import { Link, useLoaderData } from "@remix-run/react";
import { getPerson } from "~/tmdb-client";
import { IMAGE_BASE_URL } from "~/config";

export const loader = async ({ params }: LoaderArgs) => {
  const { personId } = params;
  if (!personId) throw new Error("ID is required");

  return json(await getPerson(personId));
};

export default function Index() {
  const { person, cast, crew } = useLoaderData<typeof loader>();

  return (
    <div className="flex p-12 md:gap-12">
      <div className="flex flex-shrink-0 flex-col">
        <img
          src={`${IMAGE_BASE_URL}/original/${person.profile_path}`}
          alt={person.name}
          className="w-56
    rounded-md shadow-xl"
        />
        <h2 className="my-4 text-2xl">Personal Info</h2>
        <div className="mb-4 max-w-xs">
          <p className="font-bold">Born</p>
          <span className="whitespace-pre-line">{person.birthday}</span>
        </div>
        <div className="mb-4 max-w-xs">
          <p className="font-bold">Place of Birth</p>
          <span className="whitespace-pre-line">{person.place_of_birth}</span>
        </div>
        <div className="mb-4 max-w-xs">
          <p className="font-bold">Also known as</p>
          <span className="whitespace-pre-line">
            {person.also_known_as.join("\r\n")}
          </span>
        </div>
        <div className="mb-4 max-w-xs">
          <p className="font-bold">Known For</p>
          <span className="whitespace-pre-line">
            {person.known_for_department}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <h1 className="text-6xl">{person.name}</h1>

        <h2 className="mt-4 text-2xl">Biography</h2>
        <p className="mt-2">{person.biography}</p>
        {/* </div> */}

        <h2 className="my-4 text-2xl">Casted for</h2>
        <Root>
          <Viewport>
            <div className="flex overflow-x-auto [&>*]:mr-4">
              {cast.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <figure className="w-44">
                    <img
                      className="mx-auto rounded-xl shadow-md md:h-auto"
                      src={`${IMAGE_BASE_URL}/w342/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <figcaption className="p-1.5 text-slate-900 dark:text-slate-700">
                      <div className="text-sm font-bold">{movie.title}</div>
                      <div className="text-xs font-thin">
                        {new Date(movie.release_date).toDateString()}
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          </Viewport>
          <Scrollbar className="bg-transparent" orientation="horizontal">
            <Thumb className="w-4 rounded-md bg-gray-300 p-1" />
          </Scrollbar>
        </Root>
        <h2 className="my-4 text-2xl">Crew member for</h2>
        <Root>
          <Viewport>
            <div className="flex overflow-x-auto [&>*]:mr-4">
              {crew.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <figure className="w-44">
                    <img
                      className="mx-auto rounded-xl shadow-md md:h-auto"
                      src={`${IMAGE_BASE_URL}/w342/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <figcaption className="p-1.5 text-slate-900 dark:text-slate-700">
                      <div className="text-sm font-bold">{movie.title}</div>
                      <div className="text-xs font-thin">
                        {new Date(movie.release_date).toDateString()}
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          </Viewport>
          <Scrollbar className="bg-transparent" orientation="horizontal">
            <Thumb className="w-4 rounded-md bg-gray-300 p-1" />
          </Scrollbar>
        </Root>
      </div>
    </div>
  );
}
