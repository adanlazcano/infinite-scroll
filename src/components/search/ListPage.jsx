import Post from "components/search/Post";
import React from "react";

const ListPage = ({ searchResults }) => {
  const results = searchResults?.map((post) => (
    <Post key={post.id} post={post} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching Results</p>
    </article>
  );

  return <main>{content}</main>;
};

export default ListPage;
