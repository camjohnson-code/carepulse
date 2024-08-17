'use server';

import { ID, Query } from 'node-appwrite';
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENTS_COLLECTION_ID, PROJECT_ID, storage, users } from '../appwrite.config';
import { parseStringify } from '../utils';

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const blobFile = identificationDocument?.get('blobFile') as Blob;
      const fileName = identificationDocument?.get('fileName') as string;
      const fileObject = new File([blobFile], fileName, {
        type: blobFile.type,
      });

      file = await storage.createFile(BUCKET_ID!, ID.unique(), fileObject);
    }

    const newPatient = await databases.createDocument(DATABASE_ID!, PATIENTS_COLLECTION_ID!, ID.unique(), {
      identificationDocumentId: file?.$id || null,
      identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      ...patient,
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
