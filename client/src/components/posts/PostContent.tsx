import { ArrowLeftIcon, HorizonalEllipsis } from "@/components/icons";
import PostButtons from "@/components/posts/PostButtons";
import PostSlider from "@/components/posts/PostSlider";
import { getPostById } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

function PostContent() {
  const navigate = useNavigate();
  const { postID } = useParams() as {
    spaceName: string;
    postID: string;
    postSlug: string;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["post", +postID],
    queryFn: fetchPost,
    refetchOnWindowFocus: false,
  });

  async function fetchPost() {
    try {
      const response = await getPostById(+postID);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  // navigate to previous page
  function handlePreviousPage() {
    navigate(-1);
  }

  if (!postID) {
    return <div>Post not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>Post not found</div>;
  }

  // replace new lines with line breaks
  const body = data.body.replace(/\n/g, "<br />");

  return (
    <article className=" space-y-4 md:wrapper">
      <header className="flex items-center gap-2">
        <span
          onClick={handlePreviousPage}
          className="hidden cursor-pointer bg-gray-200 h-9 w-9 place-items-center rounded-full md:grid"
        >
          <ArrowLeftIcon />
        </span>

        <img
          src={data.space.avatar || `https://picsum.photos/seed/${data.id}/200`}
          alt={data.space.name}
          className="avatar h-9 w-9"
        />

        <div className="flex flex-col h-9">
          <p className="flex gap-1 items-center h-1/2">
            <Link
              to={`/s/${data.space.name}`}
              className="cursor-pointer font-semibold text-sm"
            >
              s/{data.space.name}
            </Link>
            <span className="text-gray-400"> &#xb7;</span>
            <span className="font-normal text-gray-600 text-sm">
              {timeSince(new Date(data.created_at))}
            </span>
          </p>

          <p className="text-sm h-1/2">
            <span className="text-xs">@</span>
            {data.creator?.username}
          </p>
        </div>

        <span className="cursor-pointer p-1 rounded-full hover:bg-gray-50 ml-auto">
          <HorizonalEllipsis />
        </span>
      </header>

      <h2 className="font-semibold  text-xl leading-snug sm:text-2xl md:text-[1.6rem]">
        {data.title}
      </h2>

      {data.tag && (
        <p
          style={{ backgroundColor: `${data.tag.colour}` }}
          className="font-medium w-fit text-white px-3 my-1  h-6 rounded-full flex items-center justify-center text-sm"
        >
          {data.tag.name}
        </p>
      )}

      <p dangerouslySetInnerHTML={{ __html: body }}></p>

      {!!data.images.length && <PostSlider images={data.images} />}

      <PostButtons postID={data.id} postLikes={data.likes} />
    </article>
  );
}

export default PostContent;
