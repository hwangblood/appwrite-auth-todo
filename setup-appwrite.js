const sdk = require("node-appwrite");

// Init SDK
const client = new sdk.Client();

const databases = new sdk.Databases(client);

// TODO Change to your own
const projectID = "63bf9980f0ba88ebca7d";
const apiEndpoint = "https://52a81f61.r2.cpolar.top/v1";
const apiKeySecret =
  "b30aff29b78408dc598041aea08b5b818b224e35c3153bf9e857f2fa57388ba0f06f92607f9cc3c1d89264515ed1e11e7d486a2b782869bfb71279bf5b0698bddb06c5662511c5cd89006d6a8637c5648f09e8a4e4f05dac7a054f0baed015ce06eaac707a813e7d3c5250d400d6d4dbfd121bac2446f6644828d116335ae285";

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

  for (let i = 1; i <= 10; i++) {
    await databases
      .createDocument(database.$id, collection.$id, sdk.ID.unique(), {
        name: `todo ${i}`,
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
}

setup();
