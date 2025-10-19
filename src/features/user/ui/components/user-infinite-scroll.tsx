import Loaders from "@/components/loader";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import React, { useEffect } from "react";

interface InfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isEmpty?: boolean;
}

export const UserInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  isEmpty,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 1.0,
    rootMargin: "-100px 0px 0px 0px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      {/* Intersection observer trigger */}
      <div ref={targetRef} className="h-1" />

      {/* Loader while fetching */}
      {isFetchingNextPage && (
        <div className="flex items-center gap-2">
          <Loaders size={60} />
        </div>
      )}

      {/* End of list message */}
      {!hasNextPage && isEmpty && (
        <p className="text-sm text-muted-foreground">
          You have reached the end of the list.
        </p>
      )}
    </div>
  );
};
