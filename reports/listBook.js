module.exports = (books) => {
    const today = new Date()

    let tableRows = ""
    books.forEach(book => {
      let tr = `
      <tr class="item">
       <td>${book.author.name}</td> 
       <td>${book.name_book}</td> 
       <td>${book.year_of_public}</td> 
       <td>${book.isbn}</td> 
       <td>${book.price}</td> 
       <td>${book.category}</td> 
        </tr>
       `
    tableRows += tr
    })

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>На списание</title>
  <style>
           .invoice-box {
           max-width: 800px;
           margin: auto;
           padding: 5px;
           border: 1px solid #eee;
           box-shadow: 0 0 10px rgba(0, 0, 0, .15);
           font-size: 10px;
           line-height: 24px;
           font-family: 'Helvetica Neue', 'Helvetica';
           color: #555;
           }
           .margin-top {
           margin-top: 50px;
           }
           .justify-center {
           text-align: center;
           }
           .invoice-box table {
           width: 100%;
           line-height: inherit;
           text-align: left;
           }
           .invoice-box table td {
           padding: 5px;
           vertical-align: top;
           }
           .invoice-box table tr td:nth-child(2) {
           text-align: right;
           }
           .invoice-box table tr.top table td {
           padding-bottom: 20px;
           }
           .invoice-box table tr.top table td.title {
           font-size: 25px;
           line-height: 35px;
           color: #333;
           }
           .invoice-box table tr.information table td {
           padding-bottom: 40px;
           padding-top:40px;
           }
           .invoice-box table tr.heading td {
           background: #eee;
           border-bottom: 1px solid #ddd;
           font-weight: bold;
           }
           
           .invoice-box table tr.item td {
           border-bottom: 1px solid #eee;
           }
           .invoice-box table tr.item.last td {
           border-bottom: none;
           }
           .invoice-box table tr.total td:nth-child(2) {
           border-top: 2px solid #eee;
           font-weight: bold;
           }
           
           @media only screen and (max-width: 600px) {
           .invoice-box table tr.top table td {
           width: 100%;
           display: block;
           text-align: center;
           }
           .invoice-box table tr.information table td {
           width: 100%;
           display: block;
           text-align: center;
           }
           }
           
           .header {
            text-align: right;
            font-size: 11px;
            text-align: right;
            

            }
            #title{
            text-align: center;
            margin-top: 4em;
            }
  </style>
</head>
<body>
  <div class="header">
  <p>Муниципальное бюджетное </p>
  <p>общеобразовательное учреждение г. Абакана </p>     
  <p>"Средняя общеобразовательняя школа № 25" </p>  
  <p>Школьная библиотека</p> 
    </div>  
  <h5 id="title">Список книг на списание</h5>  

  <div class="invoice-box">
      <h3>№ акта списания ____</h3>
    <table cellpadding="0" cellspacing="0">
      <tr class="heading">
        <td>Автор</td>
        <td>Название книг</td>
        <td>Год издания</td>
        <td>ISBN</td>
        <td>Цена</td>
        <td>Категория</td>
      </tr>
      ${tableRows}
  </table>  
    <div>
      <tr class="information">
        <td colspan="2">
           <table>
              <tr>
                 <td>
                  Директор МБОУ "СОШ № 25"  Богинская Н.Ф. ___________ 
                 </td>
                 <td>
                    Дата списания: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`}
                 </td>
              </tr>
           </table>
        </td>
     </tr>
    </div>
  </div>  
</body>
</html>
    `
}