import axios from "axios";

export const getWord = async (letters) => {
  const data = await axios.get("https://random-word-api.vercel.app/api", {
    params: {
      length: letters,
      words: 1
    },
  });

  return data ? data : null;
};

export const dictionary = async (word) => {
  try {
    const data = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return data ? data : null;
  } catch (e) {
    return false;
  }
};

