import React, { useEffect, useRef } from "react";

type Props = {
  isLoadingIntial: boolean;
  isLoadingMore: boolean;
  children: React.ReactNode;
  loadMore: () => void;
};

function InfiniteScroll(props: Props) {
  const observerElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          (!props.isLoadingMore || !props.isLoadingIntial)
        ) {
          props.loadMore();
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "500px",
      threshold: 0,
    });

    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    return () => observer.disconnect();
  }, [props]);

  return (
    <>
      <>{props.children}</>

      <div ref={observerElement} id="obs">
        {props.isLoadingMore && !props.isLoadingIntial && (
          <div className="text-center h-10">
            <div className="">Loading...</div>
          </div>
        )}
      </div>
    </>
  );
}

export default InfiniteScroll;
