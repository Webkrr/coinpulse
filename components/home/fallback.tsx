import React from "react";
import DataTable from "@/components/DataTable";

export const CoinOverviewFallback = () => {
    return (
        <div id="coin-overview-fallback">
            <div className="header pt-2 flex items-center gap-3">
                <div className="header-image skeleton" />

                <div className="info">
                    <div className="header-line-sm skeleton" />
                    <div className="header-line-lg skeleton" />
                </div>

                <div className="ml-auto flex gap-2">
                    <div className="period-button-skeleton skeleton" />
                    <div className="period-button-skeleton skeleton" />
                    <div className="period-button-skeleton skeleton" />
                    <div className="period-button-skeleton skeleton" />
                </div>
            </div>

            <div className="chart p-2">
                <div className="chart-skeleton skeleton" />
            </div>
        </div>
    );
};

type TrendingFallbackRow = { id: string };

export const TrendingCoinsFallback = ({ rows = 6 }: { rows?: number }) => {
    const data: TrendingFallbackRow[] = Array.from({ length: rows }, (_, i) => ({
        id: `skeleton-${i}`,
    }));

    const columns: DataTableColumn<TrendingFallbackRow>[] = [
        {
            header: "Name",
            cellClassName: "name-cell",
            cell: () => (
                <div className="name-link">
                    <div className="name-image skeleton" />
                    <div className="name-line skeleton" />
                </div>
            ),
        },
        {
            header: "24h Change",
            cellClassName: "change-cell",
            cell: () => (
                <div className="price-change">
                    <div className="change-icon skeleton" />
                    <div className="change-line skeleton" />
                </div>
            ),
        },
        {
            header: "Price",
            cellClassName: "price-cell",
            cell: () => <div className="price-line skeleton" />,
        },
    ];

    return (
        <div id="trending-coins-fallback">
            <h4>Trending Coins</h4>

            <div className="trending-coins-wrapper">
                <DataTable
                    data={data}
                    columns={columns}
                    rowKey={(row) => row.id}
                    tableClassName="trending-coins-table"
                    headerCellClassName="py-3!"
                    bodyCellClassName="py-2!"
                />
            </div>
        </div>
    );
};