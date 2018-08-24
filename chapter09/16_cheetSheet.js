// /abc/	A sequence of characters
// /[abc]/	Any character from a set of characters
// /[^abc]/	Any character not in a set of characters
// /[0-9]/	Any character in a range of characters
// /x+/	One or more occurrences of the pattern x
// /x+?/	One or more occurrences, nongreedy
// /x*/	Zero or more occurrences
// /x?/	Zero or one occurrence
// /x{2,4}/	Two to four occurrences
// /(abc)/	A group
// /a|b|c/	Any one of several patterns
// /\d/	Any digit character
// /\w/	An alphanumeric character (“word character”)
// /\s/	Any whitespace character
// /./	Any character except newlines
// /\b/	A word boundary
// /^/	Start of input
// /$/	End of input

//RegEx have:
//test -> gives true or false
//exec -> gives array with all mathces, has an index-property

//strings have:
//match -> gives array like exec, but an array with the matches if more than one
//search -> gives one match and the starting position of the match
//replace -> can replace matches with pattern in replacement string or function

//RegEx-Options after regex:
// i = case insensitive
// g = global
// y = sticky, will not look ahead and skip of the string when looking for match
// u = turns on unicode
