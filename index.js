/* URL API
************/
let urlAPI = "http://localhost:3000/api/cameras";


/*Affiche les produits
************************/
async function displayProducts() { //Fonction pour récupérer les produits
  try{
    const produits = await getAllProducts(urlAPI); //Charge les données et attends
    produits.forEach((product) => { //Boucle foreach pour chaque propriétés du tableau
    renderProducts
      ( product.name,
        product._id,
        product.imageUrl,
        product.price);
    });
  } catch(error){

    alert("Le serveur est injoignable, veuillez réessayer!");
  }
}

/* Récupère tous les produits et convertis les en format JSON
***************************************************************/
async function getAllProducts(urlAPI) {
  try{
    const response = await fetch(urlAPI);
    return await response.json();
  }catch(error){
    alert("Le serveur est injoignable, veuillez réessayer!");
  } 
}

/* Fourni l'affichage des produits 
************************************/
function renderProducts(productName, productId, productImg, productPrice) {
  const produits = document.querySelector("#produits"); // Récupère la div qui contiendra les différents articles
  const article  = document.createElement("article"); // Creer un élément "article" dans le DOM

  /*Modifie le DOM en créant les éléments dans mon "article"*/
  article.innerHTML = `
    <img class="image_index1" alt="${productName}" src="${productImg}">
    <button class="button_index1 type="button"><a href="index2.html?id=${productId}"><i class="fas fa-eye"></i></a></button>
    <p class="title_index1">${productName}</p>
    <p class="price_index1">${productPrice / 100},00</p>
    `;
  produits.append(article);
}

displayProducts();//Execute la fonction