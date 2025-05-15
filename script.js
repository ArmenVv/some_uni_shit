const url = "https://fakestoreapi.com/products?limit=5";
const storedItems = document.getElementById("products-container");
let productList;
let shifting = false;
let autoSlider = null;
let cardWidth = 0;

document.addEventListener('DOMContentLoaded', async () => {
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
            title.textContent = item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title;
            title.className = "product-title";
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title;
            img.className = "product-image";

            card.appendChild(img);
            card.appendChild(title);
            productList.appendChild(card);
        });

        calculateCardWidth();
        updateActiveCard();
        autoSlide();

        window.addEventListener('resize', calculateCardWidth);

    } catch (error) {
        console.error("Error fetching products:", error);
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "Failed to load products. Please try again later.";
        errorDiv.style.color = "red";
        errorDiv.style.textAlign = "center";
        storedItems.appendChild(errorDiv);
    }
});

function calculateCardWidth() {
    const firstCard = productList.querySelector(".product-container");
    if (firstCard) {
        const cardStyle = getComputedStyle(firstCard);
        const width = firstCard.offsetWidth;
        const marginLeft = parseFloat(cardStyle.marginLeft);
        const marginRight = parseFloat(cardStyle.marginRight);
        cardWidth = width + marginLeft + marginRight;
    }
}

function updateActiveCard() {
    const cards = productList.querySelectorAll(".product-container");
    cards.forEach(card => {
        card.classList.remove("active", "notActive1", "notActive2");
    });

    const centerIndex = Math.floor(cards.length / 2);

    if (cards[centerIndex]) {
        cards[centerIndex].classList.add("active");
    }

    if (cards[centerIndex - 1]) {
        cards[centerIndex - 1].classList.add("notActive1");
    }
     if (cards[centerIndex + 1]) {
        cards[centerIndex + 1].classList.add("notActive1");
    }
     if (cards[centerIndex - 2]) {
        cards[centerIndex - 2].classList.add("notActive2");
    }
    if (cards[centerIndex + 2]) {
        cards[centerIndex + 2].classList.add("notActive2");
    }
}

function handleNext() {
    if (shifting || cardWidth === 0) return;
    shifting = true;

    clearInterval(autoSlider);
    autoSlide();

    productList.style.transition = "transform 0.5s ease";
    productList.style.transform = `translateX(-${cardWidth}px)`;

    productList.addEventListener("transitionend", () => {
        productList.appendChild(productList.firstElementChild);
        productList.style.transition = "none";
        productList.style.transform = "translateX(0)";

        updateActiveCard();
        shifting = false;
    }, { once: true });
}

function handlePrev() {
    if (shifting || cardWidth === 0) return;
    shifting = true;

    clearInterval(autoSlider);
    autoSlide();

    productList.insertBefore(productList.lastElementChild, productList.firstElementChild);

    productList.style.transition = "none";
    productList.style.transform = `translateX(-${cardWidth}px)`;

    productList.offsetWidth;

    productList.style.transition = "transform 0.5s ease";
    productList.style.transform = "translateX(0)";

    productList.addEventListener("transitionend", () => {
        updateActiveCard();
        shifting = false;
    }, { once: true });
}

function autoSlide() {
    clearInterval(autoSlider);
    autoSlider = setInterval(() => {
        handleNext();
    }, 3000);
}
