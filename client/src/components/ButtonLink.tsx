import { Link } from "react-router-dom";

interface Props {
  children: string;
  className?: string;
  route: string;
}

function ButtonLink(props: Props) {
  const { children, className = "", route } = props;

  return (
    <Link
      to={route}
      className={`${className}  px-4 h-11 font-semibold grid place-items-center`}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
