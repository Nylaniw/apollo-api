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
    livePowerBreakdown: async (_, {zone}, {dataSources}) => {
      try {
        const livePowerBreakdown =
          await dataSources.electricityMapAPI.getLivePowerBreakdown(zone);

        return {
          code: 200,
          success: true,
          message: `Successfully pulled live power breakdown for zone ${zone}`,
          powerBreakdown: livePowerBreakdown,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          livePowerBreakdown: null,
        };
      }
    }, 
    powerBreakdownHistory: async (_, {zone}, {dataSources}) => {
      try {
        const powerBreakdownHistory =
          await dataSources.electricityMapAPI.getPowerBreakdownHistory(zone);

        return {
          code: 200,
          success: true,
          message: `Successfully pulled live power breakdown history for zone ${zone}`,
          powerBreakdownHistory,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          powerBreakdownHistory: null,
        };
      }
    }, 
    testQuery: ( _, {datetime}) => {
      return "Input is a valid date";
    },
  },
  PowerProductionBreakdown: {
    hydrodischarge: ( parent ) => parent ["hydro discharge"],
    batterydischarge: ( parent ) => parent ["battery discharge"],
  },

  PowerImportBreakdown: {
    GBORK: ( parent ) => parent ["GB-ORK"],
    NONO2: ( parent ) => parent ["NO-NO2"],
  },

  PowerConsumptionBreakdown: {
    hydrodischarge: ( parent ) => parent ["hydro discharge"],
    batterydischarge: ( parent ) => parent ["battery discharge"],
  },

  PowerExportBreakdown: {
    GBORK: ( parent ) => parent ["GB-ORK"],
    NONO2: ( parent ) => parent ["NO-NO2"],
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
