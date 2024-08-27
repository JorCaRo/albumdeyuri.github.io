document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelector('.sections');
    const addSectionModal = document.getElementById('addSectionModal');
    const uploadPhotoModal = document.getElementById('uploadPhotoModal');
    const addSectionButton = document.getElementById('addSectionButton');
    const closeAddSectionModal = document.getElementById('closeAddSectionModal');
    const closeUploadPhotoModal = document.getElementById('closeUploadPhotoModal');
    const addSectionForm = document.getElementById('addSectionForm');
    const uploadForm = document.getElementById('uploadForm');
    const mainContent = document.getElementById('main-content');
    const initialSection = document.getElementById('initial-section');
    const albumSection = document.getElementById('album-section');
    const albumTitle = document.getElementById('album-title');
    const photoSections = document.getElementById('photo-sections');
    const uploadPhotoButton = document.getElementById('uploadPhotoButton');

    let currentAlbumName = '';

    // Abrir el modal para añadir un apartado
    addSectionButton.addEventListener('click', function() {
        addSectionModal.style.display = 'block';
    });

    // Cerrar el modal de añadir un apartado
    closeAddSectionModal.addEventListener('click', function() {
        addSectionModal.style.display = 'none';
    });

    // Cerrar el modal de subir una foto
    closeUploadPhotoModal.addEventListener('click', function() {
        uploadPhotoModal.style.display = 'none';
    });

    // Añadir un nuevo apartado
    addSectionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const sectionName = document.getElementById('sectionName').value;
        const sectionColor = document.getElementById('sectionColor').value;

        const newTab = document.createElement('button');
        newTab.classList.add('section-tab');
        newTab.style.backgroundColor = sectionColor;
        newTab.textContent = sectionName;
        newTab.addEventListener('click', function() {
            enterAlbumSection(sectionName);
        });

        sections.appendChild(newTab);
        addSectionModal.style.display = 'none';
    });

    // Entrar en un apartado
    function enterAlbumSection(name) {
        currentAlbumName = name;
        albumTitle.textContent = `Bienvenido a ${name}`;
        initialSection.style.display = 'none';
        albumSection.style.display = 'block';
    }

    // Abrir el modal para subir una foto
    uploadPhotoButton.addEventListener('click', function() {
        uploadPhotoModal.style.display = 'block';
    });

    // Subir una nueva foto
    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('photoTitle').value;
        const description = document.getElementById('photoDescription').value;
        const file = document.getElementById('photoFile').files[0];
        const boxColor = document.getElementById('photoBoxColor').value;

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newPhotoSection = document.createElement('div');
                newPhotoSection.classList.add('photo-section');
                newPhotoSection.style.backgroundColor = boxColor;

                newPhotoSection.innerHTML = `
                    <img src="${e.target.result}" alt="${title}">
                    <h3>${title}</h3>
                    <p>${description}</p>
                `;

                photoSections.appendChild(newPhotoSection);

                // Limpiar el formulario y cerrar el modal
                uploadForm.reset();
                uploadPhotoModal.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    // Cerrar modales si se hace clic fuera de ellos
    window.onclick = function(event) {
        if (event.target === addSectionModal) {
            addSectionModal.style.display = 'none';
        }
        if (event.target === uploadPhotoModal) {
            uploadPhotoModal.style.display = 'none';
        }
    };
});
