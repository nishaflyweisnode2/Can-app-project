const express = require('express');
const router = express.Router();

const { makeCall, editCall } = require('../controller/callController');


router.post('/make-call', makeCall);

router.put('/edit/:callId', editCall);


module.exports = router;
