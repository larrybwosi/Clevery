// function checkEnvVariable(variableName: string): string {
//   const variable = process.env[variableName];
//   if (typeof variable === 'undefined') {
//     throw new Error(`${variableName} is not defined`);
//   }
//   return variable;
// }

const NEXT_APPWRITE_PROJECT_ID='larrydean'
const NEXT_APPWRITE_URL='https://cloud.appwrite.io/v1'
const NEXT_APPWRITE_DATABASE_ID='dean'
const NEXT_APPWRITE_STORAGE_ID='653dfd05ecb921141aa7'
const NEXT_APPWRITE_POST_COLLECTION_ID='653df0d33a965de64c95'
const NEXT_APPWRITE_SAVES_COLLECTION_ID='653df13534634b56acd0'
const NEXT_APPWRITE_USER_COLLECTION_ID='653df10ef0ef3b9f14db'
export const projectId = NEXT_APPWRITE_PROJECT_ID
export const projectUrl = NEXT_APPWRITE_URL
export const databaseId = NEXT_APPWRITE_DATABASE_ID
export const storageId = NEXT_APPWRITE_STORAGE_ID
export const postCollectionId = NEXT_APPWRITE_POST_COLLECTION_ID
export const userCollectionId = NEXT_APPWRITE_USER_COLLECTION_ID
export const savesCollectionId = NEXT_APPWRITE_SAVES_COLLECTION_ID

// export const projectId = assertValue('NEXT_APPWRITE_PROJECT_ID');
// export const projectUrl = checkEnvVariable('NEXT_APPWRITE_URL');
// export const databaseId = checkEnvVariable('NEXT_APPWRITE_DATABASE_ID');
// export const storageId = checkEnvVariable('NEXT_APPWRITE_STORAGE_ID');
// export const postCollectionId = checkEnvVariable('NEXT_APPWRITE_POST_COLLECTION_ID');
// export const userCollectionId = checkEnvVariable('NEXT_APPWRITE_USER_COLLECTION_ID');
// export const savesCollectionId = checkEnvVariable('NEXT_APPWRITE_SAVES_COLLECTION_ID');
// export const projectId = assertValue(
//   process.env.NEXT_APPWRITE_PROJECT_ID,
//   'Missing environment variable: NEXT_APPWRITE_PROJECT_ID'
// )

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}