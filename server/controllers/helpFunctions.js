const hexToArrayBuffer = require("hex-to-array-buffer");
const decode = require("base64-arraybuffer");
var textEncoding = require('text-encoding');  
var TextDecoder = textEncoding.TextDecoder;

module.exports.bs64Toarrbuf = (inData) => {
  return new Uint8Array(decode.decode(inData));
};

module.exports.bs64Tohex = (inData) => {
  let buffer = decode.decode(inData);
  //console.log(buffer);
  const outData = new DataView(buffer);

  return outData;
};

module.exports.hexTobs64 = (inData) => {
  //console.log("Params: ", req.params);
  let hex_str = String(inData);
  if (hex_str.length % 2 != 0) hex_str = "0" + hex_str;

  //console.log(hex_str);
  //console.log(hexToArrayBuffer(hex_str));

  //console.log("Send command: ", decode.encode(hexToArrayBuffer(hex_str)));
  let outData = decode.encode(hexToArrayBuffer(hex_str));

  return outData;
};
