import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [user, setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = user.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(user.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    const url = "https://dummyjson.com/products";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUser(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
     if (currentPage !== nPage) {
       setCurrentPage(currentPage + 1);
     }
  }

  return (
    <div>
      <ul>
        {records.map((item, index) => {
          return (
            <h1 key={index}>
              {item.id}. {item.title}
            </h1>
          );
        })}
      </ul>
      <nav>
        <ul className="pagination">
          <li className="page-item" onClick={prevPage}>
            <a href="#" className="page-link">
              Previous
            </a>
          </li>
          {numbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={index}
              onClick={() => changePage(n)}
            >
              <a href="#" className="page-link">
                {n}
              </a>
            </li>
          ))}
          <li className="page-item" onClick={nextPage}>
            <a href="#" className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
