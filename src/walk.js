module.exports = function walk(item, checks = []) {

  const check = checks.shift();

  if (!check) {
    return item;
  }

  let found = false;
  if (Array.isArray(item)) {
    for (let i = 0, len = item.length; i < len; i++) {
      if (check(item[i])) {
        found = item[i];
        break;
      }
    }
  } else if ('object' === typeof item) {
    found = check(item);
  }

  if (found) {
    return walk(found, checks);
  }
};
