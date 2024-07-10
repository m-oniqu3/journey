import ProfileNav from "@/components/profile/ProfileNav";
import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="wrapper py-4">
      <ProfileNav />

      <Outlet />
    </div>
  );
}

export default Profile;
