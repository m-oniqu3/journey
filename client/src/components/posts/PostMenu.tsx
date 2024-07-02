import { DeleteIcon, PropertyEditIcon, SaveIcon } from "@/components/icons";
import { useAuthContext } from "@/context/useAuthContext";

type Props = {
  creator: string;
};

function PostMenu(props: Props) {
  const { state } = useAuthContext();

  const options = [
    { id: 1, name: "Save", icon: SaveIcon, display: true },
    {
      id: 2,
      name: "Edit",
      icon: PropertyEditIcon,
      className: "w-7 h-7",
      display: state.user?.id === props.creator,
    },
    {
      id: 3,
      name: "Delete",
      icon: DeleteIcon,
      className: "w-7 h-7",
      display: state.user?.id === props.creator,
    },
  ];

  async function handlePostAction(action: string) {
    switch (action) {
      case "Save":
        console.log("Save post");
        break;
      case "Edit":
        console.log("Edit post");
        break;
      case "Delete":
        console.log("Delete post");
        break;
      default:
        console.log("Invalid action");
    }
  }

  const renderedOptions = options.map((option) => {
    return (
      <li
        key={option.id}
        className="hover:bg-gray-100 rounded-xl"
        style={{ display: option.display ? "block" : "none" }}
      >
        <button
          className="grid grid-cols-[30px,1fr] gap-4 items-center  p-2 w-full"
          onClick={() => handlePostAction(option.name)}
        >
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
