import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaExclamation, FaClipboard } from "react-icons/fa6";

function calculateUploadTime(uploadTimestamp) {
  const uploadDate = new Date(uploadTimestamp);
  // const uploadDate = uploadTimestamp;
  console.log("Upload Time: ", uploadTimestamp);
  const currentDate = new Date();
  console.log("Current Time: ", currentDate);

  const differenceInMilliseconds = currentDate - uploadDate;
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

  console.log("Difference in minutes: ", differenceInMinutes);

  return `Uploaded ${differenceInMinutes} minute${
    differenceInMinutes > 1 ? "s" : ""
  } ago`;
}

function calculateExpiryTime(expiryTimestamp) {
  const expiryDate = new Date(expiryTimestamp);
  const currentDate = new Date();

  const differenceInMilliseconds = expiryDate - currentDate;
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

  if (differenceInMinutes < 0) {
    return "Expires in: Never";
  } else {
    return `Expires in ${differenceInMinutes} minute${
      differenceInMinutes > 1 ? "s" : ""
    }`;
  }
}

export default function Message() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadTime, setUploadTime] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const textRef = useRef();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textRef.current.innerText);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${id}`);
        if (!response.data) {
          throw new Error("Failed to fetch");
        } else if (response.data.error) {
          setData({ error: true });
        } else {
          setData(response.data);
          setUploadTime(calculateUploadTime(response.data.uploadTime));
          setExpiryTime(calculateExpiryTime(response.data.expiryTime));
        }
      } catch (error) {
        console.log("Error fetching the data", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="bg-nav-color h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 lg:w-3/4">
        {data ? (
          data.error ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">
                Snippet has expired
              </h1>
              <p className="text-white">
                This snippet has expired and is no longer available.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gray-700 border border-gray-900 rounded-lg p-6 overflow-auto max-h-96">
                <div>
                  <h2 className="text-lg text-white font-bold mb-1">
                    {data.title}
                  </h2>
                  <p className="text-sm text-gray-400">{uploadTime}</p>
                  <p className="text-sm text-gray-400">{expiryTime}</p>
                </div>

                <pre
                  ref={textRef}
                  className="whitespace-pre-wrap text-white p-4">
                  {data.text}
                </pre>
              </div>
              <div className="flex justify-between items-center mt-4">
                {/* <p className="text-white">{uploadTime}</p> */}
                <button
                  onClick={copyToClipboard}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  <FaClipboard className="inline-block mr-2" />
                  Copy to clipboard
                </button>
              </div>
              {showPopup && (
                <div className="absolute mt-2 bg-green-500 text-white p-2 rounded">
                  <FaExclamation className="inline-block" />
                  Text copied to clipboard
                </div>
              )}
            </>
          )
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
