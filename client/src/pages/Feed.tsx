import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/posts/Post";
import RecentPosts from "@/components/posts/RecentPosts";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getPostsForJoinedSpaces } from "@/services/post-services";
import { PostSummary } from "@/types/post";
import { handleError } from "@/utils/handleError";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [page, setPage] = useState(0);

  const {
    isError,
    error,
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    initialPageParam: 0,

    queryFn: ({ pageParam }) => fetchPostsForJoinedSpaces(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages.length
        : undefined;

      return nextPage;
    },
    retry: false,
  });

  async function fetchPostsForJoinedSpaces(page: number) {
    setPage(page);
    try {
      const response = await getPostsForJoinedSpaces(page);
      console.log("fetching page", page);
      console.log(response);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  // when data is available, add it to the posts array
  useEffect(() => {
    if (data) {
      setPosts((prev) => [...prev, ...(data.pages[page] || [])]);
    }
  }, [data, page]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  if (!data.pages) {
    return <div>No posts found</div>;
  }

  const renderedPosts = posts.map((post, i) => {
    return <Post key={i} post={post} headerType="space" />;
  });

  return (
    <div>
      <div className="page-layout wrapper">
        <main className="main">
          <InfiniteScroll
            isLoadingIntial={isLoading}
            isLoadingMore={isFetchingNextPage}
            loadMore={() => hasNextPage && fetchNextPage()}
          >
            <>{renderedPosts}</>
          </InfiniteScroll>
        </main>

        <div className="sidebar">
          <RecentPosts />
        </div>
      </div>
    </div>
  );
}

export default Feed;
