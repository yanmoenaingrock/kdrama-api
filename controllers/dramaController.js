const Drama = require("./../models/dramaModel");
const catchAsync = require("./../utils/catchAsync");


exports.getAllDramas = catchAsync(async (req, res, next) => {
  // filtering
  const queryObj = { ...req.query };
  const excludedFields = ["sort", "limit", "page", "fields"];
  excludedFields.forEach((key) => {
    delete queryObj[key];
  });

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/gte|gt|lte|lt/g, (match) => `$${match}`);
  let query = Drama.find(JSON.parse(queryString));

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-releasedYear");
  }

  // limit fields
  if(req.query.fields) {
    console.log( typeof req.query.fields );
    const fields = req.query.fields.split(",").join(" ");
    query = query.select( fields );
  } else {
    query = query.select("-__v");
  }

  // pagination 
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numdocs = await Drama.countDocuments();
    if (skip >= numdocs) {
      throw new Error("This page doesn't exist");
    }
  }

  // execute the query
  const dramas = await query;

  res.status(200).json({
    status: "success",
    result: dramas.length,
    data: {
      data: dramas,
    },
  });
});

exports.createDrama = async (req, res, next) => {
  try {
    const newDrama = await Drama.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDrama,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getDrama = catchAsync(async (req, res, next) => {
  const drama = await Drama.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      data: drama,
    },
  });
});

exports.updateDrama = catchAsync(async (req, res, next) => {
  const updatedDrama = await Drama.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedDrama) {
    return next(new Error("No document found with this id"));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: updatedDrama,
    },
  });
});

exports.deleteDrama = catchAsync(async (req, res, next) => {
  const drama = await Drama.findByIdAndDelete(req.params.id);
  res.status(204).json({});
});
