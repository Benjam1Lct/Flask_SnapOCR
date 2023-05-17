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