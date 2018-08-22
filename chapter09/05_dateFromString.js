function getDate(string) {
    //underscore ignores full-match
    let [_, month, day, year] =
      /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
//should log Thu Jan 30 2003 00: ...
//in codeRunner it logs 2003-01-29T23:00:00.000Z