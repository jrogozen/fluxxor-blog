function set(name, value, exp) {
  var d = new Date();
  d.setTime(d.getTime() + (exp*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

function get(name) {
  var cookie = '';
  var name = name + '=';
  var cookieArray = document.cookie.split(';');
  
  cookieArray.some(function(c) {
    c = c.trim();
    if(c.indexOf(name) === 0) {
      cookie = c;
    }
  });

  if(cookie) {
    return cookie.substr(name.length);
  } else {
    return false;
  }
}

module.exports = {
  set: set,
  get: get
}