# Trainingsplan

This application generates ICS and JSON files for a training plan that can be imported into a calendar application. The ICS file includes events for each training session with the specified date, title, and description. The JSON file is for future use cases.

## How It Works

1. The application uses the `cheerio` library to read and parse the HTML files located in the `assets` folder
2. The data from the HTML files is parsed to extract the dates, titles, and descriptions of the training sessions
3. The `ics` library is used to create an ICS file with events for each training session
4. The application uses `express` to create a server that provides endpoints to download the generated ICS and JSON files

## Installation

1. Clone the repository

```sh
    git clone https://github.com/luisefreese/trainingsplan.git
    cd trainingsplan
```

2. Install the dependencies

```sh
npm install
```

## Running the Project

1. Start the server

```sh
npm start
```

2. Access the endpoints to generate and download the ICS and JSON files:

- To generate and download the ICS file for the 5:00 training plan starting on January 1, 2025:

```sh
http://localhost:3000/api/generate-ics?folder=500&startDate=2025-01-01
```

- To generate and download the ICS file for the 4:30 training plan starting on January 1, 2025:

```sh

http://localhost:3000/api/generate-ics?folder=430&startDate=2025-01-01
```

- To generate and download the JSON file for the 5:00 training plan

```sh

http://localhost:3000/api/generate-json?folder=500
```

- To generate and download the JSON file for the 4:30 training plan

```sh
http://localhost:3000/api/generate-json?folder=430
```

## Endpoints

- **Generate JSON**: `/api/generate-json?folder=<folder>`
    - `folder`: The training plan folder (`500` for the 5:00 plan, `430` for the 4:30 plan)

- **Generate ICS**: `/api/generate-ics?folder=<folder>&startDate=<startDate>`
    - `folder`: The training plan folder (`500` for the 5:00 plan, `430` for the 4:30 plan).
    - `startDate`: The start date for the training plan (default is January 1, 2025).

By following these steps, you are be able to generate and download both the ICS and JSON files for the specified training plan and start date.
