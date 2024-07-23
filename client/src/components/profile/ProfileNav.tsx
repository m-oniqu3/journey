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
    const commonStyles =
      "cursor-pointer font-medium h-11 rounded-full px-4 flex items-center text-dark";
    const activeClass = `${commonStyles} bg-grayscale-100`;
    const defaultClass = `${commonStyles}+ " hover:bg-grayscale-100`;

    if (url === "posts" && (pathname === "/profile" || isActive)) {
      return activeClass;
    }

    return isActive ? activeClass : defaultClass;
  }

  const renderedLinks = profileLinks.map((link) => {
    return (
      <li key={link.id} className="">
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
    <nav className="wrapper">
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

      <ul className="mt-4 flex items-center gap-4 overflow-x-scroll h-20">
        {renderedLinks}
      </ul>
    </nav>
  );
}

export default ProfileNav;
