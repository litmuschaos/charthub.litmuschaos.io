import React from "react";
import { useStyles } from "./styles";
import { Typography, Icon } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";

interface Maintainers {
	name: string;
	email: string;
}

interface UsefulLinks {
	value: string;
	link: string;
}
interface Links {
	links: UsefulLinks[];
	platform: UsefulLinks[];
	maturity: UsefulLinks[];
}

function MaintainersLinks(props: { data: Maintainers[] }) {
	const classes = useStyles();
	const createMaintainers = (name: String, email: String) => {
		return (
			<div className={classes.usefulLinks}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Icon style={{ marginTop: 25, marginRight: 10 }}>
						<LinkIcon />
					</Icon>
					<Typography variant="body1" className={classes.heading}>
						Maintainers
					</Typography>
				</div>
				<div className={classes.maintainerField}>
					<Typography className={classes.maintainerlinkName}>
						{name}
					</Typography>
					<Typography className={classes.maintainerlinkEmail}>
						{email}
					</Typography>
				</div>
			</div>
		);
	};
	return (
		<div>
			{props.data.map((m: Maintainers) =>
				createMaintainers(m.name, m.email)
			)}
		</div>
	);
}

function Links(props: { data: Links }) {
	const classes = useStyles();
	const createLinks = (header: string, data: UsefulLinks[]) => {
		return (
			<div className={classes.usefulLinks}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Icon style={{ marginTop: 25, marginRight: 10 }}>
						<LinkIcon />
					</Icon>
					<Typography variant="body1" className={classes.heading}>
						{header}
					</Typography>
				</div>
				{data.map((d) => (
					<div>
						<a href={d.link} style={{ textDecoration: "none" }}>
							<Typography className={classes.linkType}>
								{d.value}
							</Typography>
						</a>
					</div>
				))}
			</div>
		);
	};
	return <div>{createLinks("Useful Links", props.data["links"])}</div>;
}

export function UsefulLinks() {
	const classes = useStyles();
	const maintainers: Maintainers[] = [
		{ name: "ksatchit", email: "karthik.s@mayadata.io" },
	];
	const links: Links = {
		links: [
			{ value: "Kafka Website", link: "#" },
			{ value: "Source Code", link: "#" },
			{ value: "Community Slack", link: "#" },
		],
		platform: [
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
		],
		maturity: [
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
		],
	};

	return (
		<div className={classes.mainDiv}>
			<Links data={links} />
			<MaintainersLinks data={maintainers} />
		</div>
	);
}
