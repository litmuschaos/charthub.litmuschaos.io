import React from "react";
import CardContainer from "./CardContainer";
import CardContent from "./CardContent";
import { CardProps } from "./model";

export default function CustomCard(props: CardProps) {
	return (
		<CardContainer>
			<CardContent {...props} />
		</CardContainer>
	);
}
