import { DeleteIcon, PropertyEditIcon, SaveIcon } from "@/components/icons";

const options = [
  { id: 1, name: "Save", icon: SaveIcon },
  { id: 2, name: "Edit", icon: PropertyEditIcon, className: "w-7 h-7" },
  { id: 3, name: "Delete", icon: DeleteIcon, className: "w-7 h-7" },
];

function PostMenu() {
  const renderedOptions = options.map((option) => {
    return (
      <li key={option.id} className="hover:bg-gray-100 rounded-xl">
        <button className="grid grid-cols-[30px,1fr] gap-4 items-center  p-2 w-full">
          <span className="flex items-center justify-center">
            <option.icon className={option.className || ""} />
          </span>
          <span className="text-left">{option.name}</span>
        </button>
      </li>
    );
  });

  return <ul className="p-2">{renderedOptions}</ul>;
}

export default PostMenu;
