import listData from "./data.js";
import PDFDocument from "pdfkit";
import fs from "fs";

let pdfDoc = new PDFDocument({
  size: "A4",
  margin: 50,
});

// generateTable(pdfDoc, listData);
generateDoc(pdfDoc, listData);

pdfDoc.end();
pdfDoc.pipe(fs.createWriteStream("./file.pdf"));

function generateDoc(doc, arr) {
  const chunkSize = 24;
  const groups = arr
    .map((e, i) => {
      return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });
  let i = 0;
  for (let group of groups) {
    if (i) {
      doc.addPage();
    }
    generateTable(doc, group, i, chunkSize);
    i++;
  }
}

function generateTable(doc, data, itr, chunkSize) {
  let i = 0;
  var dataTableTop = 30;

  generateTableRow(doc, dataTableTop, "Index", "Name", "Link", 1);
  for (let l of data) {
    const position = dataTableTop + (i + 1) * 30;
    generateTableRow(doc, position, chunkSize * itr + i + 1, l.name, l.Qlink);
    i++;
  }
}

function generateTableRow(doc, y, index, name, Qlink, type) {
  doc
    .fontSize(type ? 14 : 10)
    .fillColor("black")
    .text(index, 50, y, { underline: type ? true : false })
    .fillColor("black")
    .text(name, 150, y, { width: 140, underline: type ? true : false })
    .fillColor(type ? "black" : "blue")
    .text(Qlink, 300, y, {
      link: Qlink,
      underline: true,
    });
}
