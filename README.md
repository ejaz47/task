
## Description
To get final total from uploaded text file of bill.

## Setup
Clone or download this repo and run command in root dir
> **npm install**


##  Run
To start app in default development mode:
> **npm start** 


## API Description

**Method**: POST

**Url**:  `localhost:1234/task/fileupload`

**Parameter**:  
 

1. key : file  | value : {attach a text file}

**Output**:
content-type  →application/json;

    {
    	"success": 1,
        "total": "794"
    }

[Postman collection import link of Demo request](https://www.getpostman.com/collections/89f2da5715f302321319)
