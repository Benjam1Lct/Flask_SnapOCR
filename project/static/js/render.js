const textWrite = document.getElementById('textCopy').textContent;
const saveTextButton = document.getElementById('buttonsave');
const typedText = new Typed('#typed-text', {
  strings: [textWrite],
  typeSpeed: 10,
  backSpeed: 10,
  loop: false,
  startDelay: 500,
  backDelay: 3000,
  showCursor: false
});

document.getElementById("buttonCopy").addEventListener("click", copy_password);

function copy_password() {
    var copyText = document.getElementById("textCopy");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

function convertTextToPDF() {
  var doc = new jspdf.jsPDF();
  var text = document.getElementById('textCopy').value;
  doc.text(text, 10, 10);
  doc.save('SnapOCR.pdf');
}

var convertButton = document.getElementById('buttonDownload');
convertButton.addEventListener('click', convertTextToPDF);

var saveTextButtonClicked = false;

document.getElementById('submitSave').addEventListener('click', function() {
  saveTextButtonClicked = true;
  // Autres actions à effectuer lors du clic sur le bouton saveTextButton
});

window.addEventListener('beforeunload', function(event) {
  if (!saveTextButtonClicked) {
    var image_url = document.getElementById('urlImage').textContent;

    // Envoyer une requête AJAX à votre API Flask pour déclencher la suppression de l'image
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/supprimer_image_cloudinary', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ url: image_url }));
  }
});

const openModalButton = document.getElementById('openModalButton');
const formModal = document.getElementById('formdiv');
openModalButton.addEventListener('click', function() {
  formModal.style.display = 'flex';
});

formModal.addEventListener('click', function() {
  formModal.style.display = 'none';
});

var form = document.getElementById('formModal');

// Empêcher la propagation de l'événement de clic du formulaire vers la boîte de dialogue modale
form.addEventListener('click', function(event) {
  event.stopPropagation();
});