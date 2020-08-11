import { Grid, IconButton, Typography } from "@material-ui/core";
import Done from "@material-ui/icons/DoneAllTwoTone";
import Copy from "@material-ui/icons/FileCopyTwoTone";
import PageviewTwoToneIcon from "@material-ui/icons/PageviewTwoTone";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";

interface InstallProps {
	title: string;
	description: string;
	yamlLink: string;
}

export function InstallChaos(props: InstallProps) {
	const classes = useStyles();
	const { title, description, yamlLink } = props;
	const [copying, setCopying] = useState(false);
	const [editing, setEditing] = useState(false);
	const [viewing, setViewing] = useState(false);
	const [yaml, setYaml] = useState(`kubectl apply -f ${yamlLink}`);
	const [yamlText, setYamlText] = useState(``);
	const [open, setOpen] = useState(false);
	const [reload, setReload] = useState(false);

	function fetchYaml(yamlLink: string) {
		fetch(yamlLink)
			.then((data) => {
				data.text().then((yamlText) => {
					setYamlText(yamlText);
					setOpen(true);
				});
			})
			.catch((err) => {
				console.error("Unable to fetch the yaml text" + err);
			});
	}

	function fetchYamlAndShowInPage(yamlLink: string) {
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
			.catch((err) => console.error("Async: Could not copy text: ", err));

		setTimeout(() => setCopying(false), 3000);
	}

	function showYamlInPage(text: string) {
		if (!viewing) {
			fetchYamlAndShowInPage(yamlLink);
			setViewing(true);
		} else {
			setYaml(`kubectl apply -f ${yamlLink}`);
			setViewing(false);
		}
	}

	useEffect(() => {
		if (reload) {
			setEditing(false);
			setOpen(false);
			setReload(false);
		}
		if (editing) fetchYaml(yamlLink);
	}, [editing, reload, yamlLink]);

	return (
		<div className={classes.root}>
			<div className={classes.title}>{title}</div>
			<div className={classes.description}>{description}</div>
			<div className={classes.linkBox}>
				<Grid container>
					<Grid item xs={11}>
						<Typography
							variant="subtitle1"
							className={classes.yamlLink}
						>
							{yaml}
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<Grid container>
							<Grid item xs={12}>
								<IconButton
									onClick={() => copyTextToClipboard(yaml)}
								>
									{!copying ? (
										<Copy />
									) : (
										<Done className={classes.done} />
									)}
								</IconButton>
							</Grid>

							<Grid item xs={12}>
								<IconButton
									onClick={() => showYamlInPage(yaml)}
								>
									{!viewing ? (
										<PageviewTwoToneIcon />
									) : (
										<CloseTwoToneIcon />
									)}
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
