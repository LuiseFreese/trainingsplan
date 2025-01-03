# Training Plan Generator

This application generates a marathon training plan based on the user's target time, fitness level, and preferred training days. The generated plan includes various types of training sessions such as long runs, tempo runs, interval training, easy runs, and rest days. The application also provides an ICS file with events for each training session.

## Features

1. Generates a 16-week marathon training plan
2. Customizes the plan based on the user's target time, fitness level, and preferred training days
3. Includes different types of training sessions: long runs, tempo runs, interval training, easy runs, yoga, and rest days
4. Export the training plan as an ICS file
5. Modals for long runs and yoga days with detailed instructions

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

1. Start the backend server

```sh
cd backend
npm start
```

2. in a new terminal tab start frontend server

```sh
cd frontend
npm start
```

## Usage

* Open the application in your browser at http://localhost:3000
* Select your fitness level, target time, and preferred training days
* Select **Generate Plan** to create your customized marathon training plan
* Select **Export to calendar** to create an .ics file download that you can import into Outlook

## Training Plan Logic

The training plan is generated based on the following logic:

### Phases

The plan is divided into four phases: Base, Build, Peak, and Taper.

* Base: 4 weeks (Weeks 1-4), focuses on building a foundation with lower mileage
* Build: 5 weeks (Weeks 5-9), increases mileage and intensity
* Peak: 3 weeks (Weeks 10-12), reaches the highest mileage and intensity
* Taper: 3 weeks (Weeks 13-15), reduces mileage to allow for recovery before the marathon
* Race Week: 1 week (Week 16), includes final preparations and the marathon race

### Training Sessions: Each week includes a variety of training sessions:

* Long Runs: Gradually increase in distance, focusing on endurance.
* Tempo Runs: Run at a challenging but sustainable pace to improve lactate threshold.
* Interval Training: Short, intense efforts followed by rest periods to improve speed and running economy.
* Easy Runs: Run at an easy pace to aid recovery and build aerobic capacity.
* Yoga: Focus on recovery and mobility exercises to enhance flexibility and prevent injuries.
* Rest Days: Essential for recovery and preventing overtraining.

### Paces

The paces for different types of runs are determined based on the user's target time:

* Easy Pace: A comfortable pace for easy runs and recovery.
* Tempo Pace: A challenging but sustainable pace for tempo runs.
* Interval Pace: A fast pace for interval training.
* Long Run Pace: A steady pace for long runs.
* Marathon Pace: The target pace for the marathon race.

### Customization

The plan is customized based on the user's fitness level and preferred training days. The training sessions are assigned to the selected days, ensuring a balanced distribution of different types of runs.

### Last Weeks Adjustments

In the last weeks (Taper phase and Race Week), the plan includes easy runs and yoga sessions before the marathon race to ensure the user is well-rested and prepared.

## How It Works

### Libraries Used    

* Express: A web framework for Node.js used to create the backend server.
* React: A JavaScript library for building user interfaces, used for the frontend
* Material-UI: A React component library for implementing Google's Material Design
* Date-fns: A library for manipulating dates in JavaScript.

### Key Functions

* `generateTrainingPlan.js`: This is the main entry point for generating the training plan. It uses other services to assign training days, calculate distances, and determine phases.
* `assignTrainingDays.js:` Called by generateTrainingPlan to assign training sessions to each week.
* `calculateLongRunDistance.js`: Called by assignTrainingDays to calculate the distance for long runs.
* `calculateWeeklyDistance.js`: Called by generateTrainingPlan to calculate the total weekly distance.
* `getPhase.js`: Called by generateTrainingPlan to determine the current phase of the training plan.
* `addMarathonRace.js`: Called by generateTrainingPlan to add the marathon race activities to the last week.
* `initializeTrainingPlan.js`: Called by generateTrainingPlan to initialize the training plan structure.

### Example Workflow

1. User Input: The user selects their fitness level, target time, and preferred training days on the frontend.
2. Generate Plan: When the user clicks "Generate Plan", the frontend sends a request to the backend with the selected options.
3. Training Plan Generation:
    * The backend uses `generateTrainingPlan` to create a customized training plan.
    * `generateTrainingPlan` initializes the training plan using `initializeTrainingPlan`.
    * For each week, `generateTrainingPlan` determines the phase using `getPhase`.
    * `generateTrainingPlan` calculates the weekly distance using `calculateWeeklyDistance`.
    * `generateTrainingPlan` assigns training days using `assignTrainingDays`.
    * `assignTrainingDays` calculates long run distances using `calculateLongRunDistance`.
    * In the last week, `generateTrainingPlan` adds the marathon race activities using `addMarathonRace`.
4. Response: The backend sends the generated training plan back to the frontend.
5. Display Plan: The frontend displays the training plan to the user, including the details of each training session.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License.
