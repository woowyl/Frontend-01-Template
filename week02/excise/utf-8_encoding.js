String.prototype.binaryToHex = function() {
    return parseInt(this,2).toString(16)
}

function UTF8Convert(char) {
    var binary = char.codePointAt().toString(2);
    var codePoint = char.codePointAt();
    if (codePoint < 128) {
        return binary.padStart(8,"0").binaryToHex()
    } else if(codePoint < 2048) {
        var fillzero2 = binary.padStart(11,"0");
        return ("110" + fillzero2.slice(0,5) + "10"+fillzero2.slice(5,11)).binaryToHex();
    } else if (codePoint < 65536) {
        var fillzero3 = binary.padStart(16,"0");
        return ("1110" + fillzero3.slice(0,4) + "10"+fillzero3.slice(4,10) + "10"+fillzero3.slice(10,16)).binaryToHex();
    } else if (codePoint < 1114111) {
        var fillzero4 = binary.padStart(21,"0");
        return ("11110" + fillzero4.slice(0,3) + "10"+fillzero4.slice(3,9) + "10"+fillzero4.slice(9,15) + "10"+fillzero4.slice(15,21)).binaryToHex();
    }
}



/**
 * author 杨登程
 * 
 */

function encodeUTF(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (let i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}

/**
 *  author  李粤强
 * 
 */
function charToUtf8(char) {
    let bits = char.codePointAt().toString(2);
    if (bits.length < 8) {
      return bits.padStart(8, '0');
    }
    const byteCount = Math.ceil((bits.length - 1) / 5);
    bits = bits.replace(/(?=([01]{6})+$)/g, '10');
    bits = `${'1'.repeat(byteCount)}${bits.padStart(7 * byteCount, '0')}`;
    return bits.replace(/(?=(\B)([01]{8})+$)/g, '|');
  }
  


/**
 * author 王柏浩
 */

function encodeCodePoint(code) {
    if (code <= 0x7F) {
      return [code]
    } else if (code <= 0x7FF) {
      return [
        0xC0 | ((code >> 6) & 0x1F),
        0x80 | ((code) & 0x3F),
      ]
    } else if (code <= 0xFFFF) {
      return [
        0xE0 | ((code >> 12) & 0xF),
        0x80 | ((code >>  6) & 0x3F),
        0x80 | ((code) & 0x3F)
      ]
    } else {
      return [
        0xF0 | ((code >> 18) & 0x7),
        0x80 | ((code >> 12) & 0x3F),
        0x80 | ((code >>  6) & 0x3F),
        0x80 | ((code) & 0x3F)
      ]
    }
  }
  
  function UTF8_Encoding(string) {
    const codes = [];
    for (let ch of string) {
      const bytes = encodeCodePoint(ch.codePointAt(0));
      codes.push(...bytes);
    }
    const array = new Uint8Array(codes);
    return array.buffer;
  }
  

/**
 * 
 * author 王刚
 */
  function utf8Encoding(str, onlyBytes) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
              byteSize += 1;
              back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
              byteSize += 2;
              back.push((192 | (31 & (code >> 6))));
              back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff) 
                || (0xe000 <= code && code <= 0xffff)) {
              byteSize += 3;
              back.push((224 | (15 & (code >> 12))));
              back.push((128 | (63 & (code >> 6))));
              back.push((128 | (63 & code)))
        }
     }
     for (i = 0; i < back.length; i++) {
          back[i] &= 0xff;
     }
     if (onlyBytes) {
          return back.map(item => item.toString(16))
     }
     if (byteSize <= 0xff) {
          return [0, byteSize].concat(back);
     } else {
          return [byteSize >> 8, byteSize & 0xff].concat(back);
      }
}

