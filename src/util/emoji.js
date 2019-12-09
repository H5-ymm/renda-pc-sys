export const emojiToUnicode(emoji) = function () {
  var backStr = '';
  if (emoji && emoji.length > 0) {
    for (var char of emoji) {
      var index = char.codePointAt(0);
      if (index > 65535) {
        var h =
          '\\u' +
          (Math.floor((index - 0x10000) / 0x400) + 0xd800).toString(
            16
          );
        var c =
          '\\u' + ((index - 0x10000) % 0x400 + 0xdc00).toString(16);
        backStr = backStr + h + c;
      } else {
        backStr = backStr + char;
      }
    }
    console.log(backStr);
  }
  return backStr;
}

export const utf16toEntities(str) = function () {
  //检测utf16emoji表情 转换为实体字符以供后台存储
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  str = str.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
      //辅助平面字符（我们需要做处理的一类）
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
      return '&#' + code + ';';
    } else {
      return char;
    }
  });
  return str;
}