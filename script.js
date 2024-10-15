console.log("SBA_308A");

fetch("https://regres.in/api/users")
    .then(response => response.json())
    .then(data => console.log(data))