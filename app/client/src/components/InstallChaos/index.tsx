import { Typography, Button, Modal } from "@material-ui/core";
import Done from "@material-ui/icons/DoneAllTwoTone";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import YamlEditor from "../YamlEditor/Editor";

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
	const [yaml, setYaml] = useState(`kubectl apply -f ${yamlLink}`);
	const [yamlText, setYamlText] = useState(``);
	const [open, setOpen] = useState(false);
	const [reload, setReload] = useState(false);

	const handleClose = () => {
		setOpen(false);
		setReload(true);
	};

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

	function startEditing(text: string) {
		setEditing(true);
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

				<div className={classes.buttonBox}>
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
					{!editing ? (
						<Button
							variant="outlined"
							onClick={() => startEditing(yaml)}
							className={classes.displayYamlBtn}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									src="/icons/edit.svg"
									style={{ paddingRight: 10 }}
								/>
								<Typography>Edit</Typography>
							</div>
						</Button>
					) : (
						<Modal open={open} onClose={handleClose}>
							<div className={classes.modalContainer}>
								<div className={classes.modalContainerClose}>
									<Button
										variant="outlined"
										color="secondary"
										className={classes.closeButtonStyle}
										onClick={handleClose}
									>
										&#x2715;
									</Button>
								</div>
								<YamlEditor
									content={yamlText}
									filename={yamlLink}
								/>
							</div>
						</Modal>
					)}
				</div>
			</div>
		</div>
	);
}
