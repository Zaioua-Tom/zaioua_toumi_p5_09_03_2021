const orderInformation = window.location.search.substr(1).split('&');
const orderId          = orderInformation[0].replace('id=', '');
const totalPrice       = orderInformation[1].replace('price=', '');
const userName         = orderInformation[2].replace('user=', '');
const FirstName        = orderInformation[3].replace('first=', '');
const email            = orderInformation[4].replace('mail=', '');

document.querySelector('.user').textContent += userName;
document.querySelector('.first').textContent += FirstName;
document.querySelector('.order-id').textContent += orderId;
document.querySelector('.price').textContent += totalPrice;
document.querySelector('.mail').textContent += email;



