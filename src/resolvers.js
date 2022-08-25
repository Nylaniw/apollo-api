const { GraphQLScalarType, Kind } = require("graphql");

let dateValidation = (value) => {
  const data = new Date(value);
  if (data instanceof Date && !isNaN(data)) {
    return data;
  }
  throw new Error("Provided value is not a valid date");
};

const resolvers = {
  Query: {
    liveCarbonIntensity: async (_, { zone }, { dataSources }) => {
      try {
        const carbonIntensity =
          await dataSources.electricityMapAPI.getLiveCarbonIntensity(zone);

        return {
          code: 200,
          success: true,
          message: `Successfully pulled live carbon intensity for zone ${zone}`,
          carbonIntensity,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          carbonIntensity: null,
        };
      }
    },
    carbonIntensityHistory: async (_, { zone }, { dataSources }) => {
      try {
        const carbonIntensityHistory =
          await dataSources.electricityMapAPI.getCarbonIntensityHistory(zone);

        return {
          code: 200,
          success: true,
          message: `Successfully pulled carbon intensity history for zone ${zone}`,
          carbonIntensityHistory,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          carbonIntensityHistory: null,
        };
      }
    },
    carbonIntensityForecast: async ( _, { zone }, { dataSources }) => {
      try {
        const carbonIntensityForecast = await dataSources.electricityMapAPI.getCarbonIntensityForecast(zone);
        
        return {
          code: 200,
          success: true,
          message: `Successfully pulled carbon intensity forecast for zone ${zone}`,
          carbonIntensityForecast,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          carbonIntensityHistory: null,
        };
      }
    },
    testQuery: ( _, {datetime}) => {
      return "Input is a valid date";
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize: dateValidation,
    parseValue: dateValidation,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        const data = new Date(ast.value);
        if (data instanceof Date && !isNaN(data)) {
          return data;
        }
        throw new Error("Provided value is not a valid date");
      }
      throw new Error("Provided value is not a valid date");
    },
  }),
};

module.exports = resolvers;
