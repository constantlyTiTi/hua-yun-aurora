import React from "react";

const Footer = () => {
  return (
    <footer className="bottom-0 mx-auto w-full flex-none rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://huayunaurora.ca/" className="hover:underline">
            HUA-YUN-AURORA
          </a>
          . All Rights Reserved. Developed by Ting Li.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
