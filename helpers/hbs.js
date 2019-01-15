module.exports = {
  truncate: function(str, len) {
    if (str.length > len && str.length > 0) {
      var new_str = str + ' ';
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(' '));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },
  stripTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  }

  // copyToClipboard: function(str) {
  //   const el = document.createElement('textarea');
  //   el.value = str;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   // document.body.removeChild(el);
  //   return;
  // }
};

// const copyToClipboard = str => {
//   const el = document.createElement('textarea');
//   el.value = str;
//   document.body.appendChild(el);
//   el.select();
//   document.execCommand('copy');
//   // document.body.removeChild(el);
// };
