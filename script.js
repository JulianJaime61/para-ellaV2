const chat = document.getElementById("chat");
const progressBar = document.getElementById("progressBar");
const typing = document.getElementById("typing");

let step = 0;
let choice = "";

// USERNAME IG
const IG_USER = "julianj.80";
const IG_USER_ID = "julianj.80";

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
    const typing = document.querySelector(".typing");

    if (!typing) {
        console.error("No existe .typing");
        callback();
        return;
    }

    typing.style.display = "block";

    setTimeout(() => {
        typing.style.display = "none";

        if (typeof callback === "function") {
            callback();
        }
    }, 1200);
}

// opciones
function options(arr) {
    arr.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;

        btn.onclick = () => {
            document.querySelectorAll("button").forEach(b => b.remove());

            if (opt.action) {
                opt.action(); // 🔥 ejecuta acción (Instagram)
            } else {
                choice = opt.value;
                next();
            }
        };

        chat.appendChild(btn);
    });
}


// Detectar móvil
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

function goToInstagram() {

    if (isMobile) {
        // Intento abrir conversación directa
          const username = "julianj.80";

        window.location.href = `https://ig.me/m/${username}`;

    }
}

// flujo principal

function next() {
    step++;
    updateProgress();

    showTyping(() => {

        console.log("STEP:", step);

        if (step === 1) {
            send("Jajajaja… me gusta tu risa 😏");
            send("Pero tengo que advertirte… lo que viene no es para cualquiera 👀");

            options([
                { text: "Ahora me dejaste intrigada 😏", value: "intrigued" },
                { text: "Uy… ¿qué será? 👀", value: "curious" }
            ]);
        }

        else if (step === 2) {
            let response = "";

            if (choice === "intrigued") {
                response = "Me gusta que tengas curiosidad… eso hace que todo sea más divertido 😏";
            } else if (choice === "curious") {
                response = "Perfecto, porque lo que sigue depende de tu curiosidad 👀";
            }

            send(response);
            send("Pero hay un detalle… esto se siente limitado aquí 😅");

            options([
                { text: "¿Limitado cómo? 😳", value: "limit" },
                { text: "Ya quiero saber 😏", value: "want" }
            ]);
        }

        else if (step === 3) {
            send("No puedo leerte bien ni ver esas pequeñas cosas que dicen más que las palabras 😏");
            send("Lo divertido empieza cuando lo hacemos en tiempo real…");

            options([
                { text: "Ok… te escribo 😏", action: goToInstagram }
            ]);
        }

    });
}

// Inicio controlado
window.onload = () => {
    next();
};

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

// Inicio controlado
window.onload = () => {
    next();
};
