import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Loaders from "./loader";
interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isEmpty?: boolean;
}

export const InfiniteScroll = ({
  isManual = false,
  hasNextPage,
  isFetchingNextPage,
  isEmpty,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, isManual, fetchNextPage]);
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div ref={targetRef} className="h-1" />
      {hasNextPage ? (
        <Button
          onClick={fetchNextPage}
          variant="outline"
          disabled={isFetchingNextPage || !hasNextPage}
          className="flex items-center justify-center min-w-[120px]"
        >
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2">
              <Loaders size={30} />
            </div>
          ) : (
            "Load more"
          )}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          {isEmpty ? "You have reached the end of the list" : ""}
        </p>
      )}
    </div>
  );
};
