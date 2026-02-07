import qs from "query-string";

const BASE_URL = process.env.NEXT_PUBLIC_COINGECKO_BASE_URL;
const API_KEY  = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

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
      "x-cg-demo-api-key": API_KEY!,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  });

  if (!response.ok) {
    const text = await response.text();

    let errorBody: CoinGeckoErrorBody = {};
    try {
      errorBody = JSON.parse(text);
    } catch {
      // ignore parse failure
    }

    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${
        errorBody.error || text || "No error message provided"
      }`
    );
  }

  return response.json();
}
