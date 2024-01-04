import PropTypes from "prop-types";
import { useState } from "react";

const getTotalPages = (data, numberOfItemsEachPage) => {
  let quotient = Math.floor(data.length / numberOfItemsEachPage);
  const remainder = data.length % numberOfItemsEachPage;
  return remainder === 0 ? quotient : ++quotient;
};

const getCurrentItems = (data, currentPage, numberOfItemsEachPage) => {
  const startIndex =
    numberOfItemsEachPage * currentPage - numberOfItemsEachPage;
  const items = [...data];
  return items.splice(startIndex, numberOfItemsEachPage);
};

function usePagination(data, initialNumberOfItemsEachPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfItemsEachPage, setNumberOfItemsEachPage] = useState(
    initialNumberOfItemsEachPage
  );

  const totalPages = getTotalPages(data, numberOfItemsEachPage);
  const currentItems = getCurrentItems(
    data,
    currentPage,
    numberOfItemsEachPage
  );

  return {
    currentItems,
    totalPages,
    currentPage,
    numberOfItemsEachPage,
    setCurrentPage,
    setNumberOfItemsEachPage,
  };
}

usePagination.propTypes = {
  data: PropTypes.array,
  initialNumberOfItemsEachPage: PropTypes.number,
};

export default usePagination;
