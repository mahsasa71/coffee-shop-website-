import React from 'react';

export default function DataTable({ children, title }) {
  return (
    <div className="w-full p-4">
      
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          لیست <span className="text-orange-300">{title}</span>
        </h2>
      </div>

     
      <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200 table-auto text-sm md:text-base">
          {children}
        </table>
      </div>
    </div>
  );
}
