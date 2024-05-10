import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { useState } from "react";

type Props = {
  images: { id: number; url: string }[];
};

function PostSlider(props: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  function handleNextImage() {
    if (selectedImage === props.images.length - 1) {
      setSelectedImage(0);
    }

    setSelectedImage((prev) => prev + 1);
  }

  function handlePreviousImage() {
    if (selectedImage === 0) {
      setSelectedImage(props.images.length - 1);
    }

    setSelectedImage((prev) => prev - 1);
  }

  const isRightDisabled =
    selectedImage === props.images.length - 1 || props.images.length === 1;
  const isLeftDisabled = selectedImage === 0 || props.images.length === 1;

  const renderedImages = props.images.map((image) => {
    return (
      <div className="relative h-full w-full " key={image.id}>
        <div
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(50px)",
            WebkitFilter: "blur(50px)",
          }}
          className="absolute top-0 left-0 h-full w-full rounded-2xl z-0  "
        ></div>

        <div className="relative h-full w-full z-10 ">
          {!isRightDisabled && (
            <button
              disabled={isRightDisabled}
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 p-2 rounded-full bg-black/50 z-10 "
            >
              <ChevronRightIcon />
            </button>
          )}

          {!isLeftDisabled && (
            <button
              disabled={isLeftDisabled}
              onClick={handlePreviousImage}
              className="absolute top-1/2 left-4 p-2 rounded-full bg-black/50 z-10"
            >
              <ChevronLeftIcon />
            </button>
          )}

          <img
            loading="lazy"
            src={image.url}
            alt="post"
            className="object-cover h-full w-full rounded-2xl lg:object-contain bg-white/50 z-30"
          />
        </div>
      </div>
    );
  });

  return (
    <figure className="overflow-hidden rounded-2xl  relative h-[32rem] w-h-[32rem] md:h-[40rem] md:w-full">
      <>{renderedImages[selectedImage]}</>
    </figure>
  );
}

export default PostSlider;
