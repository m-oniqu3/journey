import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";

type Props = {
  activeTab: string;
};

function CreatePost(props: Props) {
  const [post, setPost] = useState({ title: "", body: "", image: "" });
  const [maxTitleLength, setMaxTitleLength] = useState(300);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function handleChanges(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  }

  // resize the textarea on first render
  useEffect(() => {
    // resize the textarea based on the content
    function resizeTextarea(
      ref: React.RefObject<HTMLTextAreaElement>,
      state: string
    ) {
      if (ref.current && state.length > 0) {
        ref.current.style.height = "";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    }

    resizeTextarea(titleRef, post.title);
    resizeTextarea(bodyRef, post.body);
  }, [post.title, post.body]);

  return (
    <form className="flex flex-col gap-4">
      {props.activeTab === "Text" && (
        <>
          <div className="space-y-2">
            <textarea
              ref={titleRef}
              name="title"
              value={post.title}
              onChange={handleChanges}
              placeholder="Title"
              maxLength={300}
              className="textarea rounded-2xl p-4 font-medium h-14 no-scrollbar"
            />

            <p className="text-sm text-gray-500 ml-auto w-fit">
              {post.title.length} / 300
            </p>
          </div>

          <Button className="bg-grayscale-100 text-black w-fit h-9 text-sm">
            Add flair and tags
          </Button>

          <textarea
            ref={bodyRef}
            rows={6}
            name="body"
            placeholder="Text (optional)"
            value={post.body}
            onChange={handleChanges}
            className="textarea rounded-2xl p-4 no-scrollbar"
            autoFocus
          />
        </>
      )}
      {props.activeTab === "Images & Video" && <div>Images & Video</div>}

      <Button type="submit" className=" bg-accent text-white self-end">
        Post
      </Button>
    </form>
  );
}

export default CreatePost;
