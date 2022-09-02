const { RESTDataSource } = require('apollo-datasource-rest');

const AUTH_TOKEN = process.env.AUTH_TOKEN;

class ElectricityMapAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.electricitymap.org/v3/";
  }

  willSendRequest(request) {
    request.headers.set("auth-token", AUTH_TOKEN);
  }

  getLiveCarbonIntensity(zone) {
    return this.get(
      "carbon-intensity/latest",
      {
        zone,
      }
    );
  }

  getCarbonIntensityHistory(zone) {
    return this.get(
      "carbon-intensity/history",
      {
        zone,
      }
    );
  }

  getCarbonIntensityForecast(zone) {
    return this.get(
      "carbon-intensity/forecast",
      {
        zone,
      }
    )
  }

  getLivePowerBreakdown(zone) {
    return this.get(
      "power-breakdown/latest",
      {
        zone
      },
      {
        headers: {
          'auth-token': AUTH_TOKEN,
        },
      }
    );
  }
}

module.exports = ElectricityMapAPI;