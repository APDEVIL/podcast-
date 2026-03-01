"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Copyright */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} CPH Rangers. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          <a
            href="#"
            className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
