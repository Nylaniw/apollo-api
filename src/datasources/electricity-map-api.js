const { RESTDataSource } = require('apollo-datasource-rest');

const AUTH_TOKEN = process.env.AUTH_TOKEN;

class ElectricityMapAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = "https://api.electricitymap.org/v3/";
  }

  getLiveCarbonIntensity(zone) {
    return this.get(
      "carbon-intensity/latest",
      {
        zone,
      },
      {
        headers: {
          "auth-token": AUTH_TOKEN,
        },
      }
    );
  }

  getCarbonIntensityHistory(zone) {
    return this.get(
      "carbon-intensity/history",
      {
        zone
      },
      {
        headers: {
          'auth-token': AUTH_TOKEN,
        }
      }
    )
  }
}

module.exports = ElectricityMapAPI;