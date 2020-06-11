import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNextTwoTone";
import * as React from "react";

export function CustomBreadCrumbs(props: { location: string }) {
	const path: string[] = props.location.split("/");
	let intermediatRoutes: string = "/";
	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
		>
			<Link color="inherit" href="/" style={{ fontWeight: "bold" }}>
				Home
			</Link>
			{path.map((p: string) => {
				intermediatRoutes += p;
				if (p)
					return (
						<Link
							color="inherit"
							href={intermediatRoutes}
							style={{ fontWeight: "bold" }}
						>
							{p.charAt(0).toUpperCase() + p.slice(1)}
						</Link>
					);
				return "";
			})}
		</Breadcrumbs>
	);
}
