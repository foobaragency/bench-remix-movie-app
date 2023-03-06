import { Link } from "@remix-run/react";
import { IMAGE_BASE_URL } from "~/config";
import type { CastMember, CrewMember } from "~/tmdb-client";

export default function Index({ person }: { person: CastMember | CrewMember }) {
  return (
    <Link to={`/people/${person.id}`}>
      <figure className="my-2 h-72 w-36 shrink-0 rounded-xl bg-white shadow-xl">
        <div className="rounded-t-xl bg-gray-200">
          {person.profile_path ? (
            <img
              className="mx-auto rounded-t-xl md:h-auto"
              src={`${IMAGE_BASE_URL}/w185/${person.profile_path}`}
              alt={person.name}
              width="185"
              height="277"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 36"
              fill="gray"
              className="flex w-full items-center"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
                transform="scale(1.333) translate(-3 3)"
              />
            </svg>
          )}
        </div>
        <figcaption className="p-1.5 text-slate-900 dark:text-slate-700">
          <div className="text-sm font-bold">{person.name}</div>

          <div className="text-xs font-thin">
            {"character" in person ? person.character : person.job}
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}
