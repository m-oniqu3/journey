import Button from "@/components/Button";
import { CloseIcon } from "@/components/icons";
import { Space } from "@/types/space";
import { resizeTextarea } from "@/utils/resizeTextarea";
import { useEffect, useRef, useState } from "react";

type Props = {
  closeModal: () => void;
  space: Space;
};

//create an array of 20 beautiful pastel colors in #RRGGBB format
const colours = [
  "#FFC0CB",
  "#FFB6C1",
  "#FF69B4",
  "#FF1493",
  "#DB7093",
  "#C71585",
  "#E6E6FA",
  "#D8BFD8",
  "#DDA0DD",
  "#EE82EE",
  "#DA70D6",
  "#FF00FF",
  "#BA55D3",
  "#9370DB",
  "#8A2BE2",
  "#9400D3",
  "#9932CC",
  "#8B008B",
  "#800080",
  "#4B0082",
];

function EditSpace(props: Props) {
  const [characters, setCharacters] = useState(0);
  const [description, setDescription] = useState(props.space.description);
  const [tag, setTag] = useState("");
  const descRef = useRef<HTMLTextAreaElement>(null);

  const [tags, setTags] = useState([
    { name: "first time traveler", colour: "bg-blue-500" },
    { name: "review", colour: "bg-red-500" },
    { name: "advice/suggestions", colour: "bg-indigo-500" },
    { name: "tips", colour: "bg-green-500" },
    { name: "question", colour: "bg-purple-500" },

    { name: "food", colour: "bg-green-500" },
    { name: "accommodation", colour: "bg-indigo-500" },
    { name: "transportation", colour: "bg-purple-500" },
    { name: "activities", colour: "bg-pink-500" },
    { name: "safety", colour: "bg-indigo-500" },
    { name: "budget", colour: "bg-gray-500" },
    { name: "culture", colour: "bg-green-500" },
    { name: "language", colour: "bg-indigo-500" },

    { name: "disability", colour: "bg-red-500" },
    { name: "solo travel", colour: "bg-purple-500" },
    { name: "group travel", colour: "bg-pink-500" },
    { name: "family travel", colour: "bg-indigo-500" },
    { name: "couple travel", colour: "bg-gray-500" },
  ]);

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
    setCharacters(e.target.value.length);
  }

  useEffect(() => {
    // resize the textarea based on the content
    resizeTextarea(descRef, description);
  }, [description]);

  const renderedTags = tags.map((tag) => (
    <li
      key={tag.name}
      className={`${tag.colour} font-semibold text-white px-4 py-2 rounded-full grid grid-cols-[auto,20px] gap-1 place-items-center  `}
    >
      {tag.name}
      <span className="flex justify-center items-center">
        <CloseIcon />
      </span>
    </li>
  ));

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="space-y-4 bg-white rounded-xl h-3/4 p-8 w-full max-w-xl overflow-y-scroll"
    >
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Edit Space Details</h2>
        <p className="text-gray-500">
          Your space is where you can share your knowledge and experiences with
          others. Provide a brief description of what your space is about.
        </p>
      </header>

      <textarea
        ref={descRef}
        value={description}
        onChange={handleDescriptionChange}
        className="textarea no-scrollbar h-11"
        placeholder="Describe your space for visitors"
        maxLength={300}
      />
      <p className="text-sm text-gray-500 ml-auto w-fit">{characters} / 300</p>

      <h2 className="font-bold text-xl">Tags</h2>
      <p className=" text-gray-500">
        Create tags members can use to categorize their posts.
      </p>

      <input
        type="text"
        value={tag}
        placeholder="Add a tag"
        className="input"
      />

      <ul className="flex flex-wrap gap-2">{renderedTags}</ul>

      <div className="flex justify-end gap-4">
        <Button onClick={props.closeModal} className="bg-grayscale-100">
          Cancel
        </Button>
        <Button type="submit" className="bg-accent text-white">
          Save
        </Button>
      </div>
    </form>
  );
}

export default EditSpace;
