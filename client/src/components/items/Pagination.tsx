import React from 'react';
import { PaginationProps } from '../../interfaces/items';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   if (totalPages <= 1) return null;

   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

   return (
      <div className="pagination">
         {pages.map((page) => (
            <button
               key={page}
               onClick={() => onPageChange(page)}
               className={`${page === currentPage ? 'active' : ''} noselect`}
            >
               {page}
            </button>
         ))}
      </div>
   );
};
