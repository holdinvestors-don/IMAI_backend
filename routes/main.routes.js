const express = require("express");
const router = express.Router();

const homeController = require('../controllers/home.controller');
const aiController = require('../controllers/ai.controller');

router.get('/', homeController.homePage);
router.post('/save_json', homeController.saveJSON);
router.post('/get_ai_answer', aiController.getAiAnswer);

router.get('/file_list', aiController.fileList);
router.get('/upload_jsonl', aiController.uploadFile);
router.get('/delete_file', aiController.deleteFile);
router.get('/create_fine_tune', aiController.createFineTune);
router.get('/get_fine_tune', aiController.getFineTune);
router.get('/get_fine_tunes', aiController.getFineTunes);
router.get('/delete_fine_tune', aiController.deleteFineTune);

module.exports = router;
