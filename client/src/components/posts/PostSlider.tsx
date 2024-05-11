import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { useState } from "react";

type Props = {
  images: { id: number; url: string }[];
};

function PostSlider(props: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNextImage() {
    if (currentIndex === props.images.length - 1) {
      setCurrentIndex(0);
    }

    setCurrentIndex((prev) => prev + 1);
  }

  function handlePreviousImage() {
    if (currentIndex === 0) {
      setCurrentIndex(props.images.length - 1);
    }

    setCurrentIndex((prev) => prev - 1);
  }

  const isRightDisabled =
    currentIndex === props.images.length - 1 || props.images.length === 1;
  const isLeftDisabled = currentIndex === 0 || props.images.length === 1;

  const renderedImages = props.images.map((image) => {
    return (
      <div
        key={image.id}
        className="h-full w-full relative z-10 flex-shrink-0 flex-grow-0"
        style={{
          translate: `${-100 * currentIndex}%`,
          transition: "translate 300ms ease-in-out",
        }}
      >
        <div
          style={{ backgroundImage: `url(${image.url})` }}
          className="backdrop absolute top-0 left-0 h-full w-full rounded-xl z-0 hidden md:block"
        ></div>

        <img
          loading="lazy"
          src={image.url}
          alt="post"
          className="object-cover h-full w-full rounded-xl z-30 bg-white/30 absolute top-0 left-0 md:object-contain"
        />
      </div>
    );
  });

  return (
    <figure className="overflow-hidden relative flex rounded-2xl my-2 h-[32rem] w-h-[32rem] md:h-[40rem] md:w-full">
      {renderedImages}
      {!isRightDisabled && (
        <button
          disabled={isRightDisabled}
          onClick={handleNextImage}
          className="absolute top-1/2 right-4 p-2 rounded-full bg-black/50 z-20 "
        >
          <ChevronRightIcon />
        </button>
      )}

      {!isLeftDisabled && (
        <button
          disabled={isLeftDisabled}
          onClick={handlePreviousImage}
          className="absolute top-1/2 left-4 p-2 rounded-full bg-black/50 z-20"
        >
          <ChevronLeftIcon />
        </button>
      )}
    </figure>
  );
}

export default PostSlider;
