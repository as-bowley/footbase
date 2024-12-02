import "./styles/News.css";

const News = ({ headlines, darkMode }) => {
  return (
    <div className="home__headlines">
      <h2>Latest Headlines</h2>
      {headlines !== undefined &&
        headlines.map((headline, i) => {
          return (
            <a
              className={`home__headline ${darkMode ? "dark" : null}`}
              key={i}
              href={headline.link}
              target="_blank"
              rel="noreferrer"
              style={darkMode ? { color: "#fff" } : null}
            >
              <img src={headline.media} alt="" width={"150px"} />
              <div>
                <h3>{headline.title}</h3>
                <span>{headline.clean_url}</span>
              </div>
            </a>
          );
        })}
    </div>
  );
};

export default News;
