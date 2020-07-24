const catchAsync = require("./../utils/catchAsync");
const Drama = require("./../models/dramaModel");


exports.getAllDramas = catchAsync( async(req,res,next) => {
    const dramas = await Drama.find();
    console.log( dramas );
    res.status(200).render("dramas", {
        dramas
    });
});

exports.addDrama = (req,res) => {
    res.status(200).render("add");
}