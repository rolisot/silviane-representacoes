function loadEvents() {
    document.querySelector("#btn-map").onclick = function () {
        loadIframeDefer();
        document.getElementById("my-lightbox").style.display = "block"
    }, document.querySelector("#btn-maps-close").onclick = function() {
        document.getElementById("my-lightbox").style.display = "none"
    }

    if (isMobile.Android())
        document.getElementById("whatsapp").style.display = "inline";
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function loadIframeDefer() {
    var A = document.getElementById("ifr-maps");
    if (A.src == "")
        A.getAttribute("data-src") && A.setAttribute("src", A.getAttribute("data-src"))
}

function loadImagesDefer() {
    for (var e = document.getElementsByClassName("slide"), t = 0; t < e.length; t++)
        if (e[t].getAttribute("data-src")) {
            var l = e[t].getAttribute("data-src");
            e[t].setAttribute("src", l)
        }

    for (var e = document.getElementsByClassName("lazy-image"), t = 0; t < e.length; t++)
        if (e[t].getAttribute("data-src")) {
            var l = e[t].getAttribute("data-src");
            e[t].setAttribute("src", l)
        }
}

function init() {
    loadImagesDefer(); loadEvents();
}

window.onload = init;


window.addEventListener("load", function () {
    function sendData() {
        var XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        var FD = new FormData(form);
        var textMessage = document.getElementById("return-message");

        // Define what happens on successful data submission
        XHR.addEventListener("load", function (event) {
            textMessage.innerText = "Mensagem enviada com sucesso!";
            textMessage.parentNode.style.display = "block";
        });

        // Define what happens in case of error
        XHR.addEventListener("error", function (event) {
            textMessage.innerText = "Falha ao enviar a mensagem!";
            textMessage.parentNode.style.display = "block";
        });

        // Set up our request
        XHR.open("POST", "http://www.silvianerepresentacoes.com.br/sendemail.php");

        // The data sent is what the user provided in the form
        XHR.send(FD);
    }

    // Access the form element...
    var form = document.getElementById("main-contact-form");

    // ...and take over its submit event.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        sendData();
    });
});