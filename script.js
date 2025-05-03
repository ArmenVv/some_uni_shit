const url = "https://fakestoreapi.com/products?limit=5";
const storedItems = document.getElementById("products-container");
let productList;
let shifting = false;

document.addEventListener('DOMContentLoaded' ,async ()=>{
    try {
        const response = await fetch(url);
        const result = await response.json();
            productList = document.createElement("div");
            productList.className = "productsList";
            storedItems.appendChild(productList);
            result.forEach(item => {
            const card = document.createElement("div");
            card.className = "product-container";
            const title = document.createElement("p");
            title.textContent = item.title.length>20?item.title.slice(0,20):item.title;
            title.className = "product-title"
            const img = document.createElement("img");
            img.src = item.image;
            img.className = "product-image";
            card.appendChild(img);
            card.appendChild(title);
            productList.appendChild(card);

        })
        updateActiveCard();
    } catch (error) {
        console.error(error);
        
    }
});

function updateActiveCard() {
    const cards = document.querySelectorAll(".product-container");
    cards.forEach(card => {
        card.classList.remove("active")
        card.classList.remove("notActive1");
        card.classList.remove("notActive2");
    });
    cards[0].classList.add("notActive2");
    cards[1].classList.add("notActive1");
    cards[4].classList.add("notActive2");
    cards[3].classList.add("notActive1");
    cards[2].classList.add("active");
}
function handleNext() {
   if(shifting) return;
    shifting = true;
   productList.style.transition = "transform 0.5s ease";
   productList.style.transform = "translateX(-270px)";
   productList.addEventListener("transitionend", () => {
    productList.appendChild(productList.firstElementChild);
    productList.style.transition = "none";
    productList.style.transform = "translateX(0)";
    productList.style.transition = "transform 0.5s ease";
    updateActiveCard();
    shifting = false;
   },{once:true});

}

function handlePrev() {
    if(shifting) return;
    shifting = true;
    productList.style.transition = "transform 0.5s ease";
    productList.style.transform = "translateX(270px)";
    productList.addEventListener("transitionend", () => {
        productList.insertBefore(productList.lastElementChild, productList.firstElementChild);
        productList.style.transition = "none";
        productList.style.transform = "translateX(0)";
        productList.style.transition = "transform 0.5s ease";
        updateActiveCard();
        shifting = false;
    },{once:true});
    
}

const autoShitt = setInterval(() => {
    handleNext();
}
, 3000);