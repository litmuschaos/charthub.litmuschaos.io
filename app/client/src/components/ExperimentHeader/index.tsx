import React from "react";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";

interface ExpInfoProps {
	title: string;
	runCount: number;
	description?: string;
	urlToIcon: string;
}

export function ExperimentHeader(props: ExpInfoProps) {
	const { title, runCount, description, urlToIcon } = props;
	const classes = useStyles();
	const desc = description?.split(".").slice(0, 1);
	return (
		<div className={classes.root}>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<img src={urlToIcon} className={classes.expImg} />
				<div className={classes.titleDiv}>
					<div className={classes.expHeader}>{title}</div>
					<div className={classes.expDesc}>
						<Typography>{desc}.</Typography>
					</div>
				</div>
				<div>
					<Typography className={classes.expInfo}>
						{runCount} runs
					</Typography>
				</div>
			</div>
		</div>
	);
}
export default ExperimentHeader;
