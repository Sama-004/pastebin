import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Message() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${id}`);
        if (!response.data) {
          throw new Error("failed to fetch");
        } else if (response.data.error) {
          return (
            <>
              <div className="bg-nav-color v-screen flex justify-center items-center">
                <div className="container mx-auto px-2 lg:w-3/4">
                  <div>
                    <h1 className="text-3xl font-bold text-center text-gradient">
                      Snippet has expired
                    </h1>
                    <p className="text-center">
                      This snippet has expired and is no longer available.
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }
        setData(response.data);
      } catch (error) {
        console.log("Error fetching the data", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="bg-nav-color v-screen flex justify-center items-center">
      <div className="container mx-auto px-2 lg:w-3/4">
        {data ? (
          <div className="border border-gray-900 rounded-lg p-2 mb-6 bg-gray-700">
            <pre className="whitespace-pre-wrap text-black border rounded border-blue-900 bg-white">
              {data.text}
            </pre>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center text-gradient">
              Snippet has expired
            </h1>
            <p className="text-center">
              This snippet has expired and is no longer available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
