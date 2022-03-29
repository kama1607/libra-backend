const { createInvoice } = require("./generatePDF")

const invoice = {
    shipping: {
        name: "Tursunov",
        address: "12 Johnson's street",
        city: "Sydney",
        country: "Austalia",
        portal_code: "292902"
    },
    items: [
        {
            item: "Tc 100",
            description: "Toner Carrot",
            quantity: 2,
            amount: 500
        },
        {
            item: "USB_TEXT",
            description: "Usb Cable",
            quantity: 1,
            amount: 1000
        },
    ],
    subtorial: 8000,
    paid: 0,
    invoice_nr: 2020
}

createInvoice(invoice, "some.pdf")