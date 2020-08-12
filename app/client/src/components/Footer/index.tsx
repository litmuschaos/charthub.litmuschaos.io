import { Typography } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";

interface CommunityItem {
	value: string;
	img?: string;
	alt?: string;
	link: string;
}

function Community(props: { header: string; data: CommunityItem[] }) {
	const classes = useStyles();
	return (
		<div>
			<Typography variant="h6" className={classes.footHeading}>
				{props.header}
			</Typography>

			{props.data.map((d, i) => (
				<div key={i} className={classes.commList}>
					<img
						src={d.img}
						alt={d.alt}
						style={{ paddingBottom: 15 }}
					/>
					<a href={d.link} target="#">
						<Typography className={classes.commData}>
							{d.value}
						</Typography>
					</a>
				</div>
			))}
		</div>
	);
}

function Copyright() {
	const classes = useStyles();
	return (
		<div className={classes.copyright}>
			<img
				className={classes.logo}
				src="/icons/litmus-light.png"
				alt="litmus logo"
			/>
			<Typography className={classes.copyrightText}>
				Copyright © 2020 LitmusChaos Authors. All rights reserved.
			</Typography>
			<Typography className={classes.copyrightText}>
				The Linux Foundation has registered trademarks and uses
				trademarks. For a list of trademarks of The Linux Foundation,
				please see our{" "}
				<a
					href="https://www.linuxfoundation.org/trademark-usage/"
					target="_"
				>
					Trademark Usage
				</a>{" "}
				page.
			</Typography>
		</div>
	);
}

const community: CommunityItem[] = [
	{
		value: "GitHub",
		img: "/icons/github.png",
		alt: "Github",
		link: "https://github.com/litmuschaos",
	},
	{
		value: "Slack",
		img: "/icons/slack.png",
		alt: "Slack",
		link: "https://slack.litmuschaos.io",
	},

	{
		value: "Twitter",
		img: "/icons/twitter.png",
		alt: "Twitter",
		link: "https://twitter.com/LitmusChaos",
	},
	{
		value: "Dev",
		img: "/icons/dev.png",
		alt: "Dev",
		link: "https://dev.to/t/litmuschaos/latest",
	},
	{
		value: "YouTube",
		img: "/icons/youtube.png",
		alt: "YouTube",
		link: "https://www.youtube.com/channel/UCa57PMqmz_j0wnteRa9nCaw",
	},
];

const resources: CommunityItem[] = [
	{
		value: "Docs",
		img: "/icons/docs.png",
		alt: "Docs",
		link: "https://docs.litmuschaos.io/docs/getstarted/",
	},
	{
		value: "FAQ",
		img: "/icons/faq.png",
		alt: "FAQ",
		link: "https://docs.litmuschaos.io/docs/faq-general/",
	},
	{
		value: "Issues",
		img: "/icons/issues.png",
		alt: "Issues",
		link: "https://github.com/litmuschaos/litmus/issues",
	},
];

const links: CommunityItem[] = [
	{
		value: "Get started",
		link: "https://docs.litmuschaos.io/docs/getstarted/",
	},
	{
		value: "Contribute",
		link: "https://github.com/litmuschaos/litmus",
	},
	{
		value: "Litmus Docs",
		link: "https://docs.litmuschaos.io/docs/getstarted/",
	},
];

const adoptors: CommunityItem[] = [
	{
		value: "Intuit",
		link: "https://github.com/litmuschaos/litmus/blob/master/ADOPTERS.md",
	},
	{
		value: "Wipro",
		link:
			"https://github.com/litmuschaos/litmus/blob/master/adopters/AppAnywhere.md",
	},
	{
		value: "OpenEBS",
		link:
			"https://github.com/litmuschaos/litmus/blob/master/adopters/openebs.md",
	},
	{
		value: "Zerebrium",
		link:
			"https://github.com/litmuschaos/litmus/blob/master/adopters/zebrium.md",
	},
];

export default function Footer() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div>
				<div className={classes.footerContainer} data-cy="Footer">
					<Copyright />
					<Community header="Links" data={links} />
					<Community header="Resources" data={resources} />
					<Community header="Top Adoptors" data={adoptors} />
					<Community header="Join the community" data={community} />
				</div>
			</div>
			<hr className={classes.horizontalLine} />
			<div>
				<Typography className={classes.footerText}>
					Originally created by <strong>Mayadata</strong>
				</Typography>
			</div>
		</div>
	);
}
