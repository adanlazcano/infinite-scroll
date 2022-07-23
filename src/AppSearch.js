import { getPosts } from "api/axios";
import ListPage from "components/search/ListPage";
import SearchBar from "components/search/SearchBar";
import { useState, useEffect } from "react";

const AppSearch = () => {
  const [posts, setPosts] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    getPosts().then((json) => {
      setPosts(json);
      setSearchResults(json);
    });
  }, []);

  return (
    <>
      <SearchBar posts={posts} setSearchResults={setSearchResults} />
      <ListPage searchResults={searchResults} />
    </>
  );
};

export default AppSearch;
