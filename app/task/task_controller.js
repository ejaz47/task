const { check, validationResult } = require('express-validator/check');
const fs = require("fs");
const path = require('path');
const fse = require('fs-extra');

const tempPath = process.cwd() + path.sep + 'temp';

// exports.validator = function(method){

//     switch (method){
//         case 'fileupload': {
//             return [
//                 check([]).not().isEmpty().withMessage('is required.'),
//             ]
//         };
//     }
// };


exports.fileupload = function(req,res){
	if(req.files != undefined){
	    let file = req.files[0];
	    fileValidation(req, res, file);

	}else{
		
		sendError(null, req, res, "No File uploaded");
        return;
	}
}

function fileValidation(req, res, file){

	let fileSizeLimit = 1000000 * 1; //5MB
	if(file.mimetype == 'text/plain' && file.size <= fileSizeLimit){
		fs.readFile(file.path, (err, data) => {
	  	  	if (err) {
	  	  		console.log("err ocurred", err);
				sendError([file], req, res, "Invalid File.");
		        return;
	  		}
	  	  	else{

	  	  		data = data.toString();
	  	  		// console.log(data);
	  	  		
	  	  		//match string by regex(find total and tendered in string)
	  	  		let matchArray = data.match(/(total|Tendered­).*/gim);
	  	  		console.log(matchArray);

	  	  		let total = 0;
	  	  		if(matchArray && matchArray.length){

	  	  			//select last occurance of regex match and replace alphabets if any.
		  	  		matchArray = matchArray[matchArray.length - 1].match(/\d.*/gi);
		  	  		if(matchArray && matchArray.length){
		  	  			total = matchArray[0].replace(',', '');
		  	  		}
	  	  		}

	  	  		fse.removeSync(tempPath + path.sep + file.filename);
	  	  		res.send({
					"success": 1,
					"total": total
				});
	  	  	}
	  	});
	}else{
		sendError([file], req, res, "The file should be Text and size limit is " + fileSizeLimit/1000000 + "MB");
        return;
	}
};

function sendError(files, req, res, message, error = {}){
	res.send({
		"success": 0,
		"message": message,
		"error": error
	});
	if(files){
		//delete temp files
		files.forEach(f => {
			fse.removeSync(tempPath + path.sep + f.filename);
		});
	}
}
