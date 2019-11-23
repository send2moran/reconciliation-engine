const similarity = (strA, strB) => {

  //uniform reference strings
  //remove all non alphanumeric characters
  let _strA = strA.toLowerCase().replace(/[^A-Za-z0-9\s]/, "");
  let _strB = strB.toLowerCase().replace(/[^A-Za-z0-9\s]/, "");
  let numericInStrB = "";
  let charsInStrB = "";

  //look for matching pattern with numbers
  //find numeric sequences in the payment reference
  //build groups of numeric values found in string
  //check if they A includes matches from B
  let numericPattern = /[0-9]{2,}/g;
  while ((numericInStrB = numericPattern.exec(_strB)) !== null) {
    //for each found numeric sequence, check in Payable for a match
    if (_strA.includes(numericInStrB[0])) {
      return true;
    }
  }

  //look for matching pattern - chars
  let strPattern = /[a-z]{2,}/g;
  while ((charsInStrB = strPattern.exec(_strB)) !== null) {
    if (_strA.includes(charsInStrB[0])) {
      return true;
    }
  }

  //look for partial inclusion of payment ref in payable ref
  if (_strB.length >= 2) {
    for (let i = 0; i <= _strB.length - 2; i++) {
      let slicedStrB = _strB.slice(i, i + _strB.length / 2);
      console.log(slicedStrB);
      if (_strA.includes(slicedStrB)) {
        return true;
      }
    }
  }
};

export default similarity;
