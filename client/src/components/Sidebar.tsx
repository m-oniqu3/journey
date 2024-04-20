import { AiOutlineHome } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { RiCompassLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    {
      title: "Home",
      to: "/",
      icon: <AiOutlineHome className="h-7 w-7 " />,
    },

    {
      title: "Favourites",
      to: "/favourites",
      icon: <FaRegStar className="h-7 w-7 " />,
    },
    {
      title: "Explore",
      to: "/explore",
      icon: <RiCompassLine className="h-7 w-7 " />,
    },
  ];

  //create an array with 20 countries from all around the world
  const countries = [
    "USA",
    "Canada",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Portugal",
    "Brazil",
    "Argentina",
    "Australia",
    "NewZealand",
    "Japan",
    "SouthKorea",
    "China",
    "India",
    "SouthAfrica",
    "Nigeria",
    "Egypt",
    "Kenya",
    "Morocco",
  ];

  const renderCountries = countries.map((country, index) => {
    return (
      <li
        key={country}
        className="px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2"
      >
        <Link
          to={`/countries/${country}`}
          className="grid grid-cols-[44px,1fr,40px] gap-1 items-center font-normal "
        >
          <img
            src={`https://picsum.photos/seed/${index}/200`}
            className="w-10 h-10 rounded-full object-cover
                    "
            alt=""
          />

          <span className="lowercase">{`s/${country}`}</span>

          <CiStar className="h-6 w-6" />
        </Link>
      </li>
    );
  });

  return (
    <aside className="hidden overflow-y-scroll h-full w-full border-r-[1px] border-slate-200 p-4  lg:block">
      <ul className="border-b-[1px] border-slate-200 pb-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="grid items-center grid-cols-[30px,1fr] h-12 gap-2 font-normal px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2 "
            >
              <span className="grid place-items-center">{link.icon}</span>

              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <h2 className="text-sm uppercase px-2 py-4 tracking-widest text-gray-500 ">
          spaces
        </h2>

        {renderCountries}
      </ul>
    </aside>
  );
}

export default Sidebar;
