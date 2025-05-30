// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
}