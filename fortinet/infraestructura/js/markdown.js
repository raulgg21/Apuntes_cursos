const content = document.getElementById("content");
const params = new URLSearchParams(window.location.search);

// Documento predeterminado
const documentName = params.get("doc") || "ip-estatica";

// Solo permitimos nombres sencillos para evitar rutas incorrectas
const validDocumentName = /^[a-z0-9-]+$/i.test(documentName);

async function loadMarkdown() {
    if (!validDocumentName) {
        showError("El nombre del documento no es válido.");
        return;
    }

    const markdownPath = `md/${documentName}.md`;

    try {
        const response = await fetch(markdownPath);

        if (!response.ok) {
            throw new Error(
                `No se encontró el archivo: ${markdownPath}`
            );
        }

        const markdown = await response.text();

        content.innerHTML = marked.parse(markdown);

        updateActiveLink();
    } catch (error) {
        console.error(error);

        showError(`
            No se pudo cargar el documento
            <strong>${markdownPath}</strong>.
            Comprueba que el archivo exista y que el nombre coincida exactamente.
        `);
    }
}

function updateActiveLink() {
    document.querySelectorAll(".sidebar-nav a").forEach((link) => {
        const isActive = link.dataset.doc === documentName;
        link.classList.toggle("active", isActive);
    });
}

function showError(message) {
    content.innerHTML = `
        <div class="error-message">
            <h1>Documento no encontrado</h1>
            <p>${message}</p>
        </div>
    `;
}

loadMarkdown();