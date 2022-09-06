import "./styles/News.css";

const News = ({ headlines, darkMode }) => {
  return (
    <div className="home__headlines">
      <h2>Latest Headlines</h2>
      {headlines.map((headline, i) => {
        if (i < 15 && headline.urlToImage !== null) {
          return (
            <a
              className={`home__headline ${darkMode ? "dark" : null}`}
              key={i}
              href={headline.url}
              target="_blank"
              rel="noreferrer"
              style={darkMode ? { color: "#fff" } : null}
            >
              <img src={headline.urlToImage} alt="" width={"150px"} />
              <div>
                <h3>{headline.title}</h3>
                <span>{headline.source.name}</span>
              </div>
            </a>
          );
        }
        return null;
      })}
    </div>
  );
};

export default News;
