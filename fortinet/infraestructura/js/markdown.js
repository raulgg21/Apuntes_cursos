document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const params = new URLSearchParams(window.location.search);

    // Documento predeterminado.
    // Debe coincidir con un archivo real dentro de la carpeta md.
    const documentName = params.get("doc") || "ip-estatica-gui";

    // Evita nombres con rutas como ../
    const validDocumentName = /^[a-z0-9-]+$/i.test(documentName);

    async function loadMarkdown() {
        if (!content) {
            console.error('No existe ningún elemento con id="content".');
            return;
        }

        if (!validDocumentName) {
            showError("El nombre del documento no es válido.");
            return;
        }

        const markdownPath = `./md/${documentName}.md`;

        content.innerHTML = `
            <p class="loading">
                Cargando documentación...
            </p>
        `;

        try {
            const response = await fetch(markdownPath);

            if (!response.ok) {
                throw new Error(
                    `Error HTTP ${response.status}: no se encontró ${markdownPath}`
                );
            }

            const markdown = await response.text();

            if (typeof marked === "undefined") {
                throw new Error(
                    "La librería marked no se ha cargado correctamente."
                );
            }

            content.innerHTML = marked.parse(markdown);

            updateActiveLink();
        } catch (error) {
            console.error("Error al cargar el Markdown:", error);

            showError(`
                No se pudo cargar el documento
                <strong>${markdownPath}</strong>.
                <br><br>
                ${error.message}
            `);
        }
    }

    function updateActiveLink() {
        document
            .querySelectorAll(".sidebar-nav a[data-doc]")
            .forEach((link) => {
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
});