import React from "react";
import { useStyles } from "./styles";

const ReactMarkdown = require("react-markdown");

interface ExpInfoProps {
	title: string;
	runCount: number;
	contributer?: string;
	description?: string;
	videoURL?: string;
}
export function ExperimentInfo(props: ExpInfoProps) {
	const { title, runCount, contributer, description, videoURL } = props;
	const videoEmbed = videoURL?.replace(/watch\?v=/g, "embed/");
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.expHeader}>{title}</div>

			<div className={classes.expInfo}>
				Total Experiment Runs : {runCount}
				{contributer ? (
					<div>Contributed by : {contributer}</div>
				) : (
					<></>
				)}
			</div>

			<div className={classes.expDesc}>
				<ReactMarkdown source={description} />
			</div>
			{videoURL && (
				<iframe
					className={classes.video}
					allowFullScreen
					frameBorder="0"
					src={videoEmbed}
				/>
			)}
		</div>
	);
}
