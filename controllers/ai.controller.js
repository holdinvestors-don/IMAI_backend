const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const api_key = "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";
const jsonl_filepath = "./upload/fine_tune.jsonl";

const configuration = new Configuration({
  apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

exports.getAiAnswer = async (req, res) => {

  const question = req.body.data;

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: question,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });

  const answer = response.data.choices[0].text;

  res.json({
    status: 1,
    answer: answer
  });
}


exports.fileList = async (req, res) => {
  const response = await openai.listFiles();
  console.log("file list: ", response.data);
  res.json({
    status: 1,
    response: response.data
  });
}

exports.uploadFile = async (req, res) => {
  // delete exist file 
  if (global.file_id != "") {
    try {
      await openai.deleteFile(global.file_id);
    } catch (err) {
      console.error(err)
    }
  }
  // updalod new file
  let readStream = fs.createReadStream(jsonl_filepath);
  const response = await openai.createFile(readStream, "fine-tune");
  console.log("upload jsonl: ", response.data);

  // save uploaded file id
  global.file_id = response.data.id;

  // response uploaded file info
  res.json({
    status: 1,
    response: response.data
  });
}

exports.deleteFile = async (req, res) => {
  const file_id = req.query.file_id;
  const response = await openai.deleteFile(file_id);
  res.json({
    status: 1,
    response: response.data
  });
}

exports.createFineTune = async (req, res) => {
  try {
    const response = await openai.createFineTune({
      training_file: global.file_id,
    });
    global.fine_tune_id = response.data.id;
    res.json({
      status: 1,
      response: response.data
    });
  } catch (error) {
    console.error(err)
    res.json({
      status: 0,
      file_id: global.file_id
    });
  }
}

exports.getFineTunes = async (req, res) => {
  const response = await openai.listFineTunes();
  res.json({
    status: 1,
    response: response.data
  });
}

exports.getFineTune = async (req, res) => {
  const fine_tune_id = req.query.fine_tune_id;
  const response = await openai.retrieveFineTune(fine_tune_id);
  res.json({
    status: 1,
    response: response.data
  });
}

exports.deleteFineTune = async (req, res) => {
  const fine_tune_model_name = req.query.fine_tune_model_name;
  const response = await openai.deleteModel(fine_tune_model_name);
  res.json({
    status: 1,
    response: response.data
  });
}