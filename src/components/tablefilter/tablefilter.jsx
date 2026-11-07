import React from 'react';
//import {matchSorter} from "match-sorter";
import './tablefilter.css';
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <label className="table-filter-label">
      Buscar elemento:{' '}
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </label>
  );
};
