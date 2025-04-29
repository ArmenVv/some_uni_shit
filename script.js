const url = "https://fakestoreapi.com/products?limit=5";
const storedItems = document.getElementById("products-container");
let items = [];
document.addEventListener('DOMContentLoaded' ,async ()=>{
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        result.map((item)=>{
            const div = document.createElement("div");
            const title = document.createElement("p")
            const img = document.createElement("img");
            storedItems.append(div);
            div.append(img);
            div.append(title);
            title.textContent = item.title.length>20?item.title.slice(0,20):item.title;
            img.src = item.image;
            div.id = "item" + item.id;
            div.className = "product-container";
            img.className = "product-image";
            title.className = "product-title"
            items.push(div);
        })
    } catch (error) {
        console.error(error);
    }
});
let index = 0;
console.log(items);
function handleNext() {
    items.forEach((item)=>{
        if(item.style.display==="none")
            item.style.display="block";
    });
    console.log("asda");
}