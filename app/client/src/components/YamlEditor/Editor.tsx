import React, { useState } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyTwoTone';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import FindReplaceTwoToneIcon from '@material-ui/icons/FindReplaceTwoTone';
import UndoTwoToneIcon from '@material-ui/icons/UndoTwoTone';
import RedoTwoToneIcon from '@material-ui/icons/RedoTwoTone';
import UnfoldLessTwoToneIcon from '@material-ui/icons/UnfoldLessTwoTone';
import UnfoldMoreTwoToneIcon from '@material-ui/icons/UnfoldMoreTwoTone';
import SelectAllTwoToneIcon from '@material-ui/icons/SelectAllTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/dracula';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-beautify';
import 'ace-builds/src-min-noconflict/ext-code_lens';
import 'ace-builds/src-min-noconflict/ext-elastic_tabstops_lite';
import 'ace-builds/src-min-noconflict/ext-emmet';
import 'ace-builds/src-min-noconflict/ext-error_marker';
import 'ace-builds/src-min-noconflict/ext-keybinding_menu';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-linking';
import 'ace-builds/src-min-noconflict/ext-modelist';
import 'ace-builds/src-min-noconflict/ext-options';
import 'ace-builds/src-min-noconflict/ext-prompt';
import 'ace-builds/src-min-noconflict/ext-rtl';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-spellcheck';
import 'ace-builds/src-min-noconflict/ext-split';
import 'ace-builds/src-min-noconflict/ext-static_highlight';
import 'ace-builds/src-min-noconflict/ext-statusbar';
import 'ace-builds/src-min-noconflict/ext-textarea';
import 'ace-builds/src-min-noconflict/ext-themelist';
import 'ace-builds/src-min-noconflict/ext-whitespace';
import { AceValidations, parseYamlValidations } from './Validations';
import { useStyles } from './styles';

interface YamlEditorProps {
	id?: string;
	content: string;
	filename: string;
}

const YamlEditor: React.FC<YamlEditorProps> = (props) => {
	const classes = useStyles();

	const { content, filename } = props;

	const [ isValid, setIsValid ] = useState(true);

	const [ errors, setErrors ] = useState({
		errorLine: ' ',
		errorPosition: ' ',
		errorType: ' ',
		errorInfo: ' '
	});

	const [ editorState, setEditorState ] = React.useState({
		markers: [],
		annotations: [],
		content: content
	});

	const YamlAce = React.createRef() as React.RefObject<AceEditor>;

	const onEditorChange = (value: string) => {
		let editorValidations: AceValidations = {
			markers: [],
			annotations: []
		};
		editorValidations = parseYamlValidations(value, classes);
		const stateObject = {
			markers: editorValidations.markers,
			annotations: editorValidations.annotations,
			content: value
		};
		if (stateObject.annotations.length > 0) {
			setIsValid(false);
			console.log(stateObject.markers);
			console.log(stateObject.annotations);
			setErrors({
				errorLine: (stateObject.annotations[0].row as unknown) as string,
				errorPosition: (stateObject.annotations[0].column as unknown) as string,
				errorType: stateObject.annotations[0].type as string,
				errorInfo: stateObject.annotations[0].text as string
			});
		} else {
			setIsValid(true);
			setErrors({
				errorLine: ' ',
				errorPosition: ' ',
				errorType: ' ',
				errorInfo: ' '
			});
		}
		setEditorState(stateObject as any);
	};

	const downloadYamlFile = () => {
		const element = document.createElement('a');
		const file = new Blob([ editorState.content as any ], {
			type: 'text/yaml'
		});
		element.href = URL.createObjectURL(file);
		let filenameArray = filename.split('/');
		let downloadFilename =
			filenameArray[2] +
			'-' +
			filenameArray[5].split('?')[0] +
			'-' +
			filenameArray[6] +
			'-' +
			filenameArray[7] +
			'-' +
			filenameArray[8];
		element.download = downloadFilename;
		document.body.appendChild(element);
		element.click();
	};

	const copycontent = () => {
		if (!navigator.clipboard) {
			console.error('Oops Could not copy text: ');
			return;
		}
		navigator.clipboard
			.writeText(editorState.content as any)
			.catch((err) => console.error('Async: Could not copy text: ', err));
	};

	const startfinder = () => {
		(YamlAce.current!['editor'] as any).execCommand('find');
	};

	const startreplace = () => {
		(YamlAce.current!['editor'] as any).execCommand('replace');
	};

	const startundo = () => {
		(YamlAce.current!['editor'] as any).execCommand('undo');
	};

	const startredo = () => {
		(YamlAce.current!['editor'] as any).execCommand('redo');
	};

	const startfoldall = () => {
		(YamlAce.current!['editor'] as any).execCommand('foldall');
	};

	const startunfoldall = () => {
		(YamlAce.current!['editor'] as any).execCommand('unfoldall');
	};

	const startselectall = () => {
		(YamlAce.current!['editor'] as any).execCommand('selectall');
	};

	const startgotonexterror = () => {
		(YamlAce.current!['editor'] as any).execCommand('goToNextError');
	};

	const fullscreentrigger = () => {
		let i: any = document.getElementById('resize-editor');
		(YamlAce.current!['editor'] as any).setOption('maxLines', document.body.clientHeight);
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

	return (
		<div className={classes.editorBackgroundFull} id="editor">
			<div>
				<Typography className={classes.statusHeading}>
					<strong>Status YAML: </strong>

					<Typography
						className={classes.saved}
						style={{
							display: 'inline-block',
							fontFamily: 'Ubuntu',
							fontSize: 16
						}}
					>
						&nbsp; &nbsp;
						<strong>
							<span>
								<Typography
									style={{
										display: 'inline-block',
										fontFamily: 'Ubuntu',
										fontSize: 16
									}}
									color={isValid ? 'secondary' : 'error'}
								>
									{isValid ? '\u2713' : '\u274C'}
								</Typography>
							</span>
							<Typography
								id="YamlStatus"
								style={{
									display: 'inline-block',
									fontFamily: 'Ubuntu',
									fontSize: 16
								}}
								color={isValid ? 'secondary' : 'error'}
							>
								&nbsp;
								<strong>{isValid ? 'Correct' : 'Incorrect'}</strong>
							</Typography>
						</strong>
					</Typography>
				</Typography>
				<Typography className={classes.statusDescription}>
					{isValid ? (
						' '
					) : (
						'Pay attention to Line ' +
						errors.errorLine +
						"'s " +
						' character ' +
						errors.errorPosition +
						'. Type: ' +
						errors.errorType +
						' -> ' +
						errors.errorInfo +
						'.'
					)}
					&nbsp;
					{isValid ? 'Your code is fine. You can move on!' : 'Correct this error and keep moving forward!'}
				</Typography>
			</div>

			<Divider variant="middle" classes={{ root: classes.horizontalLineWhite }} />

			<Grid container>
				<Grid item xs={12} className={classes.editorButtonGrid}>
					<Tooltip title="Undo" placement="bottom" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }} arrow>
						<Button
							variant="outlined"
							className={classes.editorButtonUndo}
							onClick={startundo}
							startIcon={<UndoTwoToneIcon />}
						/>
					</Tooltip>

					<Tooltip title="Redo" placement="bottom" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }} arrow>
						<Button
							variant="outlined"
							className={classes.editorButtons}
							onClick={startredo}
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
							className={classes.editorButtonDownload}
							onClick={downloadYamlFile}
							startIcon={<GetAppTwoToneIcon />}
						/>
					</Tooltip>

					<Tooltip title="Copy" placement="bottom" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }} arrow>
						<Button
							variant="outlined"
							className={classes.editorButtons}
							onClick={copycontent}
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
							className={classes.editorButtons}
							onClick={startgotonexterror}
							startIcon={<ErrorTwoToneIcon />}
						/>
					</Tooltip>

					<Tooltip title="Find" placement="bottom" TransitionComponent={Fade} TransitionProps={{ timeout: 500 }} arrow>
						<Button
							variant="outlined"
							className={classes.editorButtons}
							onClick={startfinder}
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
							className={classes.editorButtonReplace}
							onClick={startreplace}
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
							className={classes.editorButtons}
							onClick={startunfoldall}
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
							className={classes.editorButtons}
							onClick={startfoldall}
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
							className={classes.editorButtonSelectAll}
							onClick={startselectall}
							startIcon={<SelectAllTwoToneIcon />}
						/>
					</Tooltip>
				</Grid>

				<Grid item xs={12}>
					<Grid container className={classes.editorContainer}>
						<Grid item xs={11} className={classes.editorGrid} id="resize-editor">
							<AceEditor
								mode="yaml"
								theme="dracula"
								name="code"
								width="100%"
								height="100%"
								maxLines={12000}
								minLines={29}
								highlightActiveLine={false}
								readOnly={false}
								tabSize={2}
								wrapEnabled={true}
								ref={YamlAce}
								fontSize={14}
								showGutter={true}
								onChange={onEditorChange}
								showPrintMargin={false}
								enableBasicAutocompletion={true}
								enableSnippets={true}
								enableLiveAutocompletion={true}
								value={editorState.content}
								editorProps={{
									$blockScrolling: Infinity,
									$useWorker: true
								}}
								onLoad={(editor) => {
									editor.focus();
									editor.setHighlightSelectedWord(true);
								}}
								annotations={editorState.annotations}
								markers={editorState.markers}
							/>
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
										className={classes.editorButtonFullScreen}
										onClick={fullscreentrigger}
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

				<Grid item xs={12} className={classes.extraSpace} />
			</Grid>
		</div>
	);
};

export default YamlEditor;
