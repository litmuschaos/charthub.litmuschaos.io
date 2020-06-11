import { IconButton } from "@material-ui/core";
import Copy from "@material-ui/icons/FileCopyTwoTone";
import React from "react";
import { useStyles } from "./styles";

interface InstallProps {
	title: string;
	description: string;
	yamlLink: string;
}

function copyTextToClipboard(text: string) {
	if (!navigator.clipboard) {
		console.error("Oops Could not copy text: ");
		return;
	}
	navigator.clipboard
		.writeText(text)
		.then(() => console.log("Async: Copying to clipboard was successful!"))
		.catch((err) => console.error("Async: Could not copy text: ", err));
}

export function InstallChaos(props: InstallProps) {
	const classes = useStyles();
	const { title, description, yamlLink } = props;
	const yamlCommand = `kubectl apply -f ${yamlLink}`;
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
						<Copy />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
