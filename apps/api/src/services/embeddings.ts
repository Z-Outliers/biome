import axios from "axios";
import url from "url";

const EMBEDDING_BASE_URL =
  "https://8000-01k6pav80mpvfpaj1wjjmgnt7r.cloudspaces.litng.ai";

export const getEmbeddingsFromText = async (text: string) => {
  const response = await axios.post(
    `${EMBEDDING_BASE_URL}/embed/text`,
    new url.URLSearchParams({ text }),
  );

  return response.data.embedding as number[];
};

export const getEmbeddingsFromImage = async (imageBuffer: Buffer) => {
  const formData = new FormData();
  formData.append("file", imageBuffer.toString("base64"));
  const response = await axios.post(
    `${EMBEDDING_BASE_URL}/embed/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.embedding as number[];
};

export const getEmbeddingsFromAudio = async (audioBuffer: Buffer) => {
  const formData = new FormData();
  formData.append("file", audioBuffer.toString("base64"));
  const response = await axios.post(
    `${EMBEDDING_BASE_URL}/embed/audio`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.embedding as number[];
};
