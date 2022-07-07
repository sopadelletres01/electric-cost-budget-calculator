//sec min hour dayM month dayW

var CronJob = require('cron').CronJob;
const ApiService = require("../services/electricPrice.service")
const Appliance = require("../models/Appliance.model")
module.exports = () => {

    
    // var job = new CronJob('*/30 * * * * *', function() {
    //     /*
    //     * Runs every day
    //     * at 12:00:00 AM.
    //     */
    // }, function () {
    //     /* This function is executed when the job stops */
    // },
    // true, /* Start the job right now */
    // "America/Sao_Paulo" /* Time zone of this job. */
    // );
    
    var job = new CronJob('00 00 18 * * *', async function() {
        console.log("Job executed")
        //get avg price
        const data = await ApiService.avg()
        const price = data.data.price
        const appliances = await Appliance.find({})
        for( appliance of appliances ){
            const appl = await Appliance.findById(appliance._id).populate("type consum")
            const multiplier = appl.consum.budget;
            const energy = (appl.type.power[1] * 24) * multiplier //MWh
            const totalCost = appl.totalCost
            const parsedPrice = Number((price * energy).toFixed(2))
            console.log("parsedPrice",parsedPrice)
            const applUpd = await appl.update({totalCost:totalCost+parsedPrice},{new:true})
            console.log("upd",applUpd )

        }
        /*
        * Runs every day
        * at 12:00:00 AM.
     */
    }, function () {
      /* This function is executed when the job stops */
    },
    true, /* Start the job right now */
    "America/Sao_Paulo" /* Time zone of this job. */
    );
    
    
}