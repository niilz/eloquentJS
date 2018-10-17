
let title = document.querySelector("#filename");
let textArea = document.querySelector("#comment");

fetch("http://localhost:8000/other.html").then(response => textArea.value = response);