import React from 'react';
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import './table.css';
import { GlobalFilter } from '../tablefilter/tablefilter';
import { Flecha } from './../flecha/Flecha';

export function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const table = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination // useFilters! // useGlobalFilter!
  );
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page, // rows for the table based on the data passed
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = table;
  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div className="table-container-div">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className="backend-tables">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'desc'
                        : 'asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-options">
        <div className="tableopt-flechas">
          <Flecha
            color="blue"
            direction="left"
            onClick={() => gotoPage(0)}
            disable={!canPreviousPage}
            adminTable="true"
          />
          <Flecha
            color="blue"
            direction="left"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />
        </div>

        <p>
          Page {pageIndex + 1} of {pageOptions.length} | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </p>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>

        <div className="tableopt-flechas">
          <Flecha
            color="blue"
            direction="right"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          />
          <Flecha
            color="blue"
            direction="right"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            adminTable="true"
          />
        </div>
      </div>
    </div>
  );
}
