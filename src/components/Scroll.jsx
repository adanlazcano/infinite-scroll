import usePosts from "hooks/usePosts";
import { useState,useRef,useCallback } from "react";
import Post from "./Post";

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);
  const intObserver = useRef()
  const lastPostRef = useCallback(
    post => {
            if (isLoading) return
            if(intObserver.current) intObserver.current.disconnect()

            intObserver.current = new IntersectionObserver(posts=>{
                if(posts[0].isIntersecting && hasNextPage){
                    console.log('we are near the last post')
                    setPageNum(prev=>prev+1)
                }
            })

            if (post) {
                intObserver.current.observe(post)
            }
    },[isLoading,hasNextPage])
     
  

  if(isError) return <p className="center">Error : {error.message}</p>

  const content = results.map((post,i)=>{
    if(results.length === i +1){
        return <Post ref={lastPostRef} key={post.id} post={post} />
    }

    return <Post key={post.id} post={post} />
  })

  return (
    <>
      <h1 id="top">
        &infin; Infinite Query &amp; Scroll <br /> &infin; Ex.1 react only
      </h1>
      {isLoading && <p className="center">Loading more posts ....</p>}
      {content}
      <p className="center">
        <a href="#top">Back to the top</a>
      </p>
    </>
  );
};
export default Example1;
