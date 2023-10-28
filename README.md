# Getting started

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

* Node.js (version >= 18.15.0)
* Yarn (package manager, version 1.22.19)
* Git

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/campo-libre.git
```

2. Change to the project directory:

```bash
cd campo-libre
```

3. Install project dependencies:

```bash
yarn install
```

4. Create .env file, with the following structure:
   DATABASE_URL="mongodb+srv://eduardoalmanza:AKzSjVwqe7Xf941g@campo-libre-cluster.gcbixg7.mongodb.net/prisma-mongo?retryWrites=true&w=majority"
   GOOGLE_ID=""
   GOOGLE_SECRET=""
   SECRET=""
   BASE_URL="http://localhost:3000"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=''
   STRIPE_SECRET_KEY=''

# Available Scripts

In the project directory, you can run the following scripts using Yarn:

* yarn dev - Start the development server with Next.js.
* yarn build - Build the project.
* yarn start - Start the production server.
* yarn lint - Run linting checks.
* yarn lint:fix - Run linting checks and attempt to fix issues.
* yarn prettier - Check code formatting using Prettier.
* yarn prettier:fix - Fix code formatting using Prettier.
* yarn analyze - Analyze the project bundle size.
* yarn storybook - Start Storybook for UI component development.
* yarn test-storybook - Test Storybook components.
* yarn build-storybook - Build Storybook.
* yarn test - Run tests using Jest.
* yarn e2e:headless - Run headless end-to-end tests using Playwright.
* yarn e2e:ui - Run end-to-end tests with a UI using Playwright.
* yarn format - Format code using Prettier.
* yarn coupling-graph - Generate a module coupling graph (you may need to install madge).

# Project Dependencies

The project relies on various npm packages. Here are some of the key dependencies:

* Next.js for building web applications.
* Prisma and @prisma/client for database operations.
* React and React-DOM for UI development.
* Tailwind CSS for styling.
* Jest for testing.
* Playwright for end-to-end testing.

And many more. You can find the complete list in the package.json file.

# Sequence Diagrams

1. Products list fetching diagram:
   
![architecture_overview drawio](https://github.com/RedBrickBurrito/CampoLibre/assets/20271819/5a3e851d-9b00-443d-8636-9d2e70431825)

2. Checkout diagram:

![architecture_overview drawio(2)](https://github.com/RedBrickBurrito/CampoLibre/assets/20271819/e6a49726-82a4-4f45-9432-267ec250f5c3)

