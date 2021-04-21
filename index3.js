/*Récupère la section du panier
*********************************/
const cart = document.querySelector("#cart");

/*Récupère le h3 pour le prix total
************************************/
const cartTotal = document.getElementById("cart-total");

/*Récupère le formulaire
**************************/
const form = document.querySelector("form");

/*Informations du panier stockées objet et tableau
***************************************************/
const cartInformation = {
  contact: {},
  products: [],
};

/* Stock le prix total 
***********************/
let totalPrice = 0;

/* Affiche le/les produit(s) du panier.
****************************************/
async function displayCart() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {

      /*Pour chaque article du panier récupère les informations du produit*/
      const product     = await getCart(i); 
      /* Stocke l'id du produit*/
      const productId    = product[0]; 
      /* Stocke le nom du produit*/
      const productName  = product[1]; 
      /* Stocke le prix du produit*/
      const productPrice = product[2] / 100; 
      /* Stocke l'image du produit*/
      const productImg   = product[3]; 
      /*Envoie l'id du produit au tableau products de cartInformation*/
      cartInformation.products.push(productId); 

      /*Fourni l'affichage du/des produits du panier*/
      renderCart(productName, productPrice, productImg);  

      const remove  = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];

      /*Efface les éléments du panier*/
      deleteCart(remove, article, productName);
    }
  } else {
    /*Affiche votre panier est vide*/
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
}

/*Récupère les éléments dans le localStorage
*********************************************/
async function getCart(index) {
  return await JSON.parse(localStorage.getItem(localStorage.key(index)));
}

/*Fourni l'affichage du/des produits du panier
***********************************************/
function renderCart(productName, productPrice, imgUrl) {

  /* Affiche article(s) du panier dans le DOM*/
  const article = document.createElement("article");
  article.innerHTML = `
    <div class="product_index3">
      <img  class="image_index3"src="${imgUrl}">
      <h4   class="title_index3">${productName}</h4>
      <h4   class="quantity_index3">Quantité: 1</h4>
      <h4   class="price_index3">Prix: ${productPrice} €</h4>
      <a    class="remove"><i class="fas fa-times-circle"></i></a>
    </div>
    `;

  /*Insère article avant cartTotal*/
  cart.insertBefore(article, cartTotal);
  /* Implémente prix */
  totalPrice += productPrice;
  /* Affiche le prix total */
  cartTotal.textContent = `Total : ${totalPrice} €`; 
}

/* Supprime élément du panier sur un clique*/
function deleteCart(removeButton, container, productName) {
  /* Gestionnaire d'évènement sur clique */
  removeButton.addEventListener("click", async () => {
    /* Supprime item du localStorage */
    await localStorage.removeItem(
      productName
    );
    /* Supprime item du DOM */ 
    container.remove();
    /* Actualise la page dynamiquement */
    document.location.reload(true); 
  });
}

displayCart();//Execute la fonction

const regexNumber      = /[0-9]/;
const regexEmail       = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

/*Verification des valeurs entrées dans le formulaire:
*******************************************************/

/*Ne soit pas vide*/
const isNotEmpty                     = (value) => (value !== "" ? true : false);
/*Avoir assez de caractère*/
const isLongEnough                   = (value) => (value.length >= 2 ? true : false);
/*Pas de chiffre*/
const isDoNotContainNumber           = (value) => !value.match(regexNumber) ? true : false;
/*Pas de symbole*/
const isDoNotContainSpecialCharacter = (value) => !value.match(specialCharacter) ? true : false;
/*Format email valide*/
const isValidEmail                   = (value) => (value.match(regexEmail) ? true : false);

/*Si toutes les conditions vérifiées sont ok renvoie "true"
************************************************************/
const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  isDoNotContainNumber(value) &&
  isDoNotContainSpecialCharacter(value);

/*Récupère les éléments du formulaire
***************************************/
const chooseGender = form.elements.chooseGender;
const lastName     = form.elements.lastName;
const firstName    = form.elements.firstName;
const address      = form.elements.address;
const city         = form.elements.city;
const email        = form.elements.email;
const btn          = document.getElementById("btn");

/*Récupère les messages d'erreur
*********************************/
const chooseGenderErrorMessage = 
document.getElementById ("chooseGenderErrorMessage");
const lastNameErrorMessage     = 
document.getElementById("lastNameErrorMessage");
const firstNameErrorMessage    = 
document.getElementById("firstNameErrorMessage");
const addressErrorMessage      = 
document.getElementById("addressErrorMessage");
const cityErrorMessage         = 
document.getElementById("cityErrorMessage");
const emailErrorMessage        = 
document.getElementById("emailErrorMessage");

/*Vérification de la saisie des utilisateurs
**********************************************/
function formValidate() {
    if (isValidInput(chooseGender.value)) {
      chooseGenderErrorMessage.textContent = "";

      if (isValidInput(lastName.value)) {
        lastNameErrorMessage.textContent = "";

        if (isValidInput(firstName.value)) {
          firstNameErrorMessage.textContent = "";

          if (isNotEmpty(address.value) && isLongEnough(address.value)) {
            addressErrorMessage.textContent = "";

            if (isValidInput(city.value)) {
              cityErrorMessage.textContent = "";

              if (isValidEmail(email.value)) {
                emailErrorMessage.textContent = "";

                /*Si inputs ok renvoie l'objet contact à cartInformation*/
                return (cartInformation.contact = {
                  chooseGender: chooseGender.value,
                  lastName:     lastName.value,
                  firstName:    firstName.value,
                  address:      address.value,
                  city:         city.value,
                  email:        email.value,
                });

                /*Sinon envoie un des messages d'erreur suivant*/
              } else {
                emailErrorMessage.textContent =
                  "Merci de renseigner votre adresse mail !";
                email.focus();
                return false;
              }
            } else {
              cityErrorMessage.textContent = "Merci de renseigner votre ville !";
              city.focus();
              return false;
            }
          } else {
            addressErrorMessage.textContent = "Merci de renseigner votre adresse !";
            address.focus();
            return false;
          }
        } else {
          firstNameErrorMessage.textContent = "Merci de renseigner votre prénom !";
          firstName.focus();
          return false;
        }
      } else {
        lastNameErrorMessage.textContent = "Merci de renseigner votre nom !";
        lastName.focus();
        return false;
      }
    } else {
      chooseGenderErrorMessage.textContent = "Merci de renseigner votre civilité !";
      chooseGender.focus();
      return false;
    }
  }

/* Envoie données à l'api
****************************/
async function postData(method, url, dataElt) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(dataElt),
  });
  return await response.json();
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  /*Valide le formulaire*/
  const validForm = formValidate(); 
  if (validForm !== false) {
    /*Envoie données au serveur*/
    const response = await postData(
      "POST",
      "http://localhost:3000/api/cameras/order",
      cartInformation
    );
    /*Efface les données du local storage une fois la commande validée.*/
    window.localStorage.clear();
    /*Redirige vers la page de confirmation de commande*/
    if (totalPrice > 1) {
      window.location =`./index4.html?id=${response.orderId}&price=${totalPrice}&user=${lastName.value}&first=${firstName.value}&mail=${email.value}`; 
    }
    else{
      alert("Votre panier est vide")
    }
  }
});