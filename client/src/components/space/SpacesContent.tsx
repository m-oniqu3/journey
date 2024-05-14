import Post from "@/components/posts/Post";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getSpacePosts } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useInfiniteQuery } from "react-query";

type Props = {
  name: string;
};

function SpacesContent(props: Props) {
  const { error, isError, data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["space-posts", props.name],
      queryFn: ({ pageParam = 0 }) => getSpacePost(props.name, pageParam),
      retry: false,

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
    return <div>Loading...</div>;
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
      <ul className="flex flex-col border-t border-gray-100 py-4 md:wrapper ">
        <InfiniteScroll
          isLoadingIntial={isLoading}
          isLoadingMore={isFetchingNextPage}
          loadMore={fetchNextPage}
        >
          <>{renderedPosts}</>
        </InfiniteScroll>
      </ul>
    </div>
  );
}

export default SpacesContent;
