import LoadingSpinner from "@/components/LoadingSpinner";
import Comments from "@/components/posts/Comments";
import PostContent from "@/components/posts/PostContent";
import SpaceSidebar from "@/components/space/SpaceSidebar";
import { getPostById } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { spaceName, postID } = useParams() as {
    spaceName: string;
    postID: string;
    postSlug: string;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["post", +postID],
    queryFn: fetchPost,
    refetchOnWindowFocus: false,
  });

  // fetch post by id
  async function fetchPost() {
    try {
      const response = await getPostById(+postID);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error: {error.message}</div>;

  if (!data) return <div>Post not found</div>;

  return (
    <section className="page-layout wrapper py-6">
      <div className="main-content space-y-4">
        <PostContent post={data} />
        <Comments postID={+postID} isFetchingPost={isLoading} />
      </div>

      <div className="sidebar">
        <SpaceSidebar name={spaceName} showHeader={true} />
      </div>
    </section>
  );
}

export default PostDetails;
