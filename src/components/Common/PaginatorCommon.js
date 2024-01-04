import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { map } from "lodash";
import Spacer from "./Spacing";

const numberOfItemsEachPageOptions = [5, 10, 20, 40, 80, 120];

function PaginatorCommon({
  onSwitchPageClick,
  onChangeNumberOfItems,
  totalPage,
  currentPage = 1,
  numberOfItemsEachPage,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Pagination
      className="pagination pagination-rounded justify-content-center py-2 px-1"
      listClassName="mb-0 align-items-center"
    >
      <Dropdown
        className="border-0"
        isOpen={dropdownOpen}
        toggle={() => {
          setDropdownOpen(prev => !prev);
        }}
      >
        <DropdownToggle
          className="border-0"
          style={{ backgroundColor: "#556ee6" }}
          caret
        >
          {numberOfItemsEachPage}
        </DropdownToggle>
        <DropdownMenu>
          {numberOfItemsEachPageOptions.map(numberOfItems => (
            <DropdownItem
              key={`key-${numberOfItems}`}
              onClick={() => {
                onChangeNumberOfItems(numberOfItems);
              }}
            >
              {numberOfItems}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Spacer size={20} />
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => onSwitchPageClick(currentPage - 1)}
        />
      </PaginationItem>
      {map(Array(totalPage), (item, i) => (
        <PaginationItem active={i + 1 === currentPage} key={"key-" + i}>
          <PaginationLink onClick={() => onSwitchPageClick(i + 1)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPage}>
        <PaginationLink
          next
          onClick={() => onSwitchPageClick(currentPage + 1)}
        />
      </PaginationItem>
    </Pagination>
  );
}

PaginatorCommon.propTypes = {
  onSwitchPageClick: PropTypes.func,
  onChangeNumberOfItems: PropTypes.func,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  numberOfItemsEachPage: PropTypes.number,
};

export default PaginatorCommon;
