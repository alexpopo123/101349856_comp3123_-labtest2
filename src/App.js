import axios from "axios";
import {useState} from "react";
import './App.css';
import NavInshorts from "./components/NavInshorts";
import NewsContent from "./components/NewsContent/NewsContent"
import apikey from "./data/config";
import Footer from "./components/Footer/Footer";

function App() {

  const [category, setCategory] = useState("genreral");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);

  const newsApi = async () => {
    try{
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const news = await axios.get(
        `${proxyUrl}https://newsapi.org/v2/top-headlines?country=ca&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${loadMore}&category=${category}`
        
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    }
    catch (error){
      console.log(error);
    }
  };
  useEffect(() => {
    newsApi();
  }, [newsResults, loadMore, category]);

  return (
      <div className="App" id="#home">
      <NavInshort setCategory={setCategory} />
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
  }
export default App;
