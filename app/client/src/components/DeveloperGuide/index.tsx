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
	const [docs, setDocs] = React.useState<string | undefined>("");
	React.useEffect(() => {
		if (props.links.length > 1) {
			return props.links[1].url !== undefined
				? setDocs(props.links[1].url)
				: setDocs("https://docs.litmuschaos.io/docs/getstarted/");
		}
		return setDocs("https://docs.litmuschaos.io/docs/getstarted/");
	});
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
							<div style={{ display: "block", paddingTop: 25 }}>
								<img src="/icons/guide.png" />
								<a href={docs} className={classes.guideLink}>
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
