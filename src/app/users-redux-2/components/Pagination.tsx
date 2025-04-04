import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate range of pages to show
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center w-full py-4">
      <nav className="flex items-center gap-1 rounded-lg shadow-sm bg-white p-1">
        {/* Previous button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex cursor-pointer items-center justify-center h-10 w-10 rounded-md transition-colors ${
            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* First page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                currentPage === 1 ? 'bg-blue-400 cursor-text text-white' : 'cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && <span className="h-10 flex items-center justify-center text-gray-500">...</span>}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
              currentPage === page ? 'bg-blue-400 cursor-text text-white' : 'cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="h-10 flex items-center justify-center text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`flex cursor-pointer items-center justify-center h-10 w-10 rounded-md transition-colors ${
                currentPage === totalPages ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex cursor-pointer items-center justify-center h-10 w-10 rounded-md transition-colors ${
            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
