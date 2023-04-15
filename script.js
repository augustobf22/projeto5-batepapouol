axios.defaults.headers.common['Authorization'] = 'M66akbJYETdwMvAXlcWmvHXz';

const container = document.querySelector('.container');

function getName() {
    const namePrompt = prompt("Insira seu nome:");
    return namePrompt;
}

function clearInput() {
    let buttonText = document.querySelector('input');
    buttonText.value = '';
}

function buttonClick() {
    //get input value
    let buttonText = document.querySelector('input').value;
    //msg = format as object

    const msg = {
        from: userName,
        to: "Todos",
        text: buttonText,
        type: "message"
    }

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/messages", 
        msg
    );

    promise.then(clearInput);
    promise.catch(window.location.reload);
}

function populateMessages(response){
    container.innerHTML = ``;

    response.data.forEach(item => {
        if(item.type === "status") {
            container.innerHTML += 
            `<div class="container-msg">
                <h1>(${item.time})</h1>
                <h2><strong>${item.from} </strong>${item.text}</h2>
            </div>`
        } else {
            container.innerHTML += 
            `<div class="container-msg">
                <h1>(${item.time})</h1>
                <h2><strong>${item.from} </strong>para <strong>${item.to}: </strong> ${item.text}</h2>
            </div>`
        }
    })

    //filter by type
    //each type has its own template
}

function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages");

    promise.then(populateMessages);
}

function keepConnected(userName) {
    const user = {name: userName};

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/status", 
        user
    );
}

function enterSuccess(response) {
    setInterval(getMessages,3000);
    setInterval(keepConnected,5000,userName);

    //get messages
    //every 3s get the messages
    //every 5s keep logged in
}

function enterError(response) {
    alert("Nome em uso! Escolha outro.");
    const newName = getName();
    enterRoom(newName);
}

function enterRoom(userName) {
    const user = {name: userName};

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/participants", 
        user
    );

    promise.then(enterSuccess);
    promise.catch(enterError);
}

const userName = getName();
enterRoom(userName);