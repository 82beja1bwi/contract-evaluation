# Analysis of Contract Calculation

Experiments to evaluate if users and sites with different preferences can reach win-win outcomes and if these are better than contracts without the protocol. Next, it investigates if dishonest behavior can lead to better individual scores, making undesired behavior more attractive than the desired honest FOTE.


## Overview

![image](https://github.com/user-attachments/assets/f842eb50-ec97-4c48-8958-e0eccc0c367b)


- Config files hold prefrences for personas
- JavaScript files calculate Nash-optimal contracts for every possible encounter
- Data analysis in Jupyter Notebooks

## Usage

Note: you can read the Jupyter Notebooks here in GitHub. If you want to execute code yourself, or would like to see a table of content, then you can do the following:

Prerequisites: 

- JavaScript ES6
- I recommend using VSCode with the Jupyter Extension, it allows you to nicely have a look at the JS as well as the python code

1. Clone this repository to your local machine.
5. Run main method to generate data
6. Run Jupyter Notebook

## Structure

- `src/scripts`: JS Code for data creation. Config files
- `src/domain`: Modules under test imported from Consent Agent
- csv files: Outputs of data creation
- ipynb files: Data analysis
