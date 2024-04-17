const express = require('express');
const app = express();
const ExpressError = require('./expressError');

function findMean(nums){
    if(nums.length === 0) return 0;
    return nums.reduce(function (acc, cur) {
      return acc + cur;
    }) / nums.length
  }

function findMode(nums){
    let frequency = {};
    let maxCount = 0;
    let maxNum;

    for(let num of nums){
        frequency[num] = (frequency[num] || 0) + 1;
    }
    for(let num in frequency){
        if(frequency[num] > maxCount){
            maxCount = frequency[num];
            maxNum = num;
        }
    }
    return maxNum;
}

function findMedian(nums){
    nums.sort((a, b) => a - b);  
    let middleIndex = Math.floor(nums.length / 2);
    let median;  
    if (nums.length % 2 === 0) {
        median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
        median = nums[middleIndex];
    }
    return median;
}

app.get('/mean', function(req, res, next){
    if(!req.query.nums){
        throw new ExpressError('no numbers passed in query', 400);
    }
    let nums = req.query.nums.split(',').map(Number);
    if(!nums.every(element => typeof element === 'number')){
        throw new ExpressError('Non-numbers in query', 400); 
    }
    let result = {
        operation: 'mean',
        result: findMean(nums)
    }
    return res.send(result);
});

app.get('/mode', function(req, res, next){
    if(!req.query.nums){
        throw new ExpressError('no numbers passed in query', 400);
    }
    let nums = req.query.nums.split(',').map(Number);
    if(!nums.every(element => typeof element === 'number')){
        throw new ExpressError('Non-numbers in query', 400); 
    }
    let result = {
        operation: 'mode',
        result: findMode(nums)
    }
    return res.send(result);
});

app.get('/median', function(req, res, next){
    if(!req.query.nums){
        throw new ExpressError('no numbers passed in query', 400);
    }
    let nums = req.query.nums.split(',').map(Number);
    if(!nums.every(element => typeof element === 'number')){
        throw new ExpressError('Non-numbers in query', 400); 
    }
    let result = {
        operation: 'median',
        result: findMedian(nums)
    }
    return res.send(result);
});

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
    return next(err);
  });

app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});

app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
});
  