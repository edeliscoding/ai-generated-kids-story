import React from "react";
import { Button } from "@/components/ui/button";

const LoadMore = ({ onLoadMore, loading }) => {
  return (
    <div className="flex justify-center mt-8">
      <Button onClick={onLoadMore} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
};

export default LoadMore;
