
const clss = require("../model/class")

    const getClasses = async(req, res) => {
        try{
            const clsses = await clss.findAll()
            return res.status(200).json({
                clsses
            })
        }
        catch(e){
            console.log(e)
            return res.status(500)
            .send(e.message)
        }
    }

    module.exports.getClasses = getClasses