import React, { useState, useEffect } from "react";
import axios from "axios";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/api/students");
        setStudents(res.data);
      } catch (err) {
        setError("Error fetching students data.");
        console.error(err.message);
      }
    };
    fetchStudents();
    const interval = setInterval(fetchStudents, 5000); // Har 5 second me refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-800">
        Student Directory
      </h1>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4 text-center">
          {error}
        </p>
      )}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Fees Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 animate-stagger-in">
            {students.map((student, index) => (
              <tr
                key={student._id}
                className="hover:bg-slate-50 transition-colors duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">
                        {student.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold leading-5 rounded-full ${
                      student.feesPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {student.feesPaid ? "Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudents;
