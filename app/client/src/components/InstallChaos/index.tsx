import { IconButton } from "@material-ui/core";
import Copy from "@material-ui/icons/FileCopyTwoTone";
import React from "react";
import { useStyles } from "./styles";

interface InstallProps {
	title: string;
	description: string;
	yamlLink: string;
}

export function InstallChaos(props: InstallProps) {
	const classes = useStyles();
	const { title, description, yamlLink } = props;
	return (
		<div className={classes.root}>
			<div className={classes.title}>{title}</div>
			<div className={classes.description}>{description}</div>
			<div className={classes.linkBox}>
				<div
					className={classes.yamlLink}
				>{`kubectl apply -f ${yamlLink}`}</div>
				<div>
					<IconButton onClick={() => console.log("copied")}>
						<Copy />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
