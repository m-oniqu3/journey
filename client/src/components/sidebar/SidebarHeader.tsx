import { GlobeIcon, HomeIcon, UfoIcon } from "@/components/icons";
import { Link } from "react-router-dom";

const links = [
  { title: "Home", to: "/", icon: <HomeIcon /> },
  { title: "Explore", to: "/explore", icon: <UfoIcon /> },
  { title: "Spaces", to: "/spaces", icon: <GlobeIcon /> },
];

type Props = {
  closeSidebar?: () => void;
};

const SidebarHeader = (props: Props) => {
  const renderedLinks = links.map((link) => {
    return (
      <li key={link.to} onClick={props?.closeSidebar}>
        <Link
          to={link.to}
          className="grid items-center grid-cols-[30px,1fr] h-12 gap-2 font-normal px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2 "
        >
          <span className="grid place-items-center">{link.icon}</span>

          <span>{link.title}</span>
        </Link>
      </li>
    );
  });

  return (
    <ul className="border-b-[1px] border-slate-200 pb-2">{renderedLinks}</ul>
  );
};

export default SidebarHeader;
