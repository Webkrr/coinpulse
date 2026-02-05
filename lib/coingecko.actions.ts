import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) {
  throw new Error("COINGECKO_BASE_URL could not be found");
}

if (!API_KEY) {
  throw new Error("COINGECKO_API_KEY could not be found");
}

type QueryParams = Record<string, string | number | boolean | undefined | null>;

type CoinGeckoErrorBody = {
  error?: string;
};

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate: number = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-pro-api-key": API_KEY!,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${
        errorBody.error || "No error message provided"
      }`
    );
  }

  return response.json();
}
