export async function fetchBinanceOHLC(
  symbol: string,
  interval: string = "1h"
) {
  const url =
    `https://api.binance.com/api/v3/klines` +
    `?symbol=${symbol}&interval=${interval}&limit=200`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Binance request failed");
  }

  const data = await res.json();

  // Convert to your OHLCData format
  return data.map((candle: any[]) => [
    candle[0],                        // time
    parseFloat(candle[1]),            // open
    parseFloat(candle[2]),            // high
    parseFloat(candle[3]),            // low
    parseFloat(candle[4]),            // close
  ]);
}
