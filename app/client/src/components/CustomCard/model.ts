import React from "react";

export interface CardProps {
	id: string;
	title: string;
	expGrp: string;
	urlToIcon?: string;
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	handleExpGrpClick: (token: string) => void;
	experimentCount?: number;
	provider: string;
	description?: string;
	totalRuns?: number;
	chaosType?: string;
	chartType?: string;
}
