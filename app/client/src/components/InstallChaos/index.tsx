import { IconButton } from "@material-ui/core";
import Done from "@material-ui/icons/DoneAllTwoTone";
import Copy from "@material-ui/icons/FileCopyTwoTone";
import React, { useState } from "react";
import { useStyles } from "./styles";

interface InstallProps {
	title: string;
	description: string;
	yamlLink: string;
}

export function InstallChaos(props: InstallProps) {
	const classes = useStyles();
	const [copying, setCopying] = useState(false);

	const { title, description, yamlLink } = props;
	const yamlCommand = `kubectl apply -f ${yamlLink}`;

	function copyTextToClipboard(text: string) {
		if (!navigator.clipboard) {
			console.error("Oops Could not copy text: ");
			return;
		}
		setCopying(true);
		navigator.clipboard
			.writeText(text)
			.then(() =>
				console.log("Async: Copying to clipboard was successful!")
			)
			.catch((err) => console.error("Async: Could not copy text: ", err));

		setTimeout(() => setCopying(false), 3000);
	}
	return (
		<div className={classes.root}>
			<div className={classes.title}>{title}</div>
			<div className={classes.description}>{description}</div>
			<div className={classes.linkBox}>
				<div className={classes.yamlLink}>{yamlCommand}</div>
				<div>
					<IconButton
						onClick={() => copyTextToClipboard(yamlCommand)}
					>
						{!copying ? (
							<Copy />
						) : (
							<Done className={classes.done} />
						)}
					</IconButton>
				</div>
			</div>
		</div>
	);
}
