import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function TextDetails({ match }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      const id = match.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/${id}`);
        setText(response.data.text);
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchText();
  }, [match]);

  return (
    <div>
      <h1>Saved Text</h1>
      <p>{text}</p>
    </div>
  );
}

TextDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function Pastebin() {
  const [pasteValue, setPasteValue] = useState("");
  const [expiryTime, setExpiryTime] = useState("never");
  const [id, setId] = useState(""); // Define id state

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Paste value:", pasteValue);
    try {
      console.log("submitted");
      const response = await axios.post("http://localhost:3000/save", {
        pasteValue,
      });
      const savedPasteId = response.data._id;
      console.log(savedPasteId);
      setId(savedPasteId); // Set id state after saving
    } catch (error) {
      console.log("Error saving the document", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full bg-nav-color">
      {id ? (
        <TextDetails match={{ params: { id } }} />
      ) : (
        <div className="ml-40 mt-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-large text-gray-900 dark:text-white">
            New Paste
          </label>
          <textarea
            label="New paste"
            id="message"
            value={pasteValue}
            onChange={(e) => setPasteValue(e.target.value)}
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
      )}
      <div className="ml-40 flex justify-between items-center">
        <div className="flex items-center">
          <label
            htmlFor="time"
            className="text-sm font-medium text-gray-900 dark:text-white mr-2">
            Expires :
          </label>
          <select
            id="time"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-inner text-sm text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-nav-color dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="never">Never</option>
            <option value="15">in 15 seconds</option>
            <option value="2days">in 2 days</option>
          </select>
          <button
            onClick={handleSave}
            className="p-[0px] ml-60 w-40 relative rounded-[2px]">
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
