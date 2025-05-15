const { error } = require("console");

document.getElementById("form-container").addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = new FormData(this);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const message = formData.get("message");
    const data = {fname,lname,email,message};
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      })

})