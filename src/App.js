import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

function App() {
  const [offset, setOffset] = useState(1);
  const [posts, setAllPosts] = useState([]);
  //To filtering The Name
  const updateInputValue = (e) => {
    let filteredData = posts.filter((value) => {
      return value.name.toLowerCase().indexOf(e.target.value) != -1;
    });
    setAllPosts(filteredData);
  };
  //Fetching the API
  const getAllPosts = () => {
    fetch(`https://api.punkapi.com/v2/beers?page=${offset}&per_page=10`)
      .then((response) => response.json())
      .then((actualData) => setAllPosts(actualData));
  };
  //Event for pagination
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getAllPosts(offset);
  }, [offset]);

  return (
    <div className="main-app">
      <input
        type="text"
        name="fname"
        id="myInput"
        placeholder="Search"
        onChange={(e) => updateInputValue(e)}
      />
      <table>
        <tr>
          <th>S.NO</th>
          <th>Product</th>
          <th>Name</th>
          <th>Tagline</th>
          <th>Attenuation_level</th>
        </tr>
        {posts.map((item, index) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>
                <img src={item.image_url} width="100" height="100" />
              </td>
              <td>{item.name} </td>
              <td>{item.tagline}</td>
              <td>{item.attenuation_level}</td>
            </tr>
          );
        })}
      </table>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={10}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
