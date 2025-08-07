import { getAllUsers } from "@/features/users/allUsersSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Paginations = () => {
  const { isPagination } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  return (
    <>
      {isPagination && (
        <div className="flex gap-2 mt-6 items-center">
          {/* prev button */}
          <button
            className="px-4 py-1 rounded-full border border-blue-200 dark:border-blue-800 bg-transparent text-blue-700 dark:text-blue-200 font-semibold disabled:opacity-50 hover:bg-blue-50 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            disabled={!isPagination.prevPage}
            onClick={() =>
              dispatch(getAllUsers({ page: isPagination.prevPage }))
            }
          >
            Prev
          </button>

          {/* page numbers */}
          {Array.from({ length: isPagination.totalPage }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                className={`mx-0.5 px-4 py-1 rounded-full border transition-all font-bold focus:outline-none focus:ring-2 focus:ring-blue-300
                  ${
                    isPagination.currPage === pageNumber
                      ? "border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-200 bg-transparent"
                      : "border-blue-200 dark:border-blue-800 text-blue-500 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900"
                  }
                `}
                key={pageNumber}
                onClick={() => dispatch(getAllUsers({ page: pageNumber }))}
              >
                {pageNumber}
              </button>
            )
          )}

          {/* next button */}
          <button
            className="px-4 py-1 rounded-full border border-blue-200 dark:border-blue-800 bg-transparent text-blue-700 dark:text-blue-200 font-semibold disabled:opacity-50 hover:bg-blue-50 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            disabled={!isPagination.nextPage}
            onClick={() =>
              dispatch(getAllUsers({ page: isPagination.nextPage }))
            }
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Paginations;
