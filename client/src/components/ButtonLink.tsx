import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  className?: string;
  route: string;
}

function ButtonLink(props: Props) {
  const { children, className = "", route } = props;

  return (
    <Link to={route} className={`${className}  px-4 h-11 font-semibold  `}>
      {children}
    </Link>
  );
}

export default ButtonLink;
