// Load the CSV dataset and convert it to JSON
d3.csv('C02_emissions.csv').then(function (data) {
    // Convert the CSV data to JSON
    const jsonData = data.map(function (d) {
      return {
        country: d.country,
        code: d.code,
        emissions_2020: parseFloat(d.emissions_2020),
      };
    });
  
    // Define the Vega-Lite specification
    const vlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width: 800,
      height: 500,
      data: { values: jsonData }, // Use the converted JSON data
      mark: 'geoshape',
      projection: { type: 'identity' },
      encoding: {
        color: {
          field: 'emissions_2020',
          type: 'quantitative',
          scale: { type: 'linear', nice: true },
          title: 'CO2 Emissions (2020)',
        },
        tooltip: [
          { field: 'country', type: 'nominal', title: 'Country' },
          { field: 'emissions_2020', type: 'quantitative', title: 'CO2 Emissions (2020)' },
        ],
      },
    };
  
    // Embed the visualization in the HTML div
    vegaEmbed('#choropleth', vlSpec);
  });