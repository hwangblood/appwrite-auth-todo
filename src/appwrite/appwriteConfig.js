import { Client, Account, Databases } from "appwrite";

const projectID = process.env.REACT_APP_PROJECT_ID;
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const databaseId = process.env.REACT_APP_DATABASE_ID;
const collectionId = process.env.REACT_APP_COLLECTION_ID;

const client = new Client()
  .setEndpoint(apiEndpoint) // Your API Endpoint
  .setProject(projectID); // Your project ID

const account = new Account(client);

const databases = new Databases(client);

export { databaseId, collectionId, databases, account };
