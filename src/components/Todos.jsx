import React, { useState, useEffect, cloneElement } from "react";

import {
  databaseId,
  collectionId,
  databases,
} from "../appwrite/appwriteConfig";

function Todos() {
  const [todos, setTodos] = useState(null);

  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);

    function fetchTodos() {
      const promise = databases.listDocuments(databaseId, collectionId);
      promise
        .then(
          function (response) {
            console.log(response); // Success
            setTodos(response.documents);
          },
          function (error) {
            console.log(error); // Failure
          }
        )
        .finally(() => {
          setloader(false);
        });
    }
    fetchTodos();
  }, []);

  function fetchTodos() {
    const promise = databases.listDocuments(databaseId, collectionId);
    promise
      .then(
        function (response) {
          console.log(response); // Success
          setTodos(response.documents);
        },
        function (error) {
          console.log(error); // Failure
        }
      )
      .finally(() => {
        setloader(false);
      });
  }

  const handleDelete = (documentId) => {
    const promise = databases.deleteDocument(
      databaseId,
      collectionId,
      documentId
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        fetchTodos();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {todos &&
            todos.map((item) => (
              <div key={item.$id}>
                <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                  <div>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <span
                      className="text-red-400 cursor-pointer"
                      onClick={(e) => handleDelete(item.$id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
