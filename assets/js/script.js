const submitEmailLanding = async() => {
    var email = document.getElementById("landing-email");
    var errorElement = document.getElementById("landing-error")
    
    postEmail(email, errorElement);
}

const submitEmailCta = async() => {
    var email = document.getElementById("cta-email");
    var errorElement = document.getElementById("cta-error")
    
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
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong");
            }
        }).then((myJson) => {
            if (myJson["isSuccess"]) {
                document.getElementById("landing-cta").style.display = "none";
                document.getElementById("cta").style.display = "none";

                document.getElementById("landing-message").innerHTML = myJson["data"];
                document.getElementById("cta-message").innerHTML = myJson["data"];
            }
        }).catch((error) => {
            errorElement.innerHTML = "That didn't work. Please try again.";
        });
    }
}