import { projectId, projectUrl,userCollectionId,savesCollectionId,postCollectionId ,storageId,databaseId} from './env';
import { Client,Account,Avatars ,Storage,Databases} from "appwrite"


export const appwriteConfig = {
    projectId,
    url:projectUrl,
    databaseId,
    storageId,
    userCollectionId,
    postCollectionId,
    savesCollectionId,
}
 
export const client = new Client();
client.setProject(appwriteConfig.projectId)
client.setEndpoint("https://cloud.appwrite.io/v1")


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);