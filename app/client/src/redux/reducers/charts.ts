import {
	ChartAction,
	ChartActions,
	ChartData,
	Experiment,
	ExperimentGroup,
} from "../model";
import createReducer from "./createReducer";

const initialState: ChartData = {
	experimentGroups: [],
	totalExpCount: 0,
};

export const chartData = createReducer<ChartData>(initialState, {
	[ChartActions.LOAD_ALL_CHARTS](state: ChartData, action: ChartAction) {
		let totalExpCount: number = 0;
		let experimentGroups: ExperimentGroup[] = [];

		action.payload.forEach((g: any) => {
			let exp: Experiment[] = [];
			if (g.Experiments)
				g.Experiments.forEach((e: any) => {
					let spec = e.Spec;
					totalExpCount++;
					exp.push({
						name: spec.DisplayName,
						metadataName: e.Metadata.Name,
						version: e.Metadata.Version,
						vendor: e.Metadata.Annotations.Vendor,
						createdAt: e.Metadata.Annotations.CreatedAt,
						supportLink: e.Metadata.Annotations.Support,
						description: spec.CategoryDescription,
						maturity: spec.Maturity,
						maintainers: spec.Maintainers
							? spec.Maintainers.map((m: any) => ({
									name: m.Name,
									email: m.Email,
							  }))
							: [],
						miniKubeVersion: spec.MiniKubeVersion,
						provider: spec.Provider.Name,
						links: spec.Links
							? spec.Links.map((l: any) => ({
									name: l.name,
									url: l.url,
							  }))
							: [],
						chaosExpCRDLink: spec.ChaosExpCRDLink,
						platforms: spec.Platforms,
					});
				});
			let spec = g.Spec;
			experimentGroups.push({
				name: spec.DisplayName,
				metadataName: g.Metadata.Name,
				version: g.Metadata.Version,
				vendor: g.Metadata.Annotations.Vendor,
				createdAt: g.Metadata.Annotations.CreatedAt,
				supportLink: g.Metadata.Annotations.Support,
				categoryDescription: spec.CategoryDescription,
				description: g.Metadata.Annotations.ChartDescription,
				maintainers: spec.Maintainers
					? spec.Maintainers.map((m: any) => ({
							name: m.Name,
							email: m.Email,
					  }))
					: [],
				miniKubeVersion: spec.MiniKubeVersion,
				provider: spec.Provider.Name,
				links: spec.Links
					? spec.Links.map((l: any) => ({
							name: l.name,
							url: l.url,
					  }))
					: [],
				chaosAllExpsCRDLink: spec.ChaosExpCRDLink,
				experiments: exp,
			});
		});
		return {
			...state,
			experimentGroups: experimentGroups,
			totalExpCount: totalExpCount,
		};
	},
});
