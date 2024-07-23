import RecentPosts from "@/components/posts/RecentPosts";
import ProfileNav from "@/components/profile/ProfileNav";
import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="py-4">
      <ProfileNav />

      <div className="page-layout sm:wrapper">
        <div className="main">
          <Outlet />
        </div>

        <div className="sidebar">
          <RecentPosts />
        </div>
      </div>
    </div>
  );
}

export default Profile;
