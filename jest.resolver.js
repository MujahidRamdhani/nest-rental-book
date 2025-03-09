const path = require('path');

module.exports = (request, options) => {
  if (request.startsWith('@/')) {
    return path.join(__dirname, 'src', request.slice(2));
  }
  return options.defaultResolver(request, options);
};
