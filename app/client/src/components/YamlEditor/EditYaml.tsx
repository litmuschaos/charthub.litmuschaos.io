import React, { Component } from "react";
import extendYamlMode from "./extendYamlMode.js";
import * as ace from "ace-builds";
import "ace-builds/webpack-resolver";
import { Typography, Button, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import GetAppTwoToneIcon from "@material-ui/icons/GetAppTwoTone";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import FindInPageTwoToneIcon from "@material-ui/icons/FindInPageTwoTone";
import FindReplaceTwoToneIcon from "@material-ui/icons/FindReplaceTwoTone";
import UndoTwoToneIcon from "@material-ui/icons/UndoTwoTone";
import RedoTwoToneIcon from "@material-ui/icons/RedoTwoTone";
import UnfoldLessTwoToneIcon from "@material-ui/icons/UnfoldLessTwoTone";
import UnfoldMoreTwoToneIcon from "@material-ui/icons/UnfoldMoreTwoTone";
import SelectAllTwoToneIcon from "@material-ui/icons/SelectAllTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

let race: any = extendYamlMode(ace);

type AceEditoriProps = {
	id?: string;
	content: string;
	lang?: string;
	writerestricted: string;
	filename: string;
	classpass?: any;
};

type AceEditoriState = {
	editor: null;
	errors: any;
	parsederrors: any;
	errorlinenumber: any;
	errorpositioninline: any;
	errordescription: any;
	errortype: any;
	isvalid: any;
	yamlstate: any;
	status: any;
	statusMark: any;
	statusColor: any;
	statusDescriptions: any;
	statusFromEditor: any;
	copy: any;
	blank: any;
	contentFromEditor: any;
};

export default class AceEditori extends Component<
	AceEditoriProps,
	AceEditoriState
> {
	constructor(props: any) {
		super(props);
		setInterval(
			() =>
				this.setState({
					errors: localStorage.getItem("YAMLErrors"),
					parsederrors: "",
					errorlinenumber: localStorage.getItem("errorline"),
					errorpositioninline: localStorage.getItem("errorposition"),
					errordescription: localStorage.getItem("errortext"),
					blank:
						(this.state.editor as any).getSession().getValue() ===
						""
							? true
							: false,
					errortype: localStorage.getItem("errortype"),
					isvalid:
						localStorage.getItem("errorposition") === "NO"
							? "Yes"
							: "No",
					yamlstate: localStorage.getItem("contentpass")
						? JSON.parse(localStorage.getItem("contentpass") as any)
						: " ",
					status:
						localStorage.getItem("errorposition") === "NO"
							? "Correct"
							: "Incorrect",
					statusMark:
						localStorage.getItem("errorposition") === "NO"
							? "\u2713"
							: "\u274C",
					statusColor:
						localStorage.getItem("errorposition") === "NO"
							? true
							: false,
					statusDescriptions:
						localStorage.getItem("errorposition") === "NO"
							? "Your code is fine. You can move on!"
							: "Correct this error and keep moving forward!",
					statusFromEditor:
						localStorage.getItem("errorposition") === "NO"
							? " "
							: this.state.errors,
					contentFromEditor: this.ModifiedYamlFileUpdater(),
				}),
			1
		);

		this.state = {
			editor: null,
			errors: "",
			parsederrors: "",
			errorlinenumber: "",
			errorpositioninline: "",
			errordescription: "",
			errortype: "",
			isvalid: "",
			yamlstate: "",
			status: "Incorrect",
			statusMark: "\u274C",
			statusColor: false,
			statusDescriptions: "",
			statusFromEditor: "",
			copy: false,
			blank: false,
			contentFromEditor: "",
		};
	}

	initAceEditor() {
		this.setState({
			editor: race.edit("editor", {
				mode: `ace/mode/yaml`,
				theme: "ace/theme/dracula",
				maxLines: 12000,
				minLines: 29,
				fontSize: 12,
				tabSize: 2,
				wrap: true,
				readOnly: this.props.writerestricted === "true" ? true : false,
				showPrintMargin: false,
				highlightActiveLine: true,
				selectionStyle: "text",
				highlightSelectedWord: true,
				cursorStyle: "smooth",
				wrapBehavioursEnabled: true,
				highlightGutterLine: true,
				animatedScroll: true,
				showInvisibles: false,
				foldStyle: "markbeginend",
				resize: true,
			}),

			errors: " ",
		});
	}

	componentDidMount() {
		this.initAceEditor();
	}

	ModifiedYamlFileUpdater = () => {
		const aceval = (this.state.editor as any).getSession().getValue();
		localStorage.setItem("ModifiedYaml", aceval);
		return aceval;
	};

	downloadYamlFile = () => {
		const aceval = (this.state.editor as any).getSession().getValue();
		const element = document.createElement("a");
		const file = new Blob([aceval as any], { type: "text/yaml" });
		element.href = URL.createObjectURL(file);
		element.download = this.props.filename + ".yaml";
		document.body.appendChild(element);
		element.click();
	};

	copycontent = () => {
		const aceval = (this.state.editor as any).getSession().getValue();
		if (!navigator.clipboard) {
			console.error("Oops Could not copy text: ");
			return;
		}
		navigator.clipboard
			.writeText(aceval as any)
			.catch((err) => console.error("Async: Could not copy text: ", err));
	};

	startfinder = () => {
		(this.state.editor as any).execCommand("find");
	};

	startreplace = () => {
		(this.state.editor as any).execCommand("replace");
	};

	startundo = () => {
		(this.state.editor as any).execCommand("undo");
	};

	startredo = () => {
		(this.state.editor as any).execCommand("redo");
	};

	startfoldall = () => {
		(this.state.editor as any).execCommand("foldall");
	};

	startunfoldall = () => {
		(this.state.editor as any).execCommand("unfoldall");
	};

	startselectall = () => {
		(this.state.editor as any).execCommand("selectall");
	};

	startgotonexterror = () => {
		(this.state.editor as any).execCommand("goToNextError");
	};

	startsettings = () => {
		(this.state.editor as any).execCommand("showSettingsMenu");
	};

	fullscreentrigger = () => {
		let i: any = document.getElementById("editor");
		(this.state.editor as any).setOption(
			"maxLines",
			document.body.clientHeight / 11.5
		);
		if (i.requestFullscreen) {
			i.requestFullscreen();
		} else if (i.webkitRequestFullscreen) {
			i.webkitRequestFullscreen();
		} else if (i.mozRequestFullScreen) {
			i.mozRequestFullScreen();
		} else if (i.msRequestFullscreen) {
			i.msRequestFullscreen();
		}
	};

	render() {
		return (
			<div className={this.props.classpass.editorBackgroundFull}>
				<div>
					<Typography className={this.props.classpass.statusHeading}>
						<strong>Status YAML: </strong>

						<Typography
							className={this.props.classpass.saved}
							style={{
								display: "inline-block",
								fontFamily: "Ubuntu",
								fontSize: 16,
							}}
						>
							&nbsp; &nbsp;
							<strong>
								<span>
									<Typography
										style={{
											display: "inline-block",
											fontFamily: "Ubuntu",
											fontSize: 16,
										}}
										color={
											this.state.blank
												? "error"
												: this.state.statusColor
												? "secondary"
												: "error"
										}
									>
										{this.state.blank
											? "Empty"
											: this.state.statusMark}
									</Typography>
								</span>
								<Typography
									id="YamlStatus"
									style={{
										display: "inline-block",
										fontFamily: "Ubuntu",
										fontSize: 16,
									}}
									color={
										this.state.statusColor
											? "secondary"
											: "error"
									}
								>
									&nbsp;
									<strong>
										{this.state.blank
											? ""
											: this.state.status}
									</strong>
								</Typography>
							</strong>
						</Typography>
					</Typography>
					<Typography
						className={this.props.classpass.statusDescription}
					>
						{this.state.blank
							? ""
							: this.state.errorpositioninline === "NO"
							? " "
							: "Pay attention to Line " +
							  this.state.errorlinenumber +
							  "'s " +
							  " character " +
							  this.state.errorpositioninline +
							  ". Type: " +
							  this.state.errortype +
							  " -> " +
							  this.state.errordescription +
							  "."}
						&nbsp;
						{this.state.blank ? "" : this.state.statusDescriptions}
					</Typography>
				</div>

				<Divider
					variant="middle"
					classes={{ root: this.props.classpass.horizontalLineWhite }}
				/>

				<Grid container>
					<Grid
						item
						xs={12}
						className={this.props.classpass.editorButtonGrid}
					>
						<Tooltip
							title="Undo"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={
									this.props.classpass.editorButtonUndo
								}
								onClick={this.startundo}
								startIcon={<UndoTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Redo"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={this.props.classpass.editorButtons}
								onClick={this.startredo}
								startIcon={<RedoTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Download"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={
									this.props.classpass.editorButtonDownload
								}
								onClick={this.downloadYamlFile}
								startIcon={<GetAppTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Copy"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={this.props.classpass.editorButtons}
								onClick={this.copycontent}
								startIcon={<FileCopyTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Goto Error"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={this.props.classpass.editorButtons}
								onClick={this.startgotonexterror}
								startIcon={<ErrorTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Find"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={this.props.classpass.editorButtons}
								onClick={this.startfinder}
								startIcon={<FindInPageTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Replace"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={
									this.props.classpass.editorButtonReplace
								}
								onClick={this.startreplace}
								startIcon={<FindReplaceTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Unfold All"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={this.props.classpass.editorButtons}
								onClick={this.startunfoldall}
								startIcon={<UnfoldMoreTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Fold All"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={this.props.classpass.editorButtons}
								onClick={this.startfoldall}
								startIcon={<UnfoldLessTwoToneIcon />}
							/>
						</Tooltip>

						<Tooltip
							title="Select"
							placement="bottom"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 500 }}
							arrow
						>
							<Button
								variant="outlined"
								className={
									this.props.classpass.editorButtonSelectAll
								}
								onClick={this.startselectall}
								startIcon={<SelectAllTwoToneIcon />}
							/>
						</Tooltip>
					</Grid>

					<Grid item xs={12}>
						<Grid
							container
							className={this.props.classpass.editorContainer}
						>
							<Grid
								item
								xs={11}
								className={this.props.classpass.editorGrid}
							>
								<div
									id="editor"
									className={
										this.props.classpass.editorPosition
									}
								>
									{this.props.content}
								</div>
							</Grid>

							<Grid item xs={1}>
								<div>
									<Tooltip
										title="Full Screen (Press Escape to End)"
										placement="bottom"
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 500 }}
										arrow
									>
										<Button
											variant="outlined"
											className={
												this.props.classpass
													.editorButtonFullScreen
											}
											onClick={this.fullscreentrigger}
											startIcon={
												<img
													src="/icons/fullscreen.svg"
													alt="Full Screen"
													color="#FFFFFF"
													width="25px"
													height="25px"
													margin-right="25px"
												/>
											}
										/>
									</Tooltip>
								</div>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						item
						xs={12}
						className={this.props.classpass.extraSpace}
					/>
				</Grid>
			</div>
		);
	}
}
