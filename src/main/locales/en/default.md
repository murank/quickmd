# Quick Markdown

Quick Markdown is a lightweight, standalone markdown editor that works in browser.
Original idea comes from [KanTanMarkdown ](https://tatesuke.github.io/KanTanMarkdown/).

## How to use

### Edit
To begin editing, click the right-top "Edit" button (or Ctrl-E).

Quick Markdown supports [GitHub Flavored Markdown](https://github.github.com/gfm/),
and also code highlighting.
Supported languages are listed in  [src/main/ts/lib/prismjs.ts](https://github.com/murank/quickmd/blob/master/src/main/ts/lib/prismjs.ts).

In order to customize the page design, open "CSS" tab and put additional stylesheet.
You can also preview the change in the preview area.


### Preview
You can preview whole document by clicking the right-top "Preview" button (or Ctrl-E) while editing.

The preview mode shows actual (i.e. not in editing) html document.


### Save
To save the document in editing, click the right-top "Save" button (or Ctrl-S).


### Update Quick Markdown
Update `quickmd.js` in `scripts` directory, then re-save the document.


## Limitations
Quick Markdown uses [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object so that you can't edit the document in the browsers which don't support Blob (e.g. <= IE9).

If the edit buttons are not shown in IE>=10, the browser may be blocking javascript in local.
Try re-open the document and allow to execute the local script.



## Contribution
Any issues or PR are welcome :)    
[Github](https://github.com/murank/quickmd/)


## License
MIT
