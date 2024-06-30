import Post from "@/components/posts/Post";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getPosts } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useInfiniteQuery } from "@tanstack/react-query";

function Explore() {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["explore"],
    queryFn: ({ pageParam }) => fetchExplorePosts(pageParam),
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages.length
        : undefined;

      return nextPage;
    },
  });

  async function fetchExplorePosts(page: number) {
    try {
      const response = await getPosts(page);
      return response;
    } catch (error) {
      const message = handleError(error);

      console.error(message);

      throw new Error(message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{(error as Error).message}</div>;
  }

  if (!data?.pages) {
    return <div>No posts found</div>;
  }

  const pages = data.pages.flat();

  const renderedPosts = pages.map((post, i) => {
    return <Post post={post} key={i} headerType="space" />;
  });

  return (
    <div className="page-layout">
      <div className="main flex flex-col border-t border-gray-100 py-4 md:wrapper ">
        <InfiniteScroll
          isLoadingIntial={isLoading}
          isLoadingMore={isFetchingNextPage}
          loadMore={() => hasNextPage && fetchNextPage()}
        >
          <> {renderedPosts}</>
        </InfiniteScroll>
      </div>

      <div className="sidebar">recommended spaces</div>
    </div>
  );
}

export default Explore;
