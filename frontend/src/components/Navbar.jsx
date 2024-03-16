function Nav() {
  return (
    <>
      <nav className="bg-nav-color border-gray-200 dark:bg-nav-color">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pastebin
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white bg-nav-color rounded md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 px-3 text-white bg-nav-color rounded hover:bg-gray-100 md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="block py-2 px-3 text-white bg-nav-color rounded hover:bg-gray-100 md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3 text-white bg-nav-color rounded hover:bg-gray-100 md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
