# Create React App example with Material-UI, TypeScript, Redux and Routing

This is a Boilerplate/Template for a react project with React Hooks, Material-UI 4 and React-Redux 7 (with hooks!).

[Preview Deployed website](https://silly-engelbart-cadbeb.netlify.app/)

<img width="100%" src="Screenshot-light.png" alt="example"/>
<img width="100%" src="Screenshot-dark.png" alt="example"/>

Inspired by:

- [Create React App example with Material-UI, TypeScript, Redux and Routing](https://github.com/innFactory/create-react-app-material-typescript-redux)
- [Material-UI](https://github.com/mui-org/material-ui)
- [react-redux-typescript-boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)

## Contains

- [x] [Material-UI](https://github.com/mui-org/material-ui)
- [x] [Typescript](https://www.typescriptlang.org/)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Redux-Thunk](https://github.com/gaearon/redux-thunk)
- [x] [Redux-Persist](https://github.com/rt2zz/redux-persist)
- [x] [React Router](https://github.com/ReactTraining/react-router)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)
- [x] PWA Support
- [x] [Husky](https://www.npmjs.com/package/husky)

## Roadmap

- [x] Make function based components and use hooks for state etc.
- [x] Implement [Material-UIs new styling solution](https://material-ui.com/css-in-js/basics/) based on hooks
- [x] use react-redux hooks
- [x] Setup Material UI custom styling soluton with TypeScript, with setup for dynamic theme switching with Redux
- [ ] Hot Reloading -> Waiting for official support of react-scripts

## How to use

Download or clone this repo

```bash
git clone https://github.com/arkajyotiMukherjee/-template-Create-React-App-with-Material-UI-TypeScript-Redux-and-Routing.git
```

or use this as a template:

More information from Github, [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

Install it and run:

```bash
cd app/client
npm i
npm start
```

Build it and serve:

```bash
cd app/client
npm run build
npm install -g serve
serve -s build
```

## Enable PWA ServiceWorker [OPTIONAL]

Just comment in the following line in the `index.tsx`:

```javascript
// registerServiceWorker();
```

to

```javascript
registerServiceWorker();
```

## Enable Prettier [OPTIONAL]

1.  Step: Install the Prettier plugin (e.g. the one of Esben Petersen)
2.  Add the following snippet to your settings in VSCode:

```json
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
       "source.organizeImports": true // optional
   },
```

## The idea behind the example

This example demonstrate how you can use [Create React App](https://github.com/facebookincubator/create-react-app) with [TypeScript](https://github.com/Microsoft/TypeScript) and add easy theme customonization with [Material UI](https://github.com/mui-org/material-ui).

## Contributors

- [Arkajyoti Mukherjee](https://github.com/arkajyotiMukherjee)

Big thanks to [innFactory](https://innfactory.de/)
