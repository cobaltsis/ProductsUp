# ProductsUp Frontend Case Study Coding Task

This is my solution for the PorductsUp Case Study Task with goal to create a table with toolbox which allows users to filter provided data in table.

## Note

For this project I added Angular Material because it provides a lot of useful components like table with pagination and sorting, and decent looking forms with input and select fields, and validation features. On the development side of application, I added some dependencies which are useful for linting and code formatting.

There are things which could be also implemented:

- integration with router, so every filter and selection could be memorized, shared, and accessed trough URL query params 
- mechanism to check compatible filters, so user can't use filters that counteract each other
- sidebar usually should be separate component included in page
- items per page selector (dropdown) so user can change number of the visible rows per page
- image and video preview instead of opening in new tab/window
- loading indicator / placeholder
- it would be nice to have predefined lists of available categories, genders, sizes etc. 

## Requirements

This application requires Node and Angular CLI installed on machine

## Installation

In terminal, navigate to projects root folder and run `npm i` to install all required dependencies

## Development server

To start application, run `ng serve` command in terminal inside projects root folder for a dev server, and than navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
