// 参考文章：https://blog.csdn.net/gao36951/article/details/77942419
// AES加密与解密 http://showdoc.sys.jxblot.com/web/#/3?page_id=744

var CryptoJS = require('crypto-js')

// 直接上代码
// var key = CryptoJS.enc.Utf8.parse('y2W8CL6BkRrFlJPN');
// var iv = CryptoJS.enc.Utf8.parse('dMbtHORyqseYwE0o');
// var sourceValue = 'AES';
// var password = CryptoJS.enc.Utf8.parse(sourceValue);
// console.log("原始字符串:" + sourceValue);
// console.log("utf8处理后:" + password);

// var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });  //CryptoJS.pad.Pkcs7
// var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });  //CryptoJS.pad.Pkcs7

// console.log("加密后base64:" + encrypted);
// var encryptedStr = encrypted.ciphertext.toString();
// console.log("加密后16进制:" + encryptedStr);
// console.log("解密后utf8:" + decrypted);
// console.log("解密后原始字符串:" + decrypted.toString(CryptoJS.enc.Utf8));

/**
 *
 * @param {*} sourceValue 加密value
 */

var key = {}
var iv = {}

if (process.env.NODE_ENV === 'development') {
  key = CryptoJS.enc.Utf8.parse('y2W8CL6BkRrFlJPN')
  iv = CryptoJS.enc.Utf8.parse('dMbtHORyqseYwE0o')
} else {
  key = CryptoJS.enc.Utf8.parse('G4OVYZye84xquqP7')
  iv = CryptoJS.enc.Utf8.parse('IOhUDME4NFD596dm')
}

function encrypted(sourceValue) {
  if (sourceValue) {
    var password = CryptoJS.enc.Utf8.parse(sourceValue)
    var encryptedObj = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }) // CryptoJS.pad.Pkcs7
    return encryptedObj.toString()
  } else {
    new Error('加密错误')
  }
}

/**
 *
 * @param {*} sourceValue 解密value
 */
function decrypted(sourceValue) {
  if (sourceValue) {
    var decryptedObj = CryptoJS.AES.decrypt(sourceValue, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }) // CryptoJS.pad.Pkcs7
    return decryptedObj.toString(CryptoJS.enc.Utf8)
  } else {
    new Error('解密错误')
  }
}

export default {
  encrypted,
  decrypted
}

