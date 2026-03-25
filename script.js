const chat = document.getElementById("chat");
const progressBar = document.getElementById("progressBar");
const typing = document.getElementById("typing");

let step = 0;
let choice = "";

// USERNAME IG
const IG_USER = "julianj.80";

// progreso
function updateProgress() {
    if (!progressBar) return; // 👈 evita que truene
    const total = 5;
    progressBar.style.width = ((step / total) * 100) + "%";
}

// mensaje
function send(text, type = "them") {
    const msg = document.createElement("div");
    msg.className = "msg " + type;
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// typing real
function showTyping(callback) {
    typing.style.display = "block";

    setTimeout(() => {
        typing.style.display = "none";
        callback();
    }, 1200);
}

// opciones
function options(arr) {
    arr.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;

        btn.onclick = () => {
            choice = opt.value;
            document.querySelectorAll("button").forEach(b => b.remove());
            next();
        };

        chat.appendChild(btn);
    });
}

// flujo principal
function next() {
    step++;
    updateProgress();

    showTyping(() => {

        if (step === 1) {
            send("Aneth… tengo una duda contigo 👀");
            send("y no sé si me vas a querer seguir el juego…");

            options([
                { text: "A ver… dime", value: "open" },
                { text: "Depende 😏", value: "play" },
            ]);
        }

        else if (step === 2) {
            send("ok… eso me gusta");
            send("porque no cualquiera acepta sin saber…");

            options([
                { text: "¿Diferente cómo?", value: "curious" },
                { text: "No sé si confiar 😅", value: "doubt" }
            ]);
        }

        else if (step === 3) {
            send("no lo tengo tan claro todavía…");
            send("pero hay algo curioso contigo…");
            send("y todavía no decido si es bueno o peligroso 👀");

            options([
                { text: "Eso suena interesante", value: "hook" },
            ]);
        }

        else if (step === 4) {

            let response = "";

            if (choice === "curious") {
                response = "me gusta que quieras saber más…";
            } else if (choice === "doubt") {
                response = "eso lo hace más divertido 😏";
            } else {
                response = "vas entendiendo rápido…";
            }

            send("ok… voy a ser directo");
            send("no eres tan fácil de leer como pensaba 😏");

            send("y eso me gustó más de lo que debería…");

            send("pero esto ya no da para seguir aquí");

            options([
                { text: "Entonces… ¿dónde? 👀", value: "ig" }
            ]);
        }

        else if (step === 5) {
                // Intento de abrir la conversación directa en la app
                window.location.href = `https://ig.me/m/${username}`;
            }
        }

    });
}

let isMobile = window.innerWidth <= 768;

function updateDevice() {
    isMobile = window.innerWidth <= 768;
}

// Escucha cambios de tamaño
window.addEventListener("resize", updateDevice);

// velocidad dinámica
function getTypingSpeed() {
    return isMobile ? 1000 : 700;
}

if (isMobile) {
    console.log("Modo móvil 📱");
} else {
    console.log("Modo desktop 💻");
}



// 🚀 INICIO CONTROLADO
window.onload = () => {
    next();
};
