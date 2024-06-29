import { LogoutIcon } from "@/components/icons";
import { Link } from "react-router-dom";

function ProfileMenu() {
  return (
    <ul className="p-2">
      <li className="px-3 py-3 hover:bg-gray-100 cursor-pointer rounded-xl">
        <Link to="/profile">
          <figure className="flex gap-2 items-center">
            <img
              src="https://picsum.photos/seed/1/200"
              alt="avatar"
              className="w-10 h-10  rounded-full"
            />

            <figcaption className="h-10 flex flex-col justify-center ">
              <p className="h-1/2">View Profile</p>
              <p className="text-sm text-dark">t/afrustatedscientist</p>
            </figcaption>
          </figure>
        </Link>
      </li>

      <li className="px-3 py-3 hover:bg-gray-100 cursor-pointer rounded-xl">
        <Link to="/logout" className="flex gap-2  ">
          <span className="w-10 h-10 flex items-center justify-center ">
            <LogoutIcon />
          </span>
          <span className="flex items-center justify-center">Logout</span>
        </Link>
      </li>
    </ul>
  );
}

export default ProfileMenu;
