import CryptoJS from "crypto-js";
import bcrypt from 'bcryptjs';

CryptoJS.pad.NoPadding = { pad: function () {}, unpad: function () {} };

var iv = CryptoJS.enc.Base64.parse(import.meta.env.VITE_BASE_IV);
var key = import.meta.env.VITE_BASE_ENCRYPT_KEY
var hashKey = import.meta.env.VITE_BASE_HASH_KEY

function encrypt(plainText) {
  var k = CryptoJS.enc.Utf8.parse(key);
  var cipherText = CryptoJS.AES.encrypt(plainText, k, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return cipherText.toString();
}

function decrypt(cipherText) {
  var iv1 = iv;
  var k = CryptoJS.enc.Utf8.parse(key);
  var cipherBytes = CryptoJS.enc.Base64.parse(cipherText);

  var decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherBytes }, k, {
    iv: iv1,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}


const hashString = (plainText) => {
  return bcrypt.hashSync(plainText,hashKey);
}



const serializeUser = (obj) => {
  const result =  `UserId:${obj.userId},Email:${obj.email},UserName:${obj.userName},Name:${obj.name},IsVerified:${obj.isVerified}`
  return encrypt(result);
}

const deserializeUser = (userString) => {

  const dataValues = decrypt(userString).split(',');
  const result = dataValues.map(value => {
    return value.split(':')[1];
  });

  const resultObj = {
    userId:parseInt(result[0]),
    email:result[1],
    userName:result[2],
    name:result[3],
    isVerified:Boolean(result[4])
  }

  return resultObj;
  
}


export{
    encrypt,
    decrypt,
    serializeUser,
    deserializeUser,
    hashString
}