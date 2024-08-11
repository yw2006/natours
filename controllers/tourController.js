const Tour=require('../models/tourModel.js')

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const queryObj={...req.query}
    const excludedFeilds=['page','sort','limit','fields']
    excludedFeilds.forEach((el)=>delete queryObj[el])

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    queryStr = JSON.parse(queryStr);

    const query = Tour.find(queryStr);
    const tours=await query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message:err.message
    });
  }
  
};

exports.getTour = async (req, res) => {

  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message:err.message
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message:err.message
    });
  }
};

exports.updateTour =async (req, res) => {
   try {
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message:err.message
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message:err.message
    });
  }
};
