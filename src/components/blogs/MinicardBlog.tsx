import "./MinicardBlog.css";
const MinicardBlog = ({ image, title, description, blogKey }) => {
  return (
    <article className="mini-card__blog">
      <header>
        <img src={image} alt={title} />
      </header>
      <h4>{title}</h4>
      <p>{description}</p>

      <a href={"/blog/" + blogKey}>Visitar</a>
      <hr />
    </article>
  );
};

export default MinicardBlog;
