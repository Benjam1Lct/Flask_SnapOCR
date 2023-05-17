const textWrite = document.getElementById('textCopy').textContent;
const typedText = new Typed('#typed-text', {
  strings: [textWrite],
  typeSpeed: 70,
  backSpeed: 70,
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

window.addEventListener('beforeunload', function() {
  var image_url = document.getElementById('urlImage').textContent;

  // Envoyer une requête AJAX à votre API Flask pour déclencher la suppression de l'image
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/supprimer_image_cloudinary', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ url: image_url }));
});