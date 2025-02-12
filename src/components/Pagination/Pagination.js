import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  margin: 0 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? '#2196f3' : 'white'};
  color: ${props => props.active ? 'white' : '#2196f3'};
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </PageButton>

      {pageNumbers.map(number => (
        <PageButton
          key={number}
          onClick={() => onPageChange(number)}
          active={number === currentPage}>
          {number}
        </PageButton>
      ))}
        <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </PageButton>
    </PaginationContainer>
  )
};

export default Pagination;