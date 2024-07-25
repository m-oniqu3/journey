import RecentPosts from "@/components/posts/RecentPosts";
import ProfileNav from "@/components/profile/ProfileNav";
import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className=" py-4 page-layout sm:wrapper">
      <div className="main">
        <ProfileNav />
        <Outlet />
      </div>

      <div className="sidebar">
        <RecentPosts />
      </div>
    </div>
  );
}

export default Profile;
