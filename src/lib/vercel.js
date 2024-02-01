import { UploadBlob } from '@vercel/next';

export const uploadImage = async (file) => {
  const upload = new UploadBlob({
    destination: Vercel.projectId, // Get your project ID from Vercel
    use: [/* 'cdn', 'functions' */] // Optionally specify use cases (e.g., 'functions' for server-side access)
  });

  const { blobId, cdnUrl } = await upload.upload(file);

  return { blobId, cdnUrl };
};