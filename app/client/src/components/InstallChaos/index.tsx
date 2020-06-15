import { IconButton } from "@material-ui/core";
import Done from "@material-ui/icons/DoneAllTwoTone";
import Copy from "@material-ui/icons/FileCopyTwoTone";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";

interface InstallProps {
	title: string;
	description: string;
	yamlLink: string;
	engine: boolean;
}

export function InstallChaos(props: InstallProps) {
	const classes = useStyles();
	const { title, description, yamlLink, engine } = props;
	const [copying, setCopying] = useState(false);
	const [yaml, setYaml] = useState(`kubectl apply -f ${yamlLink}`);

	function fetchYaml(yamlLink: string) {
		fetch(yamlLink)
			.then((data) => {
				data.text().then((yamlText) => {
					setYaml(yamlText);
				});
			})
			.catch((err) => {
				console.error("Unable to fetch the yaml text" + err);
			});
	}

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

	useEffect(() => {
		if (engine) fetchYaml(yamlLink);
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.title}>{title}</div>
			<div className={classes.description}>{description}</div>
			<div className={classes.linkBox}>
				<div className={classes.yamlLink}>{yaml}</div>
				<div>
					<IconButton onClick={() => copyTextToClipboard(yaml)}>
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
