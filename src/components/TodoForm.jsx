import React, { useState } from "react";

import {
  databaseId,
  collectionId,
  databases,
} from "../appwrite/appwriteConfig";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = databases.createDocument(
      databaseId,
      collectionId,
      "unique()",
      {
        name: todo,
      }
    );
    promise.then(
      function (response) {
        console.log(response); // Success
        setTodo("");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
        action=""
        className="flex justify-center mb-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
