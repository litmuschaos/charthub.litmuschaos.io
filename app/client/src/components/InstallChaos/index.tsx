import { Typography, Button, Hidden } from "@material-ui/core";
import Done from "@material-ui/icons/DoneAllTwoTone";
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
				<Typography variant="subtitle1" className={classes.yamlLink}>
					{yaml}
				</Typography>
				<Button
					variant="outlined"
					onClick={() => copyTextToClipboard(yaml)}
					className={classes.copyBtn}
				>
					{!copying ? (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<img
								src="/icons/copy.svg"
								alt="copy"
								style={{ paddingRight: 10 }}
							/>
							<Typography>Copy</Typography>
						</div>
					) : (
						<>
							<Done className={classes.done} />
							<Typography>Copied</Typography>
						</>
					)}
				</Button>
				<Hidden mdDown>
					<Button
						variant="outlined"
						onClick={() => showYamlInPage(yaml)}
						className={classes.displayYamlBtn}
					>
						{!viewing ? (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									src="/icons/edit.svg"
									alt="edit"
									style={{ paddingRight: 10 }}
								/>
								<Typography>Edit</Typography>
							</div>
						) : (
							<CloseTwoToneIcon />
						)}
					</Button>
				</Hidden>
			</div>
		</div>
	);
}
