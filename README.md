# Dependency info

Lists information summary for each 1-st level dependency of the project

## Installation

```shell
npm i -g deps-info
```

## Usage

```shell
npx deps-info > deps.json
```

or

```shell
npx deps-info --csv > deps.csv
```

or

```shell
npx deps-info react # prints all dependencies that contain "react" in the name
```

or

```shell
npx deps-info --only=prod # prints only production dependencies
```