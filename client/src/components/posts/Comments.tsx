import LoadingSpinner from "@/components/LoadingSpinner";
import CommentList from "@/components/posts/CommentList";
import NoComments from "@/components/posts/NoComments";
import PostCommentForm from "@/components/posts/PostCommentForm";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getCommentsForPost } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  postID: number;
  isFetchingPost: boolean;
};

function Comments(props: Props) {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", props.postID],
    queryFn: ({ pageParam }) => fetchComments(props.postID, pageParam),
    retry: false,
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages.length
        : undefined;

      return nextPage;
    },

    // only fetch comments when the post has been fetched
    enabled: !props.isFetchingPost,
  });

  async function fetchComments(postID: number, page: number) {
    try {
      const response = await getCommentsForPost(postID, page);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error: {error.message}</div>;

  if (!data?.pages) return <div>No comments</div>;

  const pages = data.pages.flat();

  const renderedComments = (
    <CommentList postID={props.postID} comments={pages} />
  );

  return (
    <section className="space-y-4 pt-2 md:wrapper">
      <PostCommentForm postID={props.postID} />

      {!pages.length && <NoComments />}

      {pages && (
        <InfiniteScroll
          isLoadingIntial={isLoading}
          isLoadingMore={isFetchingNextPage}
          loadMore={() => hasNextPage && fetchNextPage()}
        >
          <>{renderedComments}</>
        </InfiniteScroll>
      )}
    </section>
  );
}

export default Comments;
