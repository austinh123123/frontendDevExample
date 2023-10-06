# Example B2C Frontend Dev  Setup

Usage: 
```
npm install
npm run start
```
This will start the dev server on port 443. You can change the port in the webpack.config.js file.

You will need to change the hostname on line 21 of the webpack.config.js file to match your blob store host name. 

To deploy, run the following command:
```
npm run build
```
Then upload the contents of the dist folder to your blob store.

## Project Structure 

The project is structured as follows:


```src/helpers``` 
Contains a simple helper function to apply styles to each element

```src/pages```
Each folder in pages will be a separate page that can be referenced by content definition. Each page folder contains an index.js file that is the entry point for the page, and a config.js file to store styles. 

```src/shared```
Contains any shared styles or code between pages.