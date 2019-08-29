package main

type Maintainer struct {
  Name string
  Email string
}

type Link struct {
  Name string
  Url string
}

type Icon struct {
  Base64data string `json:"base64data"`
  Mediatype string `json:"mediatype"`
}

type Metadata struct {
  Name string `json:"name"`
  Annotations Annotation `json:"annotations"`
}

type Annotation struct {
  Categories string `json:"categories"`
  Vendor string `json:"vendor"`
  CreatedAt string `json:"createdAt"`
  Repository string `json:"repository"`
  Support string `json:"support"`
  Description string `json:"description"`
}

type Spec struct {
  DisplayName string `json:"displayName"`
  Description string `json:"description"`
  Keywords []string `json:"keywords"`
  Version string `json:"Version"`
  Maturity string `json:"Maturity"`
  Maintainers []Maintainer `json:"maintainers"`
  MinKubeVersion string `json:"minKubeVersion"`
  Provider struct{
    Name string `json:"name"`
  } `json:"provider"`
  Links []Link `json:"links"`
  Icons []Icon `json:"icon"`
}


type Chart struct {
  ApiVersion string `json:"apiVersion"`
  Kind string `json:"kind"`
  Metadata Metadata `json:"metadata"`
  Spec Spec `json:"spec"`
}

type Charts []Chart
