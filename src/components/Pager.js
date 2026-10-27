import React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from "lucide-react";
import "../css/pager.css";

const Pager = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  pageSize,
  onPageSizeChange
}) => {

  // 🔥 Smart pagination (only 5 pages)
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pager-container">

      {/* LEFT INFO */}
      <div className="pager-left">
        Page <b>{currentPage + 1}</b> of <b>{totalPages}</b> ({totalItems} items)
      </div>

      {/* CENTER PAGINATION */}
      <div className="pager-center">

        {/* FIRST */}
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(0)}
          className="pager-btn"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* PREV */}
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
          className="pager-btn"
        >
          <ChevronLeft size={14} />
        </button>

        {/* FIRST PAGE + DOTS */}
        {currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(0)}
              className="pager-number"
            >
              1
            </button>
            {currentPage > 3 && <span className="dots">...</span>}
          </>
        )}

        {/* MIDDLE PAGES */}
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pager-number ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* LAST PAGE + DOTS */}
        {currentPage < totalPages - 3 && (
          <>
            {currentPage < totalPages - 4 && (
              <span className="dots">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages - 1)}
              className="pager-number"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
          className="pager-btn"
        >
          <ChevronRight size={14} />
        </button>

        {/* LAST */}
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(totalPages - 1)}
          className="pager-btn"
        >
          <ChevronsRight size={14} />
        </button>

      </div>

      {/* RIGHT PAGE SIZE */}
      <div className="pager-right">
        Page Size:
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[5, 10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default Pager;