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
        errorElement.style.display = 'block';
        errorElement.innerHTML = email.validationMessage;
    }
    else {
        errorElement.style.display = 'none';

        var spinner = document.getElementsByClassName("fa-spinner")[0];
        spinner.style.display = 'block';

        var buttons = document.getElementsByTagName("button");
        
        Array.prototype.forEach.call(buttons, button => {
            button.style.background = '#55EE55'
            button.disabled = true;
            button.innerHTML = spinner.outerHTML;
        });

        var inputs = document.getElementsByTagName("input");
        
        Array.prototype.forEach.call(inputs, input => {
            input.disabled = true;
        });

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
                document.getElementById("landing-message").style.display = 'block';
                document.getElementById("landing-message").innerHTML = myJson["data"];
                document.getElementById("cta-message").style.display = 'block';
                document.getElementById("cta-message").innerHTML = myJson["data"];
            }
        }).catch((error) => {
            errorElement.style.display = 'block';
            errorElement.innerHTML = "That didn't work. Please try again.";

            Array.prototype.forEach.call(inputs, input => {
                input.disabled = false;
            });

            spinner.style.display = 'none';
            
            Array.prototype.forEach.call(buttons, button => {
                button.style.background = '#33CC33'
                button.innerHTML = "Notify Me" + spinner.outerHTML;
                button.disabled = false;
            });
        });
    }
}