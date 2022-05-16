# ESLint Playground

This repository contains the code for the [ESLint Playground](https://new.eslint.org/play).

This application is built with [Eleventy](https://www.11ty.io) and [React](https://reactjs.org/) and is hosted on [Netlify](https://www.netlify.com). We proxy from `/play` on the main website to this app, but the two are deployed separately.

## Developer Setup

To set up a local development environment, install [Node.js](https://nodejs.org/) (be sure to follow the instructions for your platform) and follow the steps below:

```sh
# Clone the repository
git clone git@github.com:eslint/playground.git

# Navigate to the root directory
cd playground

# Install dependencies
npm install
```

Once you have set up your environment, you can run a copy of the website locally using this command:

```sh
npm start
```

This will watch for changes to the source code and rebuild the website, which will be hosted at `http://localhost:2024/`.

## License

[Apache 2.0](LICENSE)
