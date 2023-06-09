import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsersStart } from "../../features/slice/userSlice";
import CustomerItem from "./CustomerItem";
import PaginationTable from "../common/PaginationTable";

const CustomerList = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.user);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(getUsersStart());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return users.filter((item) => {
      return item.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
    });
  }, [q, users]);

  const start = itemsPerPage * (currentPage - 1);
  const finish = itemsPerPage * currentPage;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderListUsers = () => {
    if (isLoading) {
      return (
        <tr className="animate-pulse bg-white dark:bg-gray-800 dark:border-gray-700 ">
          <th scope="row" colSpan={5} className="px-6 py-4 text-center">
            Loading ...
          </th>
        </tr>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <tr className=" bg-white dark:bg-gray-800 dark:border-gray-700 ">
          <th scope="row" colSpan={5} className="px-6 py-4 text-center">
            No users found
          </th>
        </tr>
      );
    }

    return filteredItems.slice(start, finish).map((user) => {
      return (
        <CustomerItem
          email={user.email}
          name={user.name}
          role={user.role}
          isVerified={user.isVerified}
          verified={user.verified}
          verificationToken={user.verificationToken}
          _id={user._id}
          key={user._id}
        />
      );
    });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="sm:flex items-center justify-between p-4 bg-white dark:bg-gray-800">
          <div className="w-full">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex sm:mb-0 mb-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Action button</span>
              Action
              <svg
                className="w-3 h-3 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for users"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Verify Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Verify At
                </th>
              </tr>
            </thead>
            <tbody>{renderListUsers()}</tbody>
          </table>
        </div>
      </div>
      <PaginationTable
        start={start}
        finish={finish}
        totalPages={totalPages}
        nextPage={nextPage}
        previousPage={previousPage}
        totalItems={filteredItems.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};

export default CustomerList;
