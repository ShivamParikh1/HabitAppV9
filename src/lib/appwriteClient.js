// src/lib/appwriteClient.js

import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("687073050007516b353d"); // Your Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
