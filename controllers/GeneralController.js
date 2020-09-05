const ResponseRecords = require("../models/GeneralModel");
const apiResponse = require("../helpers/apiResponse");
const {reValidateRequest} = require('../helpers/validateReq')

// Records Poco
function RecordsPoco(data) {
	this.startDate= data.startDate;
	this.endDate = data.endDate;
	this.minCount = data.minCount;
	this.maxCount = data.maxCount;
}

/**
 * General records.
 * 
 * @param {string}      startDate 
 * @param {string}      endDate
 * @param {integer}     minCount
 * @param {integer} 	maxCount
 * 
 * @returns {Object}
 */
exports.generalStore = [

	(req, res) => {
		try {
			
			const isValidate = reValidateRequest(req.body);
			if(!isValidate.isError){
		
				const {
				  startDate,
				  endDate,
				  minCount,
				  maxCount,
				} = req.body;

				const records = ResponseRecords.aggregate([
					{
						$match: {
							createdAt: {
								$gte: new Date(startDate),
								$lte: new Date(endDate)
							}
						}
					}, {
						$project: {
							key: 1,
							_id: 0,
							createdAt: 1,
							totalCount: {
								$sum: '$counts'
							}
						}
					}, {
						$match: {
							totalCount: {
								$gt: parseInt(minCount),
								$lt: parseInt(maxCount)
							}
						}
					}
				],function(err,result)
				{

					if(err) 
					apiResponse.ErrorResponse(res, result)
					else
					apiResponse.successResponse(res,result);
		
				});
			}else
			{
				apiResponse.validationErrorWithData(res,isValidate.message,isValidate);
			}
			
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

