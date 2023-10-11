import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import SearchData from "../../components/SearchProduct/SearchData.jsx";
import css from "./Search.module.css";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]);

  const queryValue = queryParams.get("q");
  const currentPage = Number(queryParams.get("pageNumber")) || 1; // Extract the current page value from the URL

  useEffect(() => {
    if (!queryValue) {
      navigate("/"); // Redirect if queryValue is undefined
    }
  }, [queryValue, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/api/products/search?q=${queryValue}&pageNumber=${currentPage}`
      );
      const searchData = await response.json();
      setData(searchData);
    };

    fetchData();
  }, [queryValue, currentPage]);

  const handlePageChange = (event, page) => {
    navigate(`?q=${queryValue}&pageNumber=${page}`);
  };

  return (
      <div className={css.wrapper}>
        <div className={css.sidebar}>
          <Sidebar categories={data?.data} brand={data?.data} />
        </div>
        <div className={css.products}>
          {data?.data?.map((data2, index) => (
              <SearchData
                  key={index}
                  name={data2.name}
                  image={data2?.ImageModel?.link}
                  price={data2.price}
                  discountPrice={data2.discountPrice}
                  description={data2.description}
                  sold={data2.sold}
                  id={data2.id}
                  rating={data2.rating}
              />
          ))}
          <div className={css.pagination}>
            <Stack spacing={2}>
              <Pagination
                  count={data.totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                      <PaginationItem
                          icon={
                            item.type === "previous" ? (
                                <ArrowBackIcon />
                            ) : (
                                <ArrowForwardIcon />
                            )
                          }
                          component={item.type === "previous" || item.type === "next" ? "button" : "li"}
                          {...item}
                      />
                  )}
              />
            </Stack>
          </div>
        </div>
      </div>
  );
};

export default Search;