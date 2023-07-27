import monthlyPayment from "./monthlyPayment";
import xsl from "../files/template.xsl"

function report(clientCheck, client, product, period) {
  let clientString
  if (clientCheck) {
    clientString = 
      `<chief>
        <surnameLegal>${client.chief.surnameLegal}</surnameLegal>
        <nameLegal>${client.chief.nameLegal}</nameLegal>
        <patronymicLegal>${client.chief.patronymicLegal}</patronymicLegal>
        <innLegal>${client.chief.innLegal}</innLegal>
      </chief>
      <org>
        <nameOrg>${client.org.nameOrg}</nameOrg>
        <ogrn>${client.org.ogrn}</ogrn>
        <innOrg>${client.org.innOrg}</innOrg>
        <kpp>${client.org.kpp}</kpp>
        <address>
          <region>${client.org.address.region}</region>
          <city>${client.org.address.city}</city>
          <street>${client.org.address.street}</street>
          <house>${client.org.address.house}</house>
        </address>
      </org>`
  } else {
    clientString = 
      `<client>
        <surnameIndividuals>${client.surnameIndividuals}</surnameIndividuals>
        <nameIndividuals>${client.nameIndividuals}</nameIndividuals>
        <patronymicIndividuals>${client.patronymicIndividuals}</patronymicIndividuals>
        <dateBirth>${client.dateBirth}</dateBirth>
        <innIndividuals>${client.innIndividuals}</innIndividuals>
        <passport>
          <serial>${client.passport.serial}</serial>
          <number>${client.passport.number}</number>
          <dateIssue>${client.passport.dateIssue}</dateIssue>
        </passport>
      </client>`
  }
  let productString = 
    `<table>
      ${monthlyPayment(product.amountLoan, period, product.dateOpenLoan).map((payment) => 
        `<payment>
          <number>${payment.number}</number>
          <date>${payment.date}</date>
          <amountPayment>${payment.amountPayment}</amountPayment>
          <percent>${payment.percent}</percent>
          <debt>${payment.debt}</debt>
        </payment>`
      ).join('')}
    </table>`
  let xmlString = `<?xml version="1.0" encoding="utf-8"?>
    <report>
      ${clientString}
      ${productString}
    </report>`
  const parser = new DOMParser();
  const xsltProcessor = new XSLTProcessor();
  const serializer = new XMLSerializer();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', xsl, false);
  xhr.send();
  var xslDOM = parser.parseFromString(xhr.responseText, "application/xml")
  var xmlDOM = parser.parseFromString(xmlString, "application/xml")
  xsltProcessor.importStylesheet(xslDOM);
  let result = serializer.serializeToString(xsltProcessor.transformToDocument(xmlDOM))
  var file = new Blob([result], {
    type: 'application/xml'
  })
  let url = URL.createObjectURL(file);
  var link = document.createElement('a');
  link.href = url
  link.download = 'report.xml'
  link.style = "display: none"
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default report