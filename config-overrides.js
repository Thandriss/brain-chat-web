const { override, useBabelRc } = require("customize-cra");

module.exports = override(
  (config) => {
    config = useBabelRc()(config);

    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (minimizer) => minimizer.constructor.name !== "CssMinimizerPlugin"
      );
    }

    return config;
  }
);