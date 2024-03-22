### Lms Frontend Project

###setting up the Project
1.create a react project using vite
```
    npm create vite@latest
```
2.go to the Project directory
```
    cd Lms_Frontend
```
3.install dependencies
```
    npm install
```
4.run the project
```
    npm run dev
```
### install Tailwind css in the project
1.install Tailwind css
```
    npm install -D tailwindcss postcss autoprefixer
```
2.configure Tailwindconfig file
```
    npx tailwindcss init
```
3.Add the tailwind directives at the top of the 'index.css' file
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```
### Adding eslint rules for auto import sort and react hot Toast
1.install simple import sort package
```
    npm i -D eslint-plugin-simple-import-sort
```
2.Add Rule in '.eslint.cjs'
```
    'simple-import-sort/imports': 'error'
```
3.add simple-import sort plugin in '.eslint.cjs'
```
    plugins: [..., 'simple-import-sort']
```
4.To enable auto import sort on file save in vscode

    - open 'setting.json'
    - add the following config
```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```
### Toaster set up
    - import Toaster and use in main.jsx

### set up redux store
    - import configureStore from Redux Toolkit library and create store
    - create slice using createSlice method and export the slice Reducer
    - import the slice Reducer in store.js and use it in Reducer object inside configureStore.

### setting up React router 
    - import BrowserRouter in main.jsx and wrap all the component inside it so that all the component could access the Routing feature.