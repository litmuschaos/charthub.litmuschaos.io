import { Icon, Typography } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/LinkTwoTone";
import React from "react";
import { Link, Maintainer } from "../../redux/model";
import { useStyles } from "./styles";

interface UsefulLinks {
	links: Link[];
	maintainers: Maintainer[];
	platforms?: string[];
	maturity?: string;
}

export function UsefulLinks(props: UsefulLinks) {
	const classes = useStyles();
	const createMaintainers = (maintainers: Maintainer[]) => {
		return (
			<div className={classes.usefulLinks}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Icon style={{ marginRight: 10 }}>
						<LinkIcon />
					</Icon>
					<Typography variant="body1" className={classes.heading}>
						Maintainers
					</Typography>
				</div>
				{maintainers.map((m: Maintainer) => (
					<div className={classes.maintainerField}>
						<Typography className={classes.maintainerlinkName}>
							{m.name}
						</Typography>
						<Typography className={classes.maintainerlinkEmail}>
							{m.email}
						</Typography>
					</div>
				))}
			</div>
		);
	};

	const createLinks = (header: string, data: Link[]) => {
		return (
			<div className={classes.usefulLinks}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Icon style={{ marginRight: 10 }}>
						<LinkIcon />
					</Icon>
					<Typography variant="body1" className={classes.heading}>
						{header}
					</Typography>
				</div>
				{data.map((d) => (
					<div>
						<a href={d.url} style={{ textDecoration: "none" }}>
							<Typography className={classes.linkType}>
								{d.name}
							</Typography>
						</a>
					</div>
				))}
			</div>
		);
	};
	function createStaticData(header: string, data: string[]) {
		return (
			<div className={classes.usefulLinks}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Icon style={{ marginRight: 10 }}>
						<LinkIcon />
					</Icon>
					<Typography variant="body1" className={classes.heading}>
						{header}
					</Typography>
				</div>
				{data.map((d) => (
					<div>
						<Typography className={classes.staticType}>
							{d}
						</Typography>
					</div>
				))}
			</div>
		);
	}
	return (
		<div className={classes.mainDiv}>
			{createLinks("Useful Links", props.links)}
			{createMaintainers(props.maintainers)}
			{props.platforms !== undefined &&
				createStaticData("Platforms", props.platforms)}
			{props.maturity !== undefined &&
				createStaticData("Maturity", [props.maturity])}
		</div>
	);
}
