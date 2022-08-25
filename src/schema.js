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
`;

module.exports = typeDefs