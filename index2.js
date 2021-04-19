/*URLAPI
 ************/
let urlAPI = "http://localhost:3000/api/cameras/";

/*Recupere les paramètres de l'url avec un get pour l'ID 
 ***********************************************************/
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

/*Recupere l'article dans le HTML
 **********************************/
const article = document.querySelector("article");

/*Récupere les données du produit souhaité
 *******************************************/
async function displayProduct() {
  try {
    const data = await getOneProduct(urlAPI, id);
    renderProduct(data);
    customizeYourProduct(article, data.lenses);
    addToCart(article, data);
  } catch (error) {
    alert('Le serveur est injoignable, veuillez réessayer!');
  }

}

/* Fait la requete et donne une reponse au format json
 ***************************/
async function getOneProduct(productUrl, productId) {
  try {
    const response = await fetch(productUrl + productId);
    return await response.json();
  } catch (error) {
    alert('Le serveur est injoignable, veuillez réessayer!');
  }

}


/* Affichage dans le DOM du produit
*************************************/
function renderProduct(productData) {
  article.innerHTML = `
    <div class="product">
      <div class="photo_product">
        <img class="image_index2"src="${productData.imageUrl}" alt="${productData.name}">
        <aside class="description">Nos appareils sont fabriqués en France et à la main.<br><br>
        Une qualité et un savoir faire unique depuis 60ans !</aside>
      </div>
      <div class="product-information">
        <h2 class="title_index2">${productData.name}</h2>
        <p class="price_index2">${productData.price / 100}</p>       
      </div>
    </div>`;
}

/* Personnalise le produit
***************************/
const customizeYourProduct = (parentElt, productOptions) => {
  /* Crée liste déroulante*/
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.setAttribute("for", "lenses-list");
  label.textContent = "Lentilles disponibles : ";
  select.id = "lenses-list";

  parentElt.append(label);
  parentElt.append(select);
  
  /* Crée une balise option pour chaque lentille*/
  productOptions.forEach((productOption) => {
    const option = document.createElement("option");
    option.value = productOption;
    option.textContent = productOption;
    select.append(option);
  });
  /* Récupère la lentille choisie dans la console*/
  select.addEventListener("change", (e) => {
    optionChosen = e.target.value;
  });
};
/* Ajoute le produit au panier
********************************/
const addToCart = (parentElt, productData) => {

  /* Crée le bouton d'envoie du produit*/
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Ajouter au panier";
  div.classList.add("add-to-cart");
  parentElt.append(div);
  parentElt.append(btn);

  /* Assigne valeur dans le tableau à envoyer dans le localStorage*/
  const product = [
    productData._id,
    productData.name,
    productData.price,
    productData.imageUrl,
  ];
  /*Envoie valeur à localStorage après un clique*/
  btn.addEventListener("click", () => {
    localStorage.setItem(productData.name, JSON.stringify(product));
    btn.classList.add("invisible");
    div.textContent = "Le produit a été ajouté au panier !";
  });
};

displayProduct();//Execute la fonction