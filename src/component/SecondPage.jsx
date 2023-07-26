import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const SecondPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Retrieve the form data from local storage
  const storedFormData = localStorage.getItem("formData");
  const formData = storedFormData ? JSON.parse(storedFormData) : null;

  // If form data is missing, redirect back to the first page with an error message

  useEffect(() => {
    if (!formData) {
      alert("pls fill");
      navigate("/");
    } else {
      // Fetch data from the API
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [formData, navigate]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Post List</h2>
      {posts.length > 0 ? (
        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SecondPage;
