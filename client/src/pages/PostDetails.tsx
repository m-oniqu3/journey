import Comments from "@/components/posts/Comments";
import PostContent from "@/components/posts/PostContent";
import SpaceSidebar from "@/components/space/SpaceSidebar";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { spaceName } = useParams() as {
    spaceName: string;
    postID: string;
    postSlug: string;
  };

  return (
    <section className="page-layout wrapper py-6">
      <div className="main-content space-y-4">
        <PostContent />
        <Comments />
      </div>

      <div className="sidebar">
        <SpaceSidebar name={spaceName} showHeader={true} />
      </div>
    </section>
  );
}

export default PostDetails;
