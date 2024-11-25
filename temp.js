// const crypto = require("crypto");
// const algorithm = "aes-256-cbc";

// const key = crypto.randomBytes(32);

// const encrypt = (message) => {
//   const iv = crypto.randomBytes(16);
//   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//   let encrypted = cipher.update(message);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return { iv: iv, cipher: encrypted.toString("hex") };
// };

// const decrypt = ({ iv, cipher }) => {
//   let iv = Buffer.from(iv, "hex");
//   let encryptedText = Buffer.from(cipher, "hex");
//   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString("hex");
// };

// var data = "username and password";
// var cipher = encrypt(data);

// console.log(cipher);
// var plain_text = decrypt(cipher);

// console.log(plain_text);

