const axios = require("axios");
const FormData = require("form-data");
const https = require("https");

require("dotenv").config();
const image =
  "https://storage.googleapis.com/bacon-bucket-test/User1/finalimg/seriousbacon.jpeg";

const getImgBin = async () => {
  https.get(image, async (stream) => {
    var data = new FormData();
    data.append("file", stream);
    data.append("pinataOptions", '{"cidVersion": 1}');
    data.append(
      "pinataMetadata",
      '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
    );

    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      headers: {
        Authorization: "Bearer " + process.env.JWT_SECRET,
        ...data.getHeaders(),
      },
      data: data,
    };
    try {
      const res = await axios(config);
      console.log(res.data);
    } catch (e) {
      console.log(e.response);
    }
  });
};

getImgBin();
