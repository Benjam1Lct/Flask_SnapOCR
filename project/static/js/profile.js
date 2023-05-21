// Sélectionner tous les boutons de suppression
var deleteButtons = document.querySelectorAll('.deleteTuile');

// Parcourir les boutons de suppression
for (var i = 0; i < deleteButtons.length; i++) {
    var button = deleteButtons[i];
    
    // Ajouter un écouteur d'événements au clic sur chaque bouton
    button.addEventListener('click', function(event) {
        // Récupérer l'ID de la tuile
        var tuileId = this.getAttribute('id');

        // Extraire l'ID de l'attribut de classe
        var id = tuileId.replace('deleteTuile', '');

        // Faire quelque chose avec l'ID récupéré
        console.log('ID de la tuile :', id);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/profile', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ predictionId: id }));

        var tuile = this.closest('.prediction-tuile',id);
        tuile.style.display = 'none';
    });
}

const editButton = document.getElementById('editPredi');
const editValidate = document.getElementById('editPrediValid');

editButton.addEventListener('click', function() {
    for (var i = 0; i < deleteButtons.length; i++) {
        var button = deleteButtons[i];
        
        button.style.display = 'flex';
    }
    
    editButton.style.display = 'none';
    editValidate.style.display = 'flex';
});

   
editValidate.addEventListener('click', function() {
    for (var i = 0; i < deleteButtons.length; i++) {
        var button = deleteButtons[i];
        
        button.style.display = 'none';
    }
    
    editButton.style.display = 'flex';
    editValidate.style.display = 'none';
    location.reload(true);
});