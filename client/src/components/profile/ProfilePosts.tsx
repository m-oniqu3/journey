import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/posts/Post";
import RecentPosts from "@/components/posts/RecentPosts";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getAuthoredPosts } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchProfilePosts(page: number) {
  try {
    const response = await getAuthoredPosts(page);
    console.log(response);

    return response;
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
}

function ProfilePosts() {
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["profilePosts"],
    initialPageParam: 0,

    queryFn: ({ pageParam }) => fetchProfilePosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages.length
        : undefined;

      return nextPage;
    },
    retry: false,
  });

  function renderContent() {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return <div>Error: {error.message}</div>;
    }

    if (!data) {
      return <div>No posts found</div>;
    }

    const pages = data.pages.flat();

    const renderedPosts = pages.map((post, i) => {
      return <Post post={post} key={i} headerType="space" />;
    });

    return (
      <InfiniteScroll
        isLoadingIntial={isLoading}
        isLoadingMore={isFetchingNextPage}
        loadMore={() => hasNextPage && fetchNextPage()}
      >
        {renderedPosts}
      </InfiniteScroll>
    );
  }

  return (
    <div className="page-layout">
      <div className="main">{renderContent()}</div>
      <div className="sidebar">
        <RecentPosts />
      </div>
    </div>
  );
}

export default ProfilePosts;
