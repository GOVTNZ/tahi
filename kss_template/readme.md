# Tahi Custom KSS template

## Assumes use of following technologies / approach

- Use of kss-node in parent project to generate living styleguide

## Setup

1. Include a reference to this repo in the parent project's package.json.
2. Create a kss config file in the parent project, that looks something like the example-config.json in this directory.
3. Run the styleguide creation CLI command. This can be part of a taskrunner (gulp) or run on the command line.

````bash
kss-node --config {path-to-file}/{name-of-kss-config.json}
````

## Styleguide development

- Compile styles

````bash
npm run sass
````
