const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const ctrl = require('./task_controller.js');


const multer = require('multer');
const multerupload = multer({ dest: 'temp/' });

router.post('/fileupload', multerupload.any(), ctrl.fileupload);

module.exports = router;