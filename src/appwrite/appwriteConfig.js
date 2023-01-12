import { Client, Account, Databases, ID } from "appwrite";

// TODO Change to your own
const projectID = "63bf9980f0ba88ebca7d";
const apiEndpoint = "https://52a81f61.r2.cpolar.top/v1";
const databaseId = "63bfe985e1e9a4caf61f";

const client = new Client()
  .setEndpoint(apiEndpoint) // Your API Endpoint
  .setProject(projectID); // Your project ID

export const account = new Account(client);

export const databases = new Databases(client);
