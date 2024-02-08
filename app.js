import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

app.get("/ipqualityscore", async (req, res) => {
  const ip = req.query.ip;
  const userAgent = req.headers["user-agent"];
  const userLanguage = req.headers["accept-language"];
  const userID = "555"; // Your userID
  const transactionID = "234499"; // Your transactionID
  const strictness = "1"; // Strictness set to 1
  const allow_public_access_points = "true"; // Public Access Points as True
  const url = `https://www.ipqualityscore.com/api/json/ip/kUT2DHCMjeJjSyLbRWO1e0GjuUxeWpVH/${ip}?strictness=${strictness}&allow_public_access_points=${allow_public_access_points}&fast=true&lighter_penalties=true&user_agent=${encodeURIComponent(
    userAgent
  )}&user_language=${encodeURIComponent(
    userLanguage
  )}&userID=${encodeURIComponent(userID)}&transactionID=${encodeURIComponent(
    transactionID
  )}`;
  const response = await fetch(url);
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
    res.status(500).send(`Error parsing JSON: ${error}`);
  }
});

app.get("/abuseipdb", async (req, res) => {
  const ip = req.query.ip;
  const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=365`;
  const response = await fetch(url, {
    headers: {
      Key: "d1c03a27089ace713e4db0edc4bdcbb1a3cd99dc3b973cf6a830d1bda34c3f854a3e608bdf8dc707",
      Accept: "application/json",
    },
  });
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    console.log(data);
    res.json(data.data);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
    res.status(500).send(`Error parsing JSON: ${error}`);
  }
});
app.get("/mxtoolbox", async (req, res) => {
  const domain = req.query.domain;
  const url = `https://mxtoolbox.com/api/v1/lookup/dns/${domain}`;
  const response = await fetch(url);
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
    res.status(500).send(`Error parsing JSON: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
