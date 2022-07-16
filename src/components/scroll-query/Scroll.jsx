import { useInfiniteQuery } from "react-query";
import {  useRef, useCallback } from "react";
import Post from "../Post";
import { getPostsPage } from "api/axios";

const Scroll = () => {


  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("we are near the last post");
          fetchNextPage();
         
        }
      });

      if (post) {
        intObserver.current.observe(post);
      }
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error")
    return <p className="center">Error : {error.message}</p>;

  const content = data?.pages.map((pg) => {
    return pg.map((post, i) => {
      if (pg.length === i + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post} />;
      }

      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <>
      <h1 id="top">
       &infin; useInfiniteQuery
      </h1>
      {isFetchingNextPage && <p className="center">Loading more posts ....</p>}
      {content}
      <p className="center">
        <a href="#top">Back to the top</a>
      </p>
    </>
  );
};
export default Scroll;
