import { CloseIcon } from "@/components/icons";
import { SpaceTag } from "@/types/space";
import { useState } from "react";

type Props = {
  tags: SpaceTag[];
  isLoading: boolean;
  closeModal: () => void;
  selectedTag: SpaceTag;
  setSelectedTag: (tag: SpaceTag) => void;
};

function Tags(props: Props) {
  const [search, setSearch] = useState("");
  const [filteredTags, setFilteredTags] = useState(props.tags);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (!value) {
      setFilteredTags(props.tags);
      return;
    }

    const filtered = props.tags.filter((tag) =>
      tag.name.toLowerCase().includes(value)
    );

    setFilteredTags(filtered);
  }

  function handleSelectedTag(tag: SpaceTag) {
    props.setSelectedTag(tag);
    props.closeModal();
  }

  const renderedTags = filteredTags.map((tag) => {
    const activeTag = props.selectedTag.name === tag.name;

    return (
      <li
        key={tag.name}
        style={{ backgroundColor: activeTag ? "black" : tag.colour }}
        className={`font-semibold text-white px-4 py-1 rounded-full cursor-pointer  `}
        onClick={() => handleSelectedTag(tag)}
      >
        {tag.name}
      </li>
    );
  });

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="space-y-4 bg-white rounded-xl max-h-3/4 p-6 w-full max-w-xl overflow-y-scroll"
    >
      <header className="space-y-1 relative">
        <span
          onClick={props.closeModal}
          className="absolute -top-2 right-0 cursor-pointer bg-gray-50 h-10 w-10 rounded-full flex justify-center items-center"
        >
          <CloseIcon className="w-6 h-6" />
        </span>
        <h2 className="text-2xl font-bold">Select Tag</h2>
        <p className="text-gray-500">Select a tag to categorize your post.</p>
      </header>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        autoFocus
        placeholder="Search tags"
        className="input"
      />

      <ul className="flex flex-wrap gap-2">
        {renderedTags.length > 0 ? (
          renderedTags
        ) : (
          <p className="text-gray-500">No tags found</p>
        )}
      </ul>
    </form>
  );
}

export default Tags;
