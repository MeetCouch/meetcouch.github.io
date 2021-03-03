const submitEmailLanding = async() => {
    var email = document.getElementById("landing-email");
    var errorElement = document.getElementById("landing-error")
    
    postEmail(email, errorElement);
}

const submitEmailFooter = async() => {
    var email = document.getElementById("footer-email");
    var errorElement = document.getElementById("footer-error")
    
    postEmail(email, errorElement);
}

const postEmail = async(email, errorElement) => {
    if (!email.checkValidity()) {
        errorElement.innerHTML = email.validationMessage;
    }
    else {
        var object = {
            email: email.value
        };

        const response = await fetch(
            'https://couch-api.azurewebsites.net/api/v1/subscriptions/coming-soon',
            {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const myJson = await response.json();

        if (myJson["isSuccess"]) {
            document.getElementById("landing-cta").style.display = "none";
            document.getElementById("footer-cta").style.display = "none";

            document.getElementById("landing-message").innerHTML = myJson["data"];
            document.getElementById("footer-message").innerHTML = myJson["data"];
        }
    }
}