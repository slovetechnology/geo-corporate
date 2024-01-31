// import React from 'react'

// const AllPagination = ({flightPerPage, totalFlights, paginatePage, currentPage}) => {
//     const pageNumbers = []

//     for(let i = 1; i <= Math.ceil(totalFlights / flightPerPage); i++) {
//         pageNumbers.push(i)
//     }
//   return (
//     <div>
//         <div className="">
//             <div className="flex items-center gap-4 justify-end">
//                 {pageNumbers.map((num, i) => (
//                     <div onClick={() => paginatePage(num)} className={`${currentPage === num ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'} border border-slate-400 px-3 hover:bg-blue-700 capitalize hover:text-white py-1 cursor-pointer text-sm rounded-lg`} key={i}>{num}</div>
//                 ))}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AllPagination

import React from 'react';

const AllPagination = ({ flightPerPage, totalFlights, paginatePage, currentPage }) => {
  const pageNumbers = [];
  const ellipsisThreshold = 5;

  for (let i = 1; i <= Math.ceil(totalFlights / flightPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (pageNumbers.length <= ellipsisThreshold * 2 + 1) {
      // If there are fewer pages than the threshold, display all page numbers
      return pageNumbers.map((num, i) => (
        <div
          onClick={() => paginatePage(num)}
          className={`${currentPage === num ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'} border border-slate-400 px-3 hover:bg-blue-700 capitalize hover:text-white py-1 cursor-pointer text-sm rounded-lg`}
          key={i}
        >
          {num}
        </div>
      ));
    }

    // Display ellipses logic
    const renderedPages = [];
    let startPage = currentPage - ellipsisThreshold;
    let endPage = currentPage + ellipsisThreshold;

    if (startPage < 1) {
      startPage = 1;
      endPage = startPage + ellipsisThreshold * 2;
    } else if (endPage > pageNumbers.length) {
      endPage = pageNumbers.length;
      startPage = endPage - ellipsisThreshold * 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      renderedPages.push(
        <div
          onClick={() => paginatePage(i)}
          className={`${currentPage === i ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'} border border-slate-400 px-3 hover:bg-blue-700 capitalize hover:text-white py-1 cursor-pointer text-sm rounded-lg`}
          key={i}
        >
          {i}
        </div>
      );
    }

    if (startPage > 1) {
      renderedPages.unshift(<div key="ellipsis-start">...</div>);
    }

    if (endPage < pageNumbers.length) {
      renderedPages.push(<div key="ellipsis-end">...</div>);
    }

    return renderedPages;
  };

  return (
    <div>
      <div className="">
        <div className="flex items-center gap-4 justify-end">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
};

export default AllPagination;
