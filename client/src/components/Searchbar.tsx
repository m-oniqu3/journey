interface Props {
  className?: string;
}

function Searchbar(props: Props) {
  const { className = "" } = props;

  return (
    <form className={`${className} relative`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-auto text-slate-500 absolute top-3 left-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        className="w-full pl-12 pr-4 h-11 rounded-lg bg-grayscale-100 focus:outline-none placeholder:text-slate-500"
        placeholder="Search Journey"
      />
    </form>
  );
}

export default Searchbar;
