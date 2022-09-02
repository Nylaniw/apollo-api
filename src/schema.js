const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Query {
    liveCarbonIntensity(zone: String!): LiveCarbonIntensityResponse!
    carbonIntensityHistory(zone: String!): CarbonIntensityHistoryResponse!
    carbonIntensityForecast(zone: String!): CarbonIntensityForecastResponse!
    testQuery(datetime: Date): String
  }

  type LiveCarbonIntensityResponse {
    code: Int!
    success: Boolean!
    message: String!
    carbonIntensity: CarbonIntensity
  }

  type CarbonIntensityHistoryResponse {
    code: Int!
    success: Boolean!
    message: String!
    carbonIntensityHistory: CarbonIntensityHistory
  }

  type CarbonIntensityForecastResponse {
    code: Int!
    success: Boolean!
    message: String!
    carbonIntensityForecast: CarbonIntensityForecast
  }

  type LivePowerBreakdownResponse {
    code: Int!
    success: Boolean!
    message: String!
    powerBreakdown: PowerBreakdown
  }

  type CarbonIntensityHistory {
    zone: String
    history: [CarbonIntensity]
  }

  type CarbonIntensityForecast {
    zone: String
    forecast: [CarbonIntensity]
  }

  type CarbonIntensity {
    zone: String
    carbonIntensity: Int
    datetime: Date
    updatedAt: Date
    emissionFactorType: String
    isEstimated: Boolean
    estimationMethod: String
  }

  type PowerBreakdown {
    zone: String!
    datetime: Date
    updatedAt: Date
    createdAt: Date
    powerConsumptionBreakdown: [PowerConsumptionBreakdown]
    powerProductionBreakdown: [PowerProductionBreakdown]
    powerImportBreakdown: [PowerImportBreakdown]
    powerExportBreakdown: [PowerExportBreakdown]
    fossilFreePercentage: Int
    renewablePercentage: Int
    powerConsumptionTotal: Int
    powerProductionTotal: Int
    powerImportTotal: Int
    powerExportTotal: Int
    isEstimated: Boolean
    estimationMethod: String
  }

  type PowerConsumptionBreakdown {
    nuclear: Int
    geothermal: Int
    biomass: Int
    coal: Int
    wind: Int
    solar: Int
    hydro: Int
    gas: Int
    oil: Int
    unknown: Int
    hydrodischarge: Int
    batterydischarge: Int
  }
  type PowerProductionBreakdown {
    nuclear: Int
    geothermal: Int
    biomass: Int
    coal: Int
    wind: Int
    solar: Int
    hydro: Int
    gas: Int
    oil: Int
    unknown: Int
    hydrodischarge: Int
    batterydischarge: Int
  }
  type PowerImportBreakdown {
    BE: Int
    FR: Int
    IE: Int
    NL: Int
    GB-ORK: Int
    NO-NO2: Int
  }
  type PowerExportBreakdown {
    BE: Int
    FR: Int
    IE: Int
    NL: Int
    GB-ORK: Int
    NO-NO2: Int
  }
`;

module.exports = typeDefs