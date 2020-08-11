import React from "react";
import { useStyles } from "./styles";

const ReactMarkdown = require("react-markdown");

interface ExpInfoProps {
	title?: string;
	runCount?: number;
	description?: string;
	videoURL?: string;
}
export function ExperimentInfo(props: ExpInfoProps) {
	const { description, videoURL } = props;
	const videoEmbed = videoURL?.replace(/watch\?v=/g, "embed/");
	const classes = useStyles();
	return (
		<div className={classes.root}>
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
