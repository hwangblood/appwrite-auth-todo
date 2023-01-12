const sdk = require("node-appwrite");
require("dotenv").config();

// Init SDK
const client = new sdk.Client();

const databases = new sdk.Databases(client);
console.log(process.env);
const projectID = process.env.REACT_APP_PROJECT_ID;
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiKeySecret = process.env.REACT_APP_API_KEY_SECRET;

client
  .setEndpoint(apiEndpoint) // Your API Endpoint
  .setProject(projectID) // Your project ID
  .setKey(apiKeySecret) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert

async function deleteAllDatabases() {
  const databasesList = await databases.list().then(
    function (response) {
      return response.databases;
    },
    function (error) {
      console.log(error);
    }
  );

  for (let i = 0; i < databasesList.length; i++) {
    const element = databasesList[i];

    await databases.delete(element.$id).then(
      function (response) {
        // return nothing if promise is successful
        // console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }
}

async function setup() {
  await deleteAllDatabases();
  console.log("Delete all existing databases.");

  const database = await databases.create(sdk.ID.unique(), "Todos").then(
    function (response) {
      console.log(
        `Created Database '${response.name}' with id '${response.$id}'.`
      );
      return response;
    },
    function (error) {
      console.log(error);
    }
  );

  const collection = await databases
    .createCollection(database.$id, sdk.ID.unique(), "todo")
    .then(
      function (response) {
        console.log(
          `Created Collection '${response.name}' with id '${response.$id}'.`
        );
        return response;
      },
      function (error) {
        console.log(error);
      }
    );

  await databases
    .createStringAttribute(database.$id, collection.$id, "name", 256, true)
    .then(
      function (response) {
        console.log(`Created StringAttribute with key '${response.key}'.`);
      },
      function (error) {
        console.log(error);
      }
    );

  await databases
    .createDocument(database.$id, collection.$id, sdk.ID.unique(), {
      name: `Hello Appwrite!`,
    })
    .then(
      function (response) {
        console.log(
          `Created Document '${response.name}' with id '${response.$id}'`
        );
        return response;
      },
      function (error) {
        console.log(error);
      }
    );
}

// setup();
