const form = document.querySelector("form");
const inputCreditNumber = document.getElementById("Card_number");
const inputExpiry = document.getElementById("Expiry");

inputCreditNumber.addEventListener("keyup", (e) => {
    $cc.validate(e);
});

inputExpiry.addEventListener("keyup", (e) => {
    $cc.expiry.call(this, e);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
});
