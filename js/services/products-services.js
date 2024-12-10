const BASE_URL = "https://674e0937635bad45618d9035.mockapi.io/products";

const productList = async () =>{
    try{
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log("Error al listar producto", error)
    }
};

 const createProduct = async (name, price, image) =>{
     try {
         const response = await fetch(BASE_URL, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({name, price, image})
         });
         const data = await response.json();
         return data;


     } catch (error) {
         console.log("Error al crear producto", error)
     }
 }


 const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el producto: ${response.status}`);
        }
        console.log(`Producto con ID ${id} eliminado`);
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        throw error;
    }
};


export const servicesProducts = {
    productList, 
    createProduct,
    deleteProduct,
}