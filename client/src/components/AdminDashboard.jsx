import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth || {});
  const { users = [] } = useSelector((state) => state.user || {});
  const { books = [] } = useSelector((state) => state.book || {});
  const { allBorrowedBooks = [] } = useSelector((state) => state.borrow || {});

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState(books.length || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    setTotalUsers(users.filter((u) => u.role === "User").length);
    setTotalAdmin(users.filter((u) => u.role === "Admin").length);
    setTotalBorrowedBooks(
      allBorrowedBooks.filter((b) => b.returnDate === null).length
    );
    setTotalReturnedBooks(
      allBorrowedBooks.filter((b) => b.returnDate !== null).length
    );
  }, [users, allBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#1619cc", "#2079c2"], // Keeping original chart colors
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-6 pt-28 font-inter bg-gray-100 min-h-screen">
      {" "}
      {/* Adjusted padding, added font, and a light background */}
      <Header />
      <div className="flex flex-col-reverse xl:flex-row gap-6">
        {" "}
        {/* Consistent gap */}
        {/* Left: Chart + Stats */}
        <div className="flex-[2] flex flex-col gap-6 py-4">
          {/* Chart Container - Applied consistent card styling */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {" "}
            {/* Consistent card styling */}
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">
              Book Borrowing Overview
            </h3>{" "}
            {/* Added a title for the chart */}
            <Pie
              data={data}
              options={{ cutout: 0 }}
              className="w-full h-auto"
            />
          </div>

          {/* Legend/Info Card - Applied consistent card styling */}
          <div className="flex items-center bg-white rounded-2xl shadow-xl p-6 gap-4">
            {" "}
            {/* Consistent card styling */}
            <img src={logo} alt="logo" className="w-12 h-12" />{" "}
            {/* Slightly larger logo */}
            <span className="w-[2px] bg-gray-300 h-16 rounded-full"></span>{" "}
            {/* Adjusted separator */}
            <div className="flex flex-col gap-2 text-base">
              {" "}
              {/* Adjusted text size */}
              <p className="flex gap-2 items-center text-gray-700 font-medium">
                <span className="w-3 h-3 rounded-full bg-[#1619cc] shadow-sm"></span>{" "}
                Borrowed Books
              </p>
              <p className="flex gap-2 items-center text-gray-700 font-medium">
                <span className="w-3 h-3 rounded-full bg-[#2079c2] shadow-sm"></span>{" "}
                Returned Books
              </p>
            </div>
          </div>
        </div>
        {/* Right: Summary Cards + Admin Info */}
        <div className="flex-[4] flex flex-col gap-6 xl:px-6 xl:py-4">
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            {" "}
            {/* Consistent gap */}
            <div className="flex flex-col gap-6 flex-1">
              {" "}
              {/* Consistent gap */}
              {/* Users Card - Applied consistent card styling */}
              <div className="flex items-center bg-white p-6 rounded-2xl shadow-xl gap-6">
                {" "}
                {/* Consistent card styling */}
                <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-center shadow-md">
                  {" "}
                  {/* Consistent icon container styling */}
                  <img src={usersIcon} alt="users" className="w-7 h-7" />{" "}
                  {/* Slightly larger icon */}
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#2C3E50]">
                    {totalUsers}
                  </p>{" "}
                  {/* Consistent heading style */}
                  <span className="text-base text-gray-600 font-medium">
                    Users
                  </span>{" "}
                  {/* Consistent text style */}
                </div>
              </div>
              {/* Books Card - Applied consistent card styling */}
              <div className="flex items-center bg-white p-6 rounded-2xl shadow-xl gap-6">
                {" "}
                {/* Consistent card styling */}
                <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-center shadow-md">
                  {" "}
                  {/* Consistent icon container styling */}
                  <img src={bookIcon} alt="books" className="w-7 h-7" />{" "}
                  {/* Slightly larger icon */}
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#2C3E50]">
                    {totalBooks}
                  </p>{" "}
                  {/* Consistent heading style */}
                  <span className="text-base text-gray-600 font-medium">
                    Books
                  </span>{" "}
                  {/* Consistent text style */}
                </div>
              </div>
              {/* Admins Card - Applied consistent card styling */}
              <div className="flex items-center bg-white p-6 rounded-2xl shadow-xl gap-6">
                {" "}
                {/* Consistent card styling */}
                <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-center shadow-md">
                  {" "}
                  {/* Consistent icon container styling */}
                  <img src={adminIcon} alt="admins" className="w-7 h-7" />{" "}
                  {/* Slightly larger icon */}
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#2C3E50]">
                    {totalAdmin}
                  </p>{" "}
                  {/* Consistent heading style */}
                  <span className="text-base text-gray-600 font-medium">
                    Admins
                  </span>{" "}
                  {/* Consistent text style */}
                </div>
              </div>
            </div>
            {/* Admin Profile Card - Applied consistent card styling */}
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center flex-1 text-center">
              {" "}
              {/* Consistent card styling */}
              <img
                src={
                  user?.avatar?.url ||
                  "https://placehold.co/96x96/e0e0e0/ffffff?text=User"
                } /* Added placeholder fallback */
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm" /* Consistent avatar styling */
              />
              <h3 className="text-xl font-extrabold text-[#2C3E50] mt-4 mb-2">
                {user?.name || "Admin"}
              </h3>{" "}
              {/* Consistent heading style, adjusted margin */}
              <p className="text-sm text-gray-600 font-medium">
                Welcome back, here's a snapshot of current stats.
              </p>
            </div>
          </div>

          {/* Quote Card - Applied consistent card styling */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center text-lg font-semibold text-gray-800 relative">
            {" "}
            {/* Consistent card styling */}
            <h4>
              “Empowering through knowledge. Lead with wisdom, grow with books.”
            </h4>
            <p className="text-sm text-gray-500 absolute bottom-2 right-4"></p>{" "}
            {/* Kept original quote attribution style */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
