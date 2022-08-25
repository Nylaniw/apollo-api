const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Query {
    liveCarbonIntensity(zone: String!): LiveCarbonIntensityResponse!
    carbonIntensityHistory(zone: String!): CarbonIntensityHistoryResponse!
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

  type CarbonIntensityHistory {
    zone: String
    history: [CarbonIntensity]
  }

  type CarbonIntensity {
    zone: String!
    carbonIntensity: Int
    datetime: Date
    updatedAt: Date
    emissionFactorType: String
    isEstimated: Boolean
    estimationMethod: String
  }
`;

module.exports = typeDefs