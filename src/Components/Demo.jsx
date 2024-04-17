import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

function Demo() {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummery, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromStorage = JSON.parse(localStorage.getItem("articles"));

    if (articlesFromStorage) {
      setAllArticles(articlesFromStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummery({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="w-full max-w-lg mt-16">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center"
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 w-5 my-2 ml-3"
          />
          <input
            type="url"
            placeholder="Enter a URL..."
            className="url_input peer"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-grey-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allArticles.map((article, i) => (
            <div
              className="link_card"
              key={i}
              onClick={() => setArticle(article)}
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy btn"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 text-sm font-medium truncate font-satoshi text-secondary">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-full my-10">
        {isFetching ? (
          <img src={loader} alt="loader" className="object-contain w-20 h-20" />
        ) : error ? (
          <p className="font-bold text-center text-black font-inter">
            Whoops! That was not supposed to happen :( <br />
            <span className="font-normal text-gray-700 font-satoshi">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold font-satoshi">
                Article <span className="blue_secondary_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="text-sm font-medium text-gray-700 font-inter">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Demo;
