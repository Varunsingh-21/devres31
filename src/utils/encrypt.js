// src/utils/encrypt.js

import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-passphrase"; // 🔐 Store securely

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString(); // Encrypts the text
};

export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY); // Decrypts the text
  return bytes.toString(CryptoJS.enc.Utf8);
};
