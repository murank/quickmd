# Quick Markdown

Quick Markdown is a lightweight, standalone markdown editor that works in browser.
Original idea comes from [KanTanMarkdown ](https://tatesuke.github.io/KanTanMarkdown/).

## Features
* works in most modern browsers (Chrome, Firefox, IE (>=10)).
  Any other tools (e.g. node.js) aren't required.
* generates a static html file, which can be visible in even older browsers.
* allows to customize stylesheet.


## How to use
Copy `template.html` and `scripts` directory in `dist` directory, and open the html file.
Then you can edit the content.

For more detailed usage, see [here](src/main/locales/en/default.md).


## How to build
Requirements: node.js.

1. clone this repository.
2. run `npm install`.
3. run `npm run webpack`.    
   (for production build, set `NODE_ENV` environment variable to `production`)


## Contribution
Any issues or PR are welcome :)    
[Github](https://github.com/murank/quickmd/)


## License
MIT
