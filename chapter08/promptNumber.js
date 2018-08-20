function promptNumber(question) {
    let result = Number(prompt(question));
    if (isNaN(result)) return null;
    else return result;
  }
  
  console.log(promptNumber("write somethingies:..."));