module.exports = (accounts, students) => {
    const today = new Date()

    let tableRows = ""
    let infoRows = ""
    accounts.forEach(account => {
       let rt =
       `
       <tr class="labels">
       <td>ФИО ученика: ${account.student.FIO}</td>
       <td> Класс: ${account.student.class.number} ${account.student.letter}</td>
       </tr>
       `     
        infoRows = rt

        let tr =
        `
        <tr class="item">
        <td>${account.book.author.name}</td>
        <td>${account.book.name_book}</td>
        <td>${account.book.year_of_public}</td>
        <td>${account.book.isbn}</td>
        <td>${account.book.price}</td>
        <td>${account.book.category}</td>
        <td>${account.date_of_issue}</td>
        <td>${account.return_date}</td>
        
     </tr>
        `
        tableRows += tr
    })
    return `
    <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>Отчёт индивидуальный</title>
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
           }
           .invoice-box table tr.heading td {
           background: #eee;
           border-bottom: 1px solid #ddd;
           font-weight: bold;
           }
           

           .invoice-box table tr.details td {
           padding-bottom: 20px;
           }
           .invoice-box table tr.item td {
           border-bottom: 1px solid #eee;
           }
           .invoice-box table tr.item.last td {
           border-bottom: none;
           }
           .labels{
               font-weight: bold;

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
            <h5 id="title">ФОРМУЛЯР</h5>       
            <div class="invoice-box">

           <table cellpadding="0" cellspacing="0">
              <tr class="information">
                 <td colspan="7">
                    <table>
                       ${infoRows}
                    </table>
                 </td>
              </tr>
              <tr class="heading">
                 <td>Автор</td>
                 <td>Книга</td>
                 <td>Год издания</td>
                 <td>ISBN</td>
                 <td>Цена</td>
                 <td>Категория</td>
                 <td>Дата выдачи</td>
                 <td>Дата возврата</td>
              </tr>
              ${tableRows}
           </table>
        </div>
     </body>
  </html>
    
    `





}