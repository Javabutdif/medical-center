import React from "react";
import { motion } from "framer-motion";

const UserGuideModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">User Guide</h2>
        <p className="mb-4">
          Here you can provide detailed instructions or a guide for the users.
        </p>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-primary text-white rounded-md"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default UserGuideModal;
