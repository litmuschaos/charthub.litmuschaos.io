/*
Copyright 2019 LitmusChaos Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package handler

type Chart struct {
	APIVersion  string             `yaml:"apiVersion"`
	Kind        string             `yaml:"kind"`
	Metadata    Metadata           `yaml:"metadata"`
	Spec        Spec               `yaml:"spec"`
	PackageInfo PackageInformation `yaml:"packageInfo"`
	Experiments []Chart            `yaml:"experiments" `
}

type Maintainer struct {
	Name  string `yaml:"name"`
	Email string `yaml:"email"`
}

type Link struct {
	Name string `yaml:"name"`
	URL  string `yaml:"url"`
}

type Faults struct {
	Name        string   `yaml:"name"`
	DisplayName string   `json:"displayName"`
	Description string   `yaml:"description"`
	Plan        []string `json:"plan"`
}

type Metadata struct {
	Name        string     `yaml:"name"`
	Version     string     `yaml:"version"`
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
	Plan                []string     `json:"plan"`
	Keywords            []string     `yaml:"keywords"`
	Maturity            string       `yaml:"maturity"`
	Maintainers         []Maintainer `yaml:"maintainers"`
	MinKubeVersion      string       `yaml:"minKubeVersion"`
	Scenarios           []string     `yaml:"scenarios"`
	Provider            struct {
		Name string `yaml:"name"`
	} `yaml:"provider"`
	Links           []Link   `yaml:"links"`
	Experiments     []string `yaml:"experiments"`
	Faults          []Faults `yaml:"faults"`
	ChaosExpCRDLink string   `yaml:"chaosexpcrdlink"`
	Platforms       []string `yaml:"platforms"`
	ChaosType       string   `yaml:"chaosType"`
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
