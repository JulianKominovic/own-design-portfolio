import "./BlogList.css";
import { useEffect, useState } from "preact/hooks";
import MinicardBlog from "../blogs/MinicardBlog";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:4000"
  : "https://static-blog-posts.herokuapp.com";

const handleClick = (setSelectedIndex, selectedIndex, index) =>
  selectedIndex === index ? setSelectedIndex(-1) : setSelectedIndex(index);

const BlogList = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [commonTags, setCommonTags] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      fetch(BASE_URL + "/common-tags").then((res) => res.json()),
      fetch(BASE_URL + "/posts").then((res) => res.json()),
    ]).then(([tags, posts]) => {
      setCommonTags((tags as any)?.value || []);
      setPosts((posts as any)?.value || []);
    });
  }, []);

  useEffect(() => {
    fetch(
      BASE_URL +
        `/posts?tags=${
          selectedIndex !== -1 ? commonTags[selectedIndex]?.key : ""
        }`
    )
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, [selectedIndex]);

  return (
    <div className="blog-list">
      <div className="blog-list__categories">
        {commonTags &&
          (commonTags as any).map(({ key, icon }, index) =>
            index < 4 ? (
              <button
                key={key}
                onClick={() =>
                  handleClick(setSelectedIndex, selectedIndex, index)
                }
                className={selectedIndex === index ? "active" : ""}
              >
                <img src={BASE_URL + icon} alt={key + " icon"} />
              </button>
            ) : null
          )}
      </div>
      <div className="blog-list__list-wrapper">
        <div className="blog-list__list">
          {posts &&
            Object.entries(posts).map(([key, value], index) =>
              index < 3 ? (
                <MinicardBlog key={key} {...value} blogKey={key}></MinicardBlog>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
};
export default BlogList;
