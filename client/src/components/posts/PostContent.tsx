import { ArrowLeftIcon, HorizonalEllipsis } from "@/components/icons";
import PostButtons from "@/components/posts/PostButtons";
import PostSlider from "@/components/posts/PostSlider";
import { PostSummary } from "@/types/post";
import { timeSince } from "@/utils/timeSince";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  post: PostSummary;
};

function PostContent(props: Props) {
  const { post } = props;
  const navigate = useNavigate();

  // navigate to previous page
  function handlePreviousPage() {
    navigate(-1);
  }

  // replace new lines with line breaks
  const body = post.body.replace(/\n/g, "<br />");

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
          src={post.space.avatar || `https://picsum.photos/seed/${post.id}/200`}
          alt={post.space.name}
          className="avatar h-9 w-9"
        />

        <div className="flex flex-col h-9">
          <p className="flex gap-1 items-center h-1/2">
            <Link
              to={`/s/${post.space.name}`}
              className="cursor-pointer font-semibold text-sm"
            >
              s/{post.space.name}
            </Link>
            <span className="text-gray-400"> &#xb7;</span>
            <span className="font-normal text-gray-600 text-sm">
              {timeSince(new Date(post.created_at))}
            </span>
          </p>

          <p className="text-sm h-1/2">
            <span className="text-xs">@</span>
            {post.creator?.username}
          </p>
        </div>

        <span className="cursor-pointer p-1 rounded-full hover:bg-gray-50 ml-auto">
          <HorizonalEllipsis />
        </span>
      </header>

      <h2 className="font-semibold  text-xl leading-snug sm:text-2xl md:text-[1.6rem]">
        {post.title}
      </h2>

      {post.tag && (
        <p
          style={{ backgroundColor: `${post.tag.colour}` }}
          className="font-medium w-fit text-white px-3 my-1  h-6 rounded-full flex items-center justify-center text-sm"
        >
          {post.tag.name}
        </p>
      )}

      <p dangerouslySetInnerHTML={{ __html: body }}></p>

      {!!post.images.length && <PostSlider images={post.images} />}

      <PostButtons postID={post.id} postLikes={post.likes} />
    </article>
  );
}

export default PostContent;
