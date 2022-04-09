const pdfTemplate = require("./pdfEx")

const {Router} = require("express")

const router = Router()

const pdf = require("html-pdf")

const models = require("../model/student")


router.post('/create-pdf', async (req, res) => {
    const students = await models.findAll()

    pdf.create(pdfTemplate(students), {}).toFile(`${__dirname}/book.pdf`, (err) => {
        if(err) {
            res.send({
                error: 'report is not created'
            });
        }
        res.send();
    });
});

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/book.pdf`)
})

module.exports = router