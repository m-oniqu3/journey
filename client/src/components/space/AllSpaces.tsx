import { getAllSpaces } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function AllSpaces() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["spaces"],
    queryFn: fetchAllSpaces,
  });

  async function fetchAllSpaces() {
    try {
      const spaces = await getAllSpaces();
      return spaces;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  const renderedSpaces =
    data &&
    data.map((space, index) => {
      return (
        <li className="grid grid-cols-[20px,auto] gap-2" key={space.id}>
          <p className="font-bold self-center">{index + 1}</p>

          <figure className="flex items-center gap-4">
            <img
              src={space.avatar || `https://picsum.photos/seed/${space.id}/200`}
              alt={space.name}
              className="w-10 h-10 rounded-full"
            />

            <figcaption className="text-sm">
              <Link
                to={`/s/${space.name}`}
                className="font-bold hover:underline underline-offset-2"
              >
                s/{space.name}
              </Link>
              <p className="text-sm">Travel</p>
              <p className="text-gray-500 text-sm">
                {space.members_count} members
              </p>
            </figcaption>
          </figure>
        </li>
      );
    });

  return (
    <div className="my-4 ">
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <div>Error: {(error as Error).message}</div>}

      {!isLoading && !data && <div>No spaces found</div>}

      {!isLoading && data && (
        <>
          <h2 className="text-xl font-bold mt-4 text-center">
            Journey to Spaces
          </h2>

          <article>
            <h4 className="text-lg font-bold">Explore spaces</h4>
            <p className="text-gray-500 font-medium mb-4 text-sm">
              Explore spaces created by fellow travelers.
            </p>
          </article>

          <ul className="wrapper grid gap-8 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
            {renderedSpaces}
          </ul>
        </>
      )}
    </div>
  );
}

export default AllSpaces;
