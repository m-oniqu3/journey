import Button from "@/components/Button";
import { DeleteIcon } from "@/components/icons";
import { RefObject, useEffect, useRef, useState } from "react";

type Props = {
  activeTab: string;
};

function CreatePost(props: Props) {
  const [post, setPost] = useState({ title: "", body: "", image: "" });
  const [, setMaxTitleLength] = useState(300);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleChanges(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      setMaxTitleLength(300 - value.length);
    }
  }

  useEffect(() => {
    // resize the textarea based on the content
    function resizeTextarea(
      ref: RefObject<HTMLTextAreaElement>,
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPost((prev) => ({ ...prev, image: reader.result as string }));
      };
    }
  }

  function removeImage() {
    setPost((prev) => ({ ...prev, image: "" }));
  }

  return (
    <form className="flex flex-col gap-4">
      {/* TEXT */}
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

      {/* IMAGE  */}
      {props.activeTab === "Images & Video" && (
        <div className="space-y-4">
          <textarea
            ref={titleRef}
            name="title"
            value={post.title}
            onChange={handleChanges}
            placeholder="Title"
            maxLength={300}
            className="textarea rounded-2xl p-4 font-medium h-14 no-scrollbar"
          />

          <div
            className="border border-dashed border-gray-300 rounded-2xl p-4 flex justify-center 
          items-center gap-4 min-h-44 "
          >
            {!post.image && (
              <Button
                onClick={() => imageRef.current?.click()}
                className="bg-grayscale-100 text-black w-fit hover:bg-gray-400 hover:text-white transition-colors"
              >
                Upload Image
              </Button>
            )}

            {post.image && (
              <div className="relative">
                <span
                  onClick={removeImage}
                  className="z-10 absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <DeleteIcon />
                </span>

                <img
                  src={post.image}
                  alt="post"
                  className=" mx-auto rounded-xl max-h-72 w-full"
                />
              </div>
            )}
          </div>

          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            className="bg-grayscale-100 text-black w-fit h-9 text-sm hidden"
          />
        </div>
      )}

      <Button type="submit" className=" bg-accent text-white self-end">
        Post
      </Button>
    </form>
  );
}

export default CreatePost;
