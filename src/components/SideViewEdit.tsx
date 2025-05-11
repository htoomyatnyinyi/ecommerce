import React, { useState } from "react";

const SideViewEdit: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };

  return (
    <div className="relative">
      {/* Background Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`p-4 ${isOpen ? "blur-sm" : ""}`}>
        <h1 className="text-xl font-bold">Main Content</h1>
        <p>Some text or elements here...</p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit
        </button>
      </div>

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg 
          z-20 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Edit</h2>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-4 border rounded px-2 py-1"
            placeholder="Your name"
          />
          <button
            className="mt-auto px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              console.log("Saved:", formData);
              setIsOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideViewEdit;
