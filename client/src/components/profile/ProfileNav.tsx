import { NavLink, useLocation } from "react-router-dom";

const profileLinks = [
  { id: 2, name: "Posts", url: "posts" },
  { id: 3, name: "Comments", url: "comments" },
  { id: 4, name: "Saved", url: "saved" },
  { id: 5, name: "Likes", url: "likes" },
];

function ProfileNav() {
  const { pathname } = useLocation();

  function handleActiveClass(isActive: boolean, url: string) {
    const activeClass = "bg-grayscale-100  font-medium rounded-full  h-full";
    const defaultClass = "cursor-pointer font-medium hover:bg-grayscale-100  ";

    if (url === "posts" && (pathname === "/profile" || isActive)) {
      return activeClass;
    }

    return isActive ? activeClass : defaultClass;
  }

  const renderedLinks = profileLinks.map((link) => {
    return (
      <li key={link.id} className="px-4 h-11">
        <NavLink
          to={`/profile/${link.url}`}
          className={({ isActive }) => handleActiveClass(isActive, link.url)}
        >
          {link.name}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className="">
      <figure className="flex gap-2">
        <img
          src="https://picsum.photos/seed/1/200"
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-gray-200"
        />

        <figcaption className="flex flex-col justify-end pb-2">
          <h2 className="font-bold text-2xl">afrustratedscientist</h2>
          <p className="font-medium text-dark text-lg">t/adrianmallory</p>
        </figcaption>
      </figure>

      <ul className="mt-4 flex gap-2 overflow-x-scroll h-20 ">
        {renderedLinks}
      </ul>

      {/* <ButtonLink
        route={`/submit`}
        className="bg-white h-9 border-[1px] border-gray-500 text-black rounded-full w-fit flex items-center gap-2 !font-medium "
      >
        <VscAdd className="h-6 w-6" />
        Create a post
      </ButtonLink> */}
    </nav>
  );
}

export default ProfileNav;
