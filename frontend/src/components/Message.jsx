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
          throw new Error("failed to fetch"); // add a component for this part to show error
        }
        setData(response.data);
      } catch (error) {
        console.log("Error fetching the data", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      {data ? (
        <div>
          <p>Text: {data.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
