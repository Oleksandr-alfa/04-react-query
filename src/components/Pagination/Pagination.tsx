import css from "./Pagination.module.css";

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as
  ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  setPage: (newPage: number) => void;
}

// Далі в jsx використувуємо компонент ReactPaginate звичайним чином.
export default function Pagination({totalPages, currentPage, setPage}: PaginationProps) {
  
    return (
         <ReactPaginate
        pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setPage(selected + 1)}
forcePage={currentPage - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"
/>
    )
}