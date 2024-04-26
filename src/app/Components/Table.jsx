"use client";

import { styled } from "styled-components";

const Styledtable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #aaa;
    font-weight: normal;
    font-size: 0.7rem;
  }
  td {
    border-top: 1px solid #fdf0d5;
  }
`;

function Table(props) {
  return <Styledtable {...props} />;
}

export default Table;
