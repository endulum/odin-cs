const nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: 'foo2',
          },
        },
      },
    },
  },
  owo: 'owo',
  uwu: 1,
  uhh: null,
};

function contains(data: any, target: any): boolean {
  // is data an object
  if (typeof data === 'object' && data !== null) {
    // if data is an object, iterate through values
    for (const value of Object.values(data)) {
      // stop execution if value is found
      if (contains(value, target)) return true;
    }
  } else {
    // if data isn't an object, is data equal to target value
    return data === target;
  }
  return false;
}

console.log(contains(nestedObject, 44)); // true
