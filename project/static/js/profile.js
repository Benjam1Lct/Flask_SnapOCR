window.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll(".paragraphe-specifique");
  
    paragraphs.forEach(function(paragraph) {
      if (paragraph.scrollHeight > paragraph.clientHeight) {
        paragraph.classList.add("overflowed");
      }
    });
  });
  


var deleteButtons = document.querySelectorAll('.deleteTuile');
const editButton = document.getElementById('penButton');
var activeButtonIds = [];


editButton.addEventListener('click', function() {
    var element = document.querySelector('#pen');
    var elementStyle = window.getComputedStyle(element);
    // Vérifiez si la propriété "display" a la valeur "none"
    if (elementStyle.display === "none") {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/profile', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ predictionId: activeButtonIds }));

        location.reload();

    } else {
        for (var i = 0; i < deleteButtons.length; i++) {
        var button = deleteButtons[i];
        
        button.style.display = 'flex';
        }
        console.log("Edition activée");
        document.querySelector('#pen').style.display = 'none';
        document.querySelector('#diskSave').style.display = 'block';
        // Sélectionner tous les boutons de suppression
        

        // Parcourir les boutons de suppression
        // Parcourir les boutons de suppression
        for (var i = 0; i < deleteButtons.length; i++) {
            (function() {
            var buttonDel = deleteButtons[i];
            
            // Ajouter un écouteur d'événements au clic sur chaque bouton
            buttonDel.addEventListener('click', function(event) {
                // Récupérer l'ID de la tuile
                var tuileId = this.getAttribute('id');
        
                // Extraire l'ID de l'attribut de classe
                var id = tuileId.replace('deleteTuile', '');
        
                // Faire quelque chose avec l'ID récupéré
                console.log('ID de la tuile :', id);
        
                // Vérifier si la classe "active" est ajoutée ou supprimée
                if (!buttonDel.classList.contains('active')) {
                    buttonDel.classList.add('active');
                    activeButtonIds.push(id); // Ajouter l'ID à la liste
                    console.log(activeButtonIds)
                } else {
                    buttonDel.classList.remove('active');
                    var index = activeButtonIds.indexOf(id);
                    if (index !== -1) {
                    activeButtonIds.splice(index, 1); // Supprimer l'ID de la liste
                    console.log(activeButtonIds)
                    }
                }
            });
            })();
        }
        
    }
});