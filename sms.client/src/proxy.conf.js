const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api",
    ],
    target: "https://localhost:7117",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
