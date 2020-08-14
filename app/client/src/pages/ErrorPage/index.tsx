import { Typography } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";
import { ColorButton } from "./styles";
import { history } from "../../redux/configureStore";
import Footer from "../../components/Footer";
import MainHeader from "../../components/Header/index";

function ErrorPage() {
	const classes = useStyles();

	const handleClick = (event: React.SyntheticEvent) => {
		history.push("/");
	};

	return (
		<div>
			<MainHeader />
			<div className={classes.rootContainer}>
				<div className={classes.root}>
					<img
						src="./icons/Teaching.png"
						alt="Teaching Chaos Bird"
						className={classes.imgFix}
					/>
					<div className={classes.errMsgFix1}>
						<Typography className={classes.errorMsg}>
							Whoops!
						</Typography>
					</div>
					<Typography className={classes.errorMsg}>
						This page is unavailable.
					</Typography>
					<Typography className={classes.errorMsg}>
						&nbsp;{" "}
					</Typography>
					<Typography className={classes.errorMsgSmall}>
						The page does not exist, or please try again later
					</Typography>
					<Typography className={classes.errorMsg}>
						<ColorButton
							variant="contained"
							color="primary"
							className={classes.buttonHome}
							onClick={handleClick}
						>
							Go back home
						</ColorButton>
					</Typography>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ErrorPage;
