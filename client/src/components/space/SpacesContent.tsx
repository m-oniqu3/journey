import LoadingSpinner from "@/components/LoadingSpinner";
import NoPost from "@/components/posts/NoPost";
import Post from "@/components/posts/Post";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getSpacePosts } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  name: string;
};

function SpacesContent(props: Props) {
  const {
    error,
    isError,
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["space-posts", props.name],
    queryFn: ({ pageParam }) => getSpacePost(props.name, pageParam),
    retry: false,
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages.length
        : undefined;

      return nextPage;
    },
  });

  async function getSpacePost(name: string, page: number) {
    try {
      const response = await getSpacePosts(name, page);
      return response;
    } catch (error) {
      const message = handleError(error);

      throw new Error(message);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data?.pages) {
    return <div>No posts found</div>;
  }

  const pages = data.pages.flat();

  const renderedPosts = pages.map((post) => {
    return <Post post={post} key={post.id} />;
  });

  return (
    <div className="w-full">
      {!pages.length && <NoPost />}

      {!!pages.length && (
        <div className="flex flex-col border-t border-gray-100 py-4 md:wrapper ">
          <InfiniteScroll
            isLoadingIntial={isLoading}
            isLoadingMore={isFetchingNextPage}
            loadMore={() => hasNextPage && fetchNextPage()}
          >
            <>{renderedPosts}</>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

export default SpacesContent;
