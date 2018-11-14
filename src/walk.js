module.exports = function walk(item, checks = []) {

  const check = checks.shift();

  if (!check) {
    return item;
  }

  let found = false;
  if (Array.isArray(item)) {
    for (let currentItem of item) {
      if (check(currentItem)) {
        found = currentItem;
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
