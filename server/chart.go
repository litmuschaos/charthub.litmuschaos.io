package main

type Chart struct {
	ApiVersion  string             `yaml:"apiVersion"`
	Kind        string             `yaml:"kind"`
	Metadata    Metadata           `yaml:"metadata"`
	Spec        Spec               `yaml:"spec"`
	PackageInfo PackageInformation `yaml:"packageInfo"`
	Experiments []Chart            `yaml:"experiments"`
}

type Maintainer struct {
	Name  string
	Email string
}

type Link struct {
	Name string
	Url  string
}

type Icon struct {
	Link      string `yaml:"url"`
	Mediatype string `yaml:"mediatype"`
}

type Metadata struct {
	Name        string     `yaml:"name"`
	Annotations Annotation `yaml:"annotations"`
}

type Annotation struct {
	Categories       string `yaml:"categories"`
	Vendor           string `yaml:"vendor"`
	CreatedAt        string `yaml:"createdAt"`
	Repository       string `yaml:"repository"`
	Support          string `yaml:"support"`
	ChartDescription string `yaml:"chartDescription"`
}

type Spec struct {
	DisplayName         string       `yaml:"displayName"`
	CategoryDescription string       `yaml:"categoryDescription"`
	Keywords            []string     `yaml:"keywords"`
	Version             string       `yaml:"version"`
	Maturity            string       `yaml:"maturity"`
	Maintainers         []Maintainer `yaml:"maintainers"`
	MinKubeVersion      string       `yaml:"minKubeVersion"`
	Provider            struct {
		Name string `yaml:"name"`
	} `yaml:"provider"`
	Links           []Link   `yaml:"links"`
	Icons           []Icon   `yaml:"icon"`
	Experiments     []string `yaml:"experiments"`
	ChaosExpCRDLink string   `yaml:"chaosexpcrdlink"`
}

type PackageInformation struct {
	PackageName string `yaml:"packageName"`
	Experiments []struct {
		Name string `yaml:"name"`
		CSV  string `yaml:"CSV"`
		Desc string `yaml:"desc"`
	} `yaml:"experiments"`
}

type Charts []Chart
