
var validator = require('validator');

exports.reValidateRequest=function reValidateRequest(reqObj) 
{
    var { startDate, endDate, minCount, maxCount } = reqObj;
    
    if(startDate==undefined || startDate==null)
    {
        return { isError:true, errorMessage: 'please provide start date' };
    } 
    else  if(endDate==undefined || endDate==null)
    {
        return { isError:true, errorMessage: 'please provide endDate date' };
    } 
    else if(minCount==undefined || minCount==null)
    {
        return { isError:true, errorMessage: 'please provide minimum Count' };
    } 
    else  if(maxCount==undefined || maxCount==null)
    {
        return { isError:true, errorMessage: 'please provide maximum Count' };
    } 
    else if (!isValidDate(startDate)) {
        return { isError:true, errorMessage: 'incorrect start date' };
    } else if (!isValidDate(endDate)) {
        return { isError:true,errorMessage: 'incorrect end date' };
    }
    else if (!validator.isInt(minCount)) {
        return {  isError:true,errorMessage: 'minimum count must be integer' };
    }
    else if (!validator.isInt(maxCount)) {
        return {  isError:true,errorMessage: 'maximum count must be integer' };
    }
    else if (minCount>maxCount) {
        return { isError:true,errorMessage: 'maximum count should be greater than minimum count' };
    }
    else if (minCount<=0 || maxCount<=0) {
        return { isError:true,errorMessage: 'minimum or maximum count should be greater than zero' };
    } else {
        return { isError:false, errorMessage: 'N/A' };
    }

  
};

function isValidDate(dateString) {
    console.log('dateString',dateString);
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) {
        return false;
    } // invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) {
        return false;
    } // NaN value, invalid date
    return d.toISOString().slice(0, 10) === dateString;
};

