export default function Pastebin() {
  return (
    <div className="flex flex-col justify-center h-full bg-nav-color">
      <div className="ml-40 mt-4">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-large text-gray-900 dark:text-white">
          New Paste
        </label>
        <textarea
          label="New paste"
          id="message"
          rows="4"
          className="p-2.5 text-sm text-gray-900 bg-nav-color border border-gray-300 rounded-md shadow-inner font-mono focus:ring-blue-500 focus:border-blue-500 dark:bg-nav-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          style={{
            width: "600px",
            lineHeight: "21px",
            overflowWrap: "break-word",
            height: "300px",
            tabSize: "4",
            MozTabSize: "4",
            OTabSize: "4",
            WebkitTabSize: "4",
          }}></textarea>
      </div>
      <div className="ml-40 flex justify-between items-center">
        <div className="flex items-center">
          <label
            htmlFor="time"
            className="text-sm font-medium text-gray-900 dark:text-white mr-2">
            Expires :
          </label>
          <select
            id="time"
            className="p-2 border border-gray-300 rounded-md shadow-inner text-sm text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-nav-color dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="never">Never</option>
            <option value="15">in 15 seconds</option>
            <option value="2days">in 2 days</option>
          </select>
          {/* <button className="p-2.5 ml-80 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save
          </button> */}
          {/* <div className="ml-80 mt-4"> */}
          <button className="p-[0px] ml-60 w-40 relative rounded-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2 bg-cyan-500 rounded-[2px] relative group transition duration-200 text-white hover:bg-transparent">
              Save
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
