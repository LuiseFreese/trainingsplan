# Trainingsplan ICS Generator

## Overview

This application reads HTML files containing a training plan and generates an ICS file that can be imported into a calendar application. The ICS file includes events for each training session with the specified date, title, and description.

## How It Works

1. The application uses the `cheerio` library to read and parse the HTML files located in the `assets` folder.
2. The data from the HTML files is parsed to extract the dates, titles, and descriptions of the training sessions.
3. The `ics` library is used to create an ICS file with events for each training session.
4. The application uses `express` to create a server that provides an endpoint to download the generated ICS file.

## Installation

1. Clone the repository

   ```sh
   git clone https://github.com/yourusername/trainingsplan.git
   cd trainingsplan
```

2. Install the dependencies

```powershell
npm install
```

3. Place your HTML files (e.g., `–Woche 1– — KRAFT Runners.html`) in the assets folder.
4. Start the server

```powershell

npm start
```

5. Open your browser and navigate to: `http://localhost:3000/api/generate-ics`. The ICS file will be downloaded automatically.

## Features

You experience the minimal lovable version 💖

### Current Features

* Read training plan from HTML files
* Generate an ICS file with events for each training session
* Serve the ICS file via an HTTP endpoint

### Planned Features

* Import training plans from a PDF file
* User interface for uploading files
* Support for additional file formats (CSV, JSON)
* Customizable event details (location, reminders)
* Authentication and user management
* Integration with cloud storage services (OneDrive, Google Drive, Dropbox)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
