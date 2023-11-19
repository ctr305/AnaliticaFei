var $cc = {};

$cc.validate = function (e) {
    function luhn(number) {
        var len = number.length,
            bit = 1,
            sum = 0;
        while (len--) {
            sum += !(bit ^= 1)
                ? parseInt(number[len], 10)
                : number[len] * 2 > 9
                ? number[len] * 2 - 9
                : number[len] * 2;
        }
        return sum % 10 === 0;
    }

    if (e.target.value == "") {
        document.querySelector(".card-type").setAttribute("class", "card-type");
        e.target.nextElementSibling.className = "card-valid";
        return;
    }

    var number = String(e.target.value);
    var cleanNumber = "";
    for (var i = 0; i < number.length; i++) {
        if (/^[0-9]+$/.test(number[i])) {
            cleanNumber += number[i];
        }
    }

    if (e.key != "Backspace") {
        var formatNumber = "";
        for (var i = 0; i < cleanNumber.length; i++) {
            if (i % 4 == 0 && i > 0) {
                formatNumber += " ";
            }
            formatNumber += cleanNumber[i];
        }
        e.target.value = formatNumber;
    }

    if (cleanNumber.length >= 12) {
        var isLuhn = luhn(cleanNumber);
    }

    if (isLuhn) {
        e.target.nextElementSibling.className = "card-valid active";
    } else {
        e.target.nextElementSibling.className = "card-valid";
    }

    var card_types = [
        {
            name: "amex",
            pattern: /^3[47]/,
            valid_length: [15],
        },
        {
            name: "diners_club_carte_blanche",
            pattern: /^30[0-5]/,
            valid_length: [14],
        },
        {
            name: "diners_club_international",
            pattern: /^36/,
            valid_length: [14],
        },
        {
            name: "jcb",
            pattern: /^35(2[89]|[3-8][0-9])/,
            valid_length: [16],
        },
        {
            name: "laser",
            pattern: /^(6304|670[69]|6771)/,
            valid_length: [16, 17, 18, 19],
        },
        {
            name: "visa-electron",
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            valid_length: [16],
        },
        {
            name: "visa",
            pattern: /^4[0-9]/,
            valid_length: [16],
        },
        {
            name: "mastercard",
            pattern: /^5[1-5]/,
            valid_length: [16],
        },
        {
            name: "maestro",
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            valid_length: [12, 13, 14, 15, 16, 17, 18, 19],
        },
        {
            name: "discover",
            pattern:
                /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            valid_length: [16],
        },
    ];

    for (var i = 0; i < card_types.length; i++) {
        if (number.match(card_types[i].pattern)) {
            document
                .querySelector(".card-type")
                .setAttribute("class", "card-type " + card_types[i].name);
            break;
        }
    }
};

$cc.expiry = function (e) {
    if (e.key != "Backspace") {
        var number = String(this.value);

        var cleanNumber = "";
        for (var i = 0; i < number.length; i++) {
            if (i == 1 && number.charAt(i) == "/") {
                cleanNumber = 0 + number.charAt(0);
            }
            if (/^[0-9]+$/.test(number.charAt(i))) {
                cleanNumber += number.charAt(i);
            }
        }

        var formattedMonth = "";
        for (var i = 0; i < cleanNumber.length; i++) {
            if (/^[0-9]+$/.test(cleanNumber.charAt(i))) {
                if (i == 0 && cleanNumber.charAt(i) > 1) {
                    formattedMonth += 0;
                    formattedMonth += cleanNumber.charAt(i);
                    formattedMonth += "/";
                } else if (i == 1) {
                    formattedMonth += cleanNumber.charAt(i);
                    fotmattedMonth += "/";
                } else if (i == 2 && cleanNumber.charAt(i) < 2) {
                    formattedMonth += "20" + cleanNumber.charAt(i);
                } else {
                    formattedMonth += cleanNumber.charAt(i);
                }
            }
        }

        this.value = formattedMonth;
    }
};
