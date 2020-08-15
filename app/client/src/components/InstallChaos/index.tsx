import { Typography, Button, Modal, Hidden } from "@material-ui/core";
import Done from "@material-ui/icons/DoneAllTwoTone";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import YamlEditor from "../YamlEditor/Editor";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import PageviewOutlinedIcon from "@material-ui/icons/PageviewOutlined";

interface InstallProps {
	title: string;
	description: string;
	yamlLink: string;
}

export function InstallChaos(props: InstallProps) {
	const classes = useStyles();
	const { title, description, yamlLink } = props;
	const [copying, setCopying] = useState(false);
	const [viewing, setViewing] = useState(false);
	const [editing, setEditing] = useState(false);
	const [yamlText, setYamlText] = useState(``);
	const [open, setOpen] = useState(false);
	const [reload, setReload] = useState(false);
	const [yaml, setYaml] = useState(`kubectl apply -f ${yamlLink}`);

	const handleClose = () => {
		setOpen(false);
		setReload(true);
	};

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

	function showYamlInPage() {
		if (!viewing) {
			fetchYamlAndShowInPage(yamlLink);
			setViewing(true);
		} else {
			setYaml(`kubectl apply -f ${yamlLink}`);
			setViewing(false);
		}
	}

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

	function startEditing() {
		setYaml(`kubectl apply -f ${yamlLink}`);
		setViewing(false);
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
				{!viewing ? (
					<Typography
						variant="subtitle1"
						className={classes.yamlLink}
					>
						{yaml}
					</Typography>
				) : (
					<Typography
						variant="subtitle1"
						className={classes.yamlLink}
					>
						kubectl apply -f {yamlLink}
					</Typography>
				)}

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
									alt="copy"
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
					<Hidden mdUp>
						<Button
							variant="outlined"
							onClick={() => showYamlInPage()}
							className={classes.displayYamlBtn}
						>
							{!viewing ? (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
									}}
								>
									<PageviewOutlinedIcon
										style={{
											marginLeft: -10,
											height: 25,
											width: 25,
										}}
									/>
									<Typography style={{ marginTop: 2 }}>
										&nbsp;&nbsp;&nbsp;View
									</Typography>
								</div>
							) : (
								<CloseTwoToneIcon />
							)}
						</Button>
					</Hidden>

					<Hidden smDown>
						<Button
							variant="outlined"
							onClick={() => startEditing()}
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
									alt="Edit"
								/>
								<Typography>Edit</Typography>
							</div>
						</Button>
						{!editing ? (
							<div />
						) : (
							<Modal
								open={open}
								onClose={handleClose}
								style={{
									background: "rgba(33, 21, 86, 0.65)",
									backdropFilter: "blur(10px)",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div className={classes.modalContainer}>
									<div
										className={classes.modalContainerClose}
									>
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
					</Hidden>
				</div>

				<Hidden mdUp>
					{viewing ? (
						<Typography
							variant="subtitle1"
							className={classes.yamlLink}
						>
							{yaml}
						</Typography>
					) : (
						<div />
					)}
				</Hidden>
			</div>
		</div>
	);
}
