const Tour=require('../models/tourModel.js')

exports.aliasTopTours=(req,res,next)=>{
  req.query.limit="5"
  req.query.sort='-ratingAverage,price'
  req.query.fields="name,price,ratingAverage,summary,difficulty"
  next()
}
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

        let query = Tour.find(queryStr);
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      query=query.sort(sortBy)
    }else{
      query = query.sort('-createdAt');
    }
   if (req.query.fields) {
     const selectedFields = req.query.fields.split(',').join(' ');
     query = query.select(selectedFields);
   }
    const page=req.query.page * 1  ||1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page-1)* limit;
    query.skip(skip).limit(limit)
    if(req.query.page){
      const numTours=await Tour.countDocuments();
      if(skip >= numTours) throw new Error('the page doesn`t exist ')
    }
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
