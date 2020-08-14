import { Typography, IconButton } from "@material-ui/core";
import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./styles";
import { Link } from "../../redux/model";
interface DeveloperGuideProps {
	links: Link[];
}

function DeveloperGuide(props: DeveloperGuideProps) {
	const [display, setDisplay] = React.useState(true);
	console.log(props.links);
	const handleClose = () => {
		setDisplay(false);
	};
	let docs = "https://docs.litmuschaos.io/docs/getstarted/";
	for (let i = 0; i < props.links.length; ++i)
		if (props.links[i].name.toLowerCase() === "documentation") {
			docs = props.links[i].url;
			break;
		}

	const classes = useStyles();
	return (
		<>
			{display ? (
				<div className={classes.root}>
					<div style={{ display: "flex", flexDirection: "row" }}>
						<div className={classes.mainDiv}>
							<Typography className={classes.mainText}>
								Your new experiment is almost ready!
							</Typography>
							<Typography className={classes.textDesc}>
								Complete the steps listed in the developer`s
								guide to make it work on your chaos hubs
							</Typography>
							<div className={classes.imgDiv}>
								<img src="/icons/guide.png" alt="dev_guide" />
								<a
									href={docs}
									className={classes.guideLink}
									target="_"
								>
									Developer's guide
								</a>
							</div>
						</div>
						<div style={{ marginLeft: "auto" }}>
							<IconButton
								aria-label="upload picture"
								component="span"
								onClick={handleClose}
								className={classes.closeIcon}
							>
								<CloseIcon />
							</IconButton>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
export default DeveloperGuide;
