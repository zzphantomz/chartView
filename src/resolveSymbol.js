
export const resolveSymbol = (
  symbolName,
  onSymbolResolvedCallback,
  onResolveErrorCallback,
  extension
) => {


  if (!symbolName) {
    onResolveErrorCallback();
  } else {
    const symbolInfo = {
      ticker: symbolName,
      name: `${symbolName.toUpperCase()}/USD`,
      session: "24x7",
      timezone: "Etc/GMT",
      minmov: 1,
      // pricescale: 10000000,
      pricescale: 10000,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "30", "60"],
      has_empty_bars: true,
      has_weekly_and_monthly: true,
      supported_resolutions: ["1H"],
      // supported_intervals:["1", "5", "15", "30", "60", "1D", "1W", "1M"],
      // supported_resolutions: ['1D'],
      volume_precision: 1,
      data_status: "streaming",
      countBack: 30,
    };
    onSymbolResolvedCallback(symbolInfo);
  }
};
