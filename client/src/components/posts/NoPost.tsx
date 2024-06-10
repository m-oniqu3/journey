import ButtonLink from "@/components/ButtonLink";
import { VscAdd } from "react-icons/vsc";
import { useParams } from "react-router-dom";

function NoPost() {
  const { spaceName } = useParams() as { spaceName: string };

  return (
    <article className="wrapper flex flex-col gap-2 mt-6">
      <h2 className="text-lg md:text-2xl text-dark font-semibold">
        Travlers haven't visited this space yet!
      </h2>
      <p>
        Unfortunately, no travelers have visited this space yet. Be the first to
        share your thoughts.
      </p>

      <ButtonLink
        route={`/s/${spaceName}/submit`}
        className="mt-2 bg-accent text-white rounded-full w-fit flex items-center gap-2 "
      >
        <VscAdd className="h-6 w-6" />
        Create a post
      </ButtonLink>
    </article>
  );
}

export default NoPost;
