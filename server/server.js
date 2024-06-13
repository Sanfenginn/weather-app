const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path"); // 引入 path 模块

app.use(cors());
app.use(express.json());

// 代理 Google Places API 自动完成请求
app.get("/api/places", async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const { input, language } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input,
          key: apiKey,
          language: language,
        },
      }
    );
    console.log("response: ", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).send("Error fetching places");
  }
});

// 代理 Google Places API 地点详情请求
app.get("/api/place-details", async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const { place_id } = req.query;
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id,
          key: apiKey,
          language: "en",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).send("Error fetching place details");
  }
});

// 代理 Google Time Zone API 请求
app.get("/api/place-timezone", async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const { lat, lng } = req.query;
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/timezone/json",
      {
        params: {
          location: `${lat},${lng}`,
          timestamp: Math.floor(Date.now() / 1000),
          key: apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching place timezone:", error); // 更新错误信息
    res.status(500).send("Error fetching place timezone"); // 更新错误信息
  }
});

// 代理 Weather API 请求
app.get("/api/weather-data", async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&aqi=yes`;

  const translateText = async (text, targetLang = "en") => {
    const apiKey2 = process.env.GOOGLE_API_KEY;
    const url = "https://translation.googleapis.com/language/translate/v2";
    try {
      const response = await axios.post(
        url,
        {
          q: text,
          target: targetLang,
        },
        {
          params: {
            key: apiKey2,
          },
        }
      );
      const translation = response.data.data.translations[0].translatedText;
      // console.log("Translated Text:", translation);
      return translation;
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };

  try {
    const response = await axios.get(url);
    // 翻译天气城市数据
    const translatedCity = await translateText(
      response.data.location.name,
      "zh"
    );
    //final response
    const finalResponse = {
      ...response.data,
      translatedCity: translatedCity,
    };
    res.json(finalResponse); // 使用 res.json 发送 JSON 数据
    // res.json(response.data); // 使用 res.json 发送 JSON 数据
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
});

// 代理 OpenCage API 以获取位置信息
app.get("/api/location-by-coords", async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results[0];
    console.log("results: ", results);
    res.json({
      city: results.components.city || results.components.town,
      country: results.components.country_code.toUpperCase(),
      timezone: results.annotations.timezone.name,
    });
  } catch (error) {
    console.error("Error fetching location by coordinates:", error);
    res.status(500).send("Error fetching location by coordinates");
  }
});

// 代理 IPinfo API 以获取位置信息
app.get("/api/location-by-ip", async (req, res) => {
  const apiKey = process.env.IPINFO_API_KEY;
  const url = `https://ipinfo.io/json?token=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json({
      city: response.data.city,
      country: response.data.country,
      latitude: response.data.loc.split(",")[0],
      longitude: response.data.loc.split(",")[1],
      timezone: response.data.timezone,
    });
  } catch (error) {
    console.error("Error fetching location by IP:", error);
    res.status(500).send("Error fetching location by IP");
  }
});

// 静态文件在 /my-project/client/build 目录下
// __dirname 在 server.js 中的值是 /my-project/server
app.use(express.static(path.join(__dirname, "../client/build")));

// 所有未处理的请求都返回 React 应用的 index.html，让前端路由能正常工作
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = 51003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
