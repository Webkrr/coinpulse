import { NextConfig } from "next";
import React from "react";
import Image from "next/image";
import DataTable from "@/components/DataTable";
import { Link, TrendingDown } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";  
import { fetcher } from "@/lib/coingecko.actions";

const CoinOverview = async() =>{
    const coin = await fetcher<CoinDetailsData>("coins/bitcoin", {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      });
    return(
        <div id="coin-overview">
          <div className="header pt-2 flex items-center gap-3">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </div>
    )
}

export default CoinOverview;