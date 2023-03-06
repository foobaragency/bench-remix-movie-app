import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import SearchBgImage from "~/images/search-bg-blur.webp";
import Search from "~/components/Search";
import { getPopular, getUpcoming } from "~/tmdb-client";
import Category from "~/components/Category";

export const loader = async () => {
  const [popular, upcoming] = await Promise.all([getPopular(), getUpcoming()]);

  return json({
    popular: popular.results,
    upcoming: upcoming.results,
  });
};

export default function Index() {
  const { popular, upcoming } = useLoaderData<typeof loader>();

  return (
    <>
      <div
        className="mb-3 flex  h-80 flex-col justify-center  bg-cover px-10"
        style={{ backgroundImage: `url(${SearchBgImage})` }}
      >
        <div className="text-3xl font-bold text-slate-50">
          Millions of movie for you to discover and explore!
        </div>

        <Form method="get" action="/search" className="mt-4">
          <Search />
        </Form>
      </div>

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
