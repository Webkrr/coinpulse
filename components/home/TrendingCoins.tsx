import React from "react";
import Image from "next/image";
import Link from "next/link";

import DataTable from "@/components/DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { fetcher } from "@/lib/coingecko.actions";

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "search/trending",
    {},
    300
  );

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;

        return (
          <Link
            href={`/coins/${item.id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={item.large}
              alt={item.name}
              width={36}
              height={36}
            />
            <p>{item.name}</p>
          </Link>
        );
      },
    },

    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const item = coin.item;

        const change =
          item.data.price_change_percentage_24h.usd;

        const isTrendingUp = change > 0;

        return (
          <div
            className={cn(
              "price-change flex items-center gap-1",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}

            <span>{change.toFixed(2)}%</span>
          </div>
        );
      },
    },

    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) =>
        formatCurrency(coin.item.data.price),
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>

      <div className="trending-coins-wrapper">
        <DataTable
          data={trendingCoins.coins.slice(0, 6) || []}
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
