const landing = document.getElementById('landing');
const viewer = document.getElementById('viewer');
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
let pdfDoc = null;
let pageNum = 1;

document.getElementById('start-reading').addEventListener('click', () => {
    landing.classList.add('hidden');
    viewer.classList.remove('hidden');
    loadPdf('./pdf/buku.pdf');
});

function loadPdf(url) {
    pdfjsLib.getDocument(url).promise.then(doc => {
        pdfDoc = doc;
        renderPage(pageNum);
    });
}

function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

document.getElementById('prev').addEventListener('click', () => {
    if (pageNum > 1) {
        pageNum--;
        renderPage(pageNum);
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (pageNum < pdfDoc.numPages) {
        pageNum++;
        renderPage(pageNum);
    }
});
