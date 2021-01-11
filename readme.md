# HTML5, JS (ES6), CSS (SCSS) starter pack with hot reloading

## To get started

This requires node version `12.13.1` which is set in the `package.json`. It is entirely your choice to change it if this a blocker for you. I recommend using a node manager tool such as [n](https://github.com/tj/n) to quickly change your version without any hassle.

This also uses [yarn](https://yarnpkg.com/en/docs/install) package manager so you'll need this to run and install packages.

### Instructions

Install packages: `yarn install`

Developer mode with hot reloading: `yarn dev`

Build site with minified assets: `yarn build`

## About the tools

### 🌍 HTML

You can use plain HTML with the small addition of [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) in order for reuse of HTML templates i.e. a navigation menu or meta tags. Existing templates can be found in `./src/templates`.

### 📄 Pages

To create an additional page requires two steps:

- create a html document in `./src/pages/<your-new-page>.html` without HTML boilerplate (i.e doctype, head, body, etc)
- create another html document in `./src/routes/<your-new-page>.html` and use [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) `@@include` to point to your newly created `page`. See example below.

```
@@include("../templates/page.html", { "page": "../pages/<your-new-page>.html" })
```

`./src/templates/page.html` contains the HTML5 boilerplate as well as the meta, links, scripts, etc. This approach ensures you can update a piece of HTML and it is reflected elsewhere in the website.

### 💅 CSS (SCSS)

CSS can be found in `./src/styles/main.scss`. If you're unfamiliar with [SCSS](https://sass-lang.com/) it is a precompilier for CSS which includes extra functionality, but if you don't want to use it, fear not, as it's entirely optional as standard CSS will _just work_.

### 🤖 JavasScript

[Babel](https://babeljs.io/) is used to "transpile"/compile a more modern JavaScript standard so you can use all of your fancy modern JS knowledge and have it compiled down to that older stuff 👴.

### 👩‍💻 Linting and Formatting

[Eslint](https://eslint.org/) is used to give warnings to any potential errors as well as formatting rules provided by [Prettier](https://github.com/prettier/prettier). You may need to add an eslint plugin to your code editor. There is also a pre-commit hook that will automatically format your code, so don't worry about zealously following the rules 🤘. If you want to _break_ rules you can find them chilling in the `.eslintrc` file.

## Contributing

I've built this for personal use but I hope it can be of some use to you. There are likely a myriad of issues and missing pieces will may make this not worth using for you, so if you notice how this can be improved then please create a PR or raise an issue.

## Other

Kind of inspired by the much better:
[html5-boilerplate](https://github.com/h5bp/html5-boilerplate)
