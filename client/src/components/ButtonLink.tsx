import { Link } from "react-router-dom";

interface Props {
  text: string;
  className?: string;
  route: string;
}

function ButtonLink(props: Props) {
  const { text, className = "", route } = props;

  return (
    <Link
      to={route}
      className={`${className} rounded-lg px-4 h-11 font-semibold grid place-items-center`}
    >
      {text}
    </Link>
  );
}

export default ButtonLink;
