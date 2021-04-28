import React, { useEffect, useState } from "react";
import data from "./data.json";
import Fuse from "fuse.js";
import Item from "./item";

const SettingsPage = () => {
  const [searchData, setSearchData] = useState([]);
  const formatData = (d) => {
    let data = []
    for(let i in d){
      data.push({"time": i, "tweet": d[i]})
    }
    return data
  }
  useEffect(() => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://vaxhunterscan.gdoyle6.workers.dev/data", requestOptions)
      .then(response => response.json())
      .then(result => setSearchData(formatData(result)))
      .catch(error => console.log('error', error));
  });
  const searchItem = (query) => {
    if (!query) {
      setSearchData(data);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["tweet"]
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  };
  return (
    <div>
      <p className="title">Tweets</p>
      <div className="search-container">
        <input
          type="search"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search Tweets"
        />
      </div>

      <div className="item-container">
        {searchData.map((item) => (
          <Item {...item} key={item.time} />
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
