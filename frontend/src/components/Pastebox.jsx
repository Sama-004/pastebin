import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaClipboard, FaClock } from "react-icons/fa";
import { CiSaveUp2 } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Pastebin() {
  const [pasteValue, setPasteValue] = useState("");
  const [expiryTime, setExpiryTime] = useState("never");
  const [showModal, setShowModal] = useState(false);
  const [savedPasteId, setSavedPasteId] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Paste value:", pasteValue);
    console.log("Expiry time: ", expiryTime);
    try {
      const response = await axios.post("http://localhost:3000/save", {
        pasteValue,
        expiryTime,
        title,
      });
      const id = response.data._id;
      console.log(id);
      setSavedPasteId(id);
      setShowModal(true);
      console.log("submitted");
    } catch (error) {
      console.log("Error saving the document", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:5173/${savedPasteId}`);
    setCopyButtonText(<IoIosCheckmarkCircle />);
  };

  const handleExpiryChange = (value) => {
    setExpiryTime(value);
  };

  const goToPaste = () => {
    navigate(`/${savedPasteId}`);
  };

  return (
    <div className="flex flex-col justify-center h-full bg-nav-color p-10 text-xl">
      <div className="max-w-2x1 mx-auto flex flex-col">
        <label
          htmlFor="message"
          className="block mb-2 text-lg text-white font-bold">
          New Paste
        </label>
        <textarea
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2.5 mb-2 text-lg text-white bg-nav-color border border-gray-300 rounded-md shadow-inner font-mono focus:ring-blue-500 focus:border-blue-500 dark:bg-nav-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
          placeholder="Enter title here"
          style={{
            width: "600px",
            lineHeight: "21px",
            overflowWrap: "break-word",
            MozTabSize: "4",
            OTabSize: "4",
            WebkitTabSize: "4",
          }}
        />
        <textarea
          id="message"
          value={pasteValue}
          onChange={(e) => setPasteValue(e.target.value)}
          rows="4"
          className="p-2.5 text-sm text-white bg-nav-color border border-gray-300 rounded-md shadow-inner font-mono focus:ring-blue-500 focus:border-blue-500 dark:bg-nav-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your text here"
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
      <div className="flex justify-between items-center max-w-2x1 mx-auto mt-4 text-xl">
        <div className="flex items-center">
          <Select onValueChange={handleExpiryChange}>
            <SelectTrigger className="w-[180px]">
              <FaClock className="inline-block text-xl" />
              <SelectValue placeholder="Expires in" />
            </SelectTrigger>
            <SelectContent className="bg-nav-color text-white">
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="10seconds">10 Seconds</SelectItem>
              <SelectItem value="10minutes">10 minutes</SelectItem>
              <SelectItem value="2days">2 days</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={handleSave}
            className="p-[0px] ml-60 w-40 relative rounded-[2px] bold">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2 bg-cyan-500 rounded-[2px] relative group transition duration-200 text-white hover:bg-transparent">
              <CiSaveUp2 className="inline-block mr-3 text-xl" />
              Save
            </div>
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="mb-4 text-lg">Paste saved successfully!</p>
            <div className="flex justify-between">
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-md mr-4 ${
                  copyButtonText === "Copy Link"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}>
                {copyButtonText === "Copy Link" ? (
                  <>
                    <FaClipboard className="inline-block mr-1" />
                    Copy Link
                  </>
                ) : (
                  <>
                    <IoIosCheckmarkCircle className="inline-block mr-1" />
                    Copied
                  </>
                )}
              </button>
              <button
                onClick={goToPaste}
                className="px-4 py-2 bg-blue-500 text-white rounded-md">
                <MdOutlineArrowOutward className="inline-block mr-1 text-xl" />
                Go to Paste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
