import gulp from "gulp";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import cleanCSS from "gulp-clean-css";
import sass from "gulp-sass";
import del from "del";
import fileInclude from "gulp-file-include";
import imagemin from "gulp-imagemin";
import favicon from "favicons";
import htmlmin from "gulp-htmlmin";

import config from "./config";

const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/styles/"
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/scripts/"
  },
  html: {
    src: "src/routes/*.html",
    template: "src/templates/*.html",
    pages: "src/pages/*.html",
    dest: "dist/"
  },
  images: {
    src: "src/images/*",
    dest: "dist/images"
  },
  favicon: {
    src: "src/favicon/favicon.png",
    dest: "dist/"
  }
};

export const clean = () => del(["dist"]);

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(paths.html.dest));
}

export function minifyHtml() {
  return gulp
    .src(`${paths.html.dest}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
}

export function images() {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest));
}

export function favicons() {
  return gulp
    .src(paths.favicon.src)
    .pipe(favicon.stream(config))
    .pipe(gulp.dest(paths.favicon.dest));
}

export function gulplisten() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch([paths.html.pages, paths.html.src, paths.html.template], html);
  gulp.watch([paths.images.src], images);
}

const build = gulp.series(
  clean,
  favicons,
  html,
  minifyHtml,
  gulp.parallel(styles, scripts, images)
);

gulp.task("build", build);

export default build;
