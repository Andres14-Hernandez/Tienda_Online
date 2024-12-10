import { servicesProducts } from "../services/products-services.js"

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard({name, price, image, id}){
    //CREAR CARD
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = 
    `
    <img class="img_card" src="${image}" alt="producto">
    <div class="product__description">
        <p>${name}</p>
        <div class="product__value">
            <p>$${price}</p>
            <button class="delete__card" data-id="${id}">
                <img src="assets/trashIcon.svg" alt="Eliminar">
            </button>
        </div>
    </div>
    `;

    // ELIMINAR CARD
    const deleteButton = card.querySelector(".delete__card");
    deleteButton.addEventListener("click", async () => {
        try {
            await servicesProducts.deleteProduct(id);
            card.remove();
        } catch (error) {
            console.error("Error al intentar eliminar el producto:", error.message);
        }
    });

    return card;
}

const renderProducts = async() =>{
    try{
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(product => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });
    }
    catch(error){
        console.log("Error")
    }
}

// CAPTURA DATOS FORMULARIO
form.addEventListener("submit", async(event) =>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value
    const price = document.querySelector("[data-price]").value
    const image = document.querySelector("[data-image]").value

    try {
        const newProduct = await servicesProducts.createProduct(name, price, image);
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);

    } catch (error) {
        console.log(error)
    }


    const form = document.querySelector('form');
    if (form) {
        form.reset();
    } else {
        console.error('El formulario no se encontró');
    }

});

renderProducts();