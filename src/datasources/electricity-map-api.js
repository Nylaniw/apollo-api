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
}

module.exports = ElectricityMapAPI;