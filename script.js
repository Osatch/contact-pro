document.getElementById("fileInput").addEventListener("change", handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    
    if (file && file.name.endsWith(".xlsx")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });

            // Nous allons récupérer la première feuille du fichier Excel
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convertir la feuille en JSON (tableau d'objets)
            const json = XLSX.utils.sheet_to_json(sheet);

            displayContacts(json);
        };
        reader.readAsBinaryString(file);
    } else {
        alert("Veuillez télécharger un fichier Excel (.xlsx) valide.");
    }
}

function displayContacts(data) {
    const tableBody = document.querySelector("#contactsTable tbody");
    tableBody.innerHTML = ""; // Réinitialiser la table avant de remplir

    data.forEach(contact => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = contact["Nom"];
        row.appendChild(nameCell);

        const professionCell = document.createElement("td");
        professionCell.textContent = contact["Profession"];
        row.appendChild(professionCell);

        const phoneCell = document.createElement("td");
        const phoneButton = document.createElement("button");
        phoneButton.textContent = contact["Téléphone"];
        phoneButton.onclick = function() {
            copyToClipboard(contact["Téléphone"]);
        };
        phoneCell.appendChild(phoneButton);
        row.appendChild(phoneCell);

        tableBody.appendChild(row);
    });
}

// Fonction pour copier le numéro de téléphone dans le presse-papiers
function copyToClipboard(phoneNumber) {
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert(`Le numéro ${phoneNumber} a été copié dans le presse-papiers!`);
    }).catch(err => {
        console.error('Erreur lors de la copie :', err);
    });
}

// Fonction pour ouvrir Aircall avec le numéro pré-rempli
/*function openAircallWithPhoneNumber(phoneNumber) {
    const aircallUrl = `https://app.aircall.io/call/${phoneNumber}`;

    // Ouvrir Aircall dans un nouvel onglet
    window.open(aircallUrl, '_blank');

    // Optionnel : Vous pouvez également copier le numéro dans le presse-papiers si nécessaire
    navigator.clipboard.writeText(phoneNumber).then(() => {
        console.log(`Le numéro ${phoneNumber} a été copié dans le presse-papiers et envoyé à Aircall.`);
    }).catch(err => {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
    });
}*/

