const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6 text-gray-600 text-sm flex flex-col items-center">
      <span>
        <span className="text-gray-400 mt-1">WorkNest</span> © {currentYear} Kamran Khan. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
