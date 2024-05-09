import Button from "@/components/Button";
import LoadingBar from "@/components/LoadingBar";
import Modal from "@/components/Modal";
import { AddIcon, ChevronDownIcon, DeleteIcon } from "@/components/icons";
import Tags from "@/components/posts/Tags";
import useTags from "@/hooks/useTags";
import { createPost } from "@/services/post-services";
import { SpaceTag } from "@/types/space";
import { resizeTextarea } from "@/utils/resizeTextarea";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  activeTab: string;
};

function CreatePost(props: Props) {
  const { spaceName } = useParams() as { spaceName: string };
  const { tags, isLoading } = useTags(spaceName);

  const [, setMaxTitleLength] = useState(300);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [isSubmittingPost, setIsSubmittingPost] = useState(false);

  const [post, setPost] = useState({
    title: "",
    body: "",
    images: [] as string[],
    selectedTag: {} as SpaceTag,
  });

  // resize the textarea based on the content
  useEffect(() => {
    resizeTextarea(titleRef, post.title);
    resizeTextarea(bodyRef, post.body);
  }, [post.title, post.body]);

  function handleChanges(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      setMaxTitleLength(300 - value.length);
    }
  }

  // iterate over the files and add them to the state
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    for (const file of files) {
      if (post.images.length >= 4) {
        alert("You can only upload up to 4 images");
        break;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPost((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
        setImageFiles((prev) => [...prev, file]);
      };

      reader.onerror = (err) => {
        console.error(err);
      };
    }
  }

  function removeImage(index: number) {
    const newImages = post.images.filter((_, i) => i !== index);

    // remove the file from the files array
    setImageFiles((prev) => prev.filter((_, i) => i !== index));

    setPost((prev) => ({ ...prev, images: newImages }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!post.title) {
      console.log("post title is required");
      return;
    }

    const data = new FormData();
    data.append("title", post.title);
    data.append("body", post.body);
    data.append(
      "tag",
      "id" in post.selectedTag ? `${post.selectedTag.id}` : ""
    );

    for (const file of imageFiles) {
      data.append("images", file);
    }

    console.log(data);

    try {
      setIsSubmittingPost(true);
      const response = await createPost(data, spaceName);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingPost(false);
    }
  }

  const renderedImages = post.images.map((img, i) => {
    return (
      <li key={i} className="relative">
        <span
          onClick={() => removeImage(i)}
          className="z-10 absolute top-1 right-1 bg-white p-2 rounded-lg shadow-md 
          cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <DeleteIcon />
        </span>

        <img
          src={img}
          alt="post"
          className=" mx-auto rounded-xl object-cover w-32 h-32"
        />
      </li>
    );
  });

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

            <Button
              style={{
                backgroundColor: post.selectedTag.colour,
                color: post.selectedTag.name ? "white" : "black",
              }}
              type="button"
              disabled={isLoading || !tags.length}
              onClick={() => setOpenTagModal((state) => !state)}
              className="bg-grayscale-100 text-black w-fit h-9 text-sm flex items-center gap-2"
            >
              {post.selectedTag.name || "Select Tag"}
              <ChevronDownIcon />
            </Button>

            {openTagModal && (
              <Modal closeModal={() => setOpenTagModal(false)}>
                <Tags
                  tags={tags}
                  isLoading={isLoading}
                  closeModal={() => setOpenTagModal(false)}
                  selectedTag={post.selectedTag}
                  setSelectedTag={(tag) =>
                    setPost((prev) => ({ ...prev, selectedTag: tag }))
                  }
                />
              </Modal>
            )}

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
              className="border border-dashed border-gray-300 rounded-2xl p-4 gap-4 min-h-44 flex 
          justify-center items-center "
            >
              {!post.images.length && (
                <Button
                  onClick={() => imageRef.current?.click()}
                  className="bg-grayscale-100 text-black w-fit hover:bg-gray-400 hover:text-white 
                transition-colors"
                >
                  Upload Image
                </Button>
              )}

              {!!post.images.length && (
                <ul className="w-full flex items-center gap-2">
                  {renderedImages}

                  {post.images.length < 4 && (
                    <li
                      onClick={() => imageRef.current?.click()}
                      className="border border-dashed border-gray-300 rounded-2xl h-32 w-32 flex 
                items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <AddIcon />
                    </li>
                  )}
                </ul>
              )}
            </div>

            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              multiple
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

      {isSubmittingPost && <LoadingBar />}
    </>
  );
}

export default CreatePost;
