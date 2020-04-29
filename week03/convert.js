
/**
 * 
 * @param {*} string 
 * @param {*} hex 
 * case: 
 *   decimal: 10, 10.123, 0.3, .345
 *   octal: 0o101 
 *   hex: 0x101
 */
function ConvertStringToNumber(string, hex) {

    var chars = string.split('');
    
    var number = 0;

    chars.forEach((ele, index) => {
        number += chars[index].codePointAt(0) - '0'.codePointAt(0)
    });

    return number;
}
ConvertStringToNumber("10.123", 10)

function ConvertnumberToString() {
    
}