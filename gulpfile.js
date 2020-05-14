"use strict";

var gulp = require("gulp"),
  watch = require("gulp-watch"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  browserify = require("gulp-browserify"),
  sass = require("gulp-sass"),
  rimraf = require("rimraf"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload;

sass.compiler = require("node-sass");

var path = {
  dist: {
    html: "dist/",
    js: "dist/js/",
    scss: "dist/css/",
    css: "dist/css/",
    img: "dist/img/",
    fonts: "dist/fonts/"
  },
  app: {
    html: "app/*.html",
    js: "app/js/*.js",
    scss: "app/css/*.scss",
    css: "app/css/*.css",
    img: "app/img/**/*.*",
    fonts: "app/fonts/**/*.*"
  },
  watch: {
    html: "app/**/*.html",
    js: "app/js/**/*.js",
    scss: "app/css/**/*.scss",
    css: "app/css/**/*.css",
    img: "app/img/**/*.*",
    fonts: "app/fonts/**/*.*"
  },
  clean: "dist/"
};

var config = {
  server: {
    baseDir: "./dist"
  },
  tunnel: false,
  host: "localhost",
  port: 8080
};

var mapURL = "./";

gulp.task("html:build", function() {
  return gulp
    .src(path.app.html)
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({ stream: true }));
});

gulp.task("js:build", function() {
  return gulp
    .src(path.app.js)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(
      browserify({
        insertGlobals: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({ stream: true }));
});

gulp.task("scss:build", function() {
  return gulp
    .src(path.app.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({ browsers: ["last 2 versions", "> 5%", "Firefox ESR"] })
    )
    .pipe(sourcemaps.write(mapURL))
    .pipe(gulp.dest(path.dist.scss))
    .pipe(reload({ stream: true }));
});

gulp.task("css:build", function() {
  return gulp
    .src(path.app.css)
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({ stream: true }));
});

gulp.task("image:build", function() {
  return gulp
    .src(path.app.img)
    .pipe(gulp.dest(path.dist.img))
    .pipe(reload({ stream: true }));
});

gulp.task("fonts:build", function() {
  return gulp.src(path.app.fonts).pipe(gulp.dest(path.dist.fonts));
});

gulp.task(
  "build",
  gulp.parallel(
    "html:build",
    "js:build",
    "scss:build",
    "css:build",
    "fonts:build",
    "image:build"
  )
);

gulp.task("watch-html", function() {
  gulp.watch("./app/**/*.html", gulp.parallel("html:build"));
});
gulp.task("watch-js", function() {
  gulp.watch("./app/js/**/*.js", gulp.parallel("js:build"));
});
gulp.task("watch-scss", function() {
  gulp.watch("./app/css/**/*.scss", gulp.parallel("scss:build"));
});
gulp.task("watch-css", function() {
  gulp.watch("./app/css/**/*.css", gulp.parallel("css:build"));
});
gulp.task("watch-fonts", function() {
  gulp.watch("./app/fonts/**/*.*", gulp.parallel("fonts:build"));
});
gulp.task("watch-img", function() {
  gulp.watch("./app/img/**/*.*", gulp.parallel("image:build"));
});

gulp.task(
  "watch",
  gulp.parallel(
    "watch-html",
    "watch-js",
    "watch-scss",
    "watch-css",
    "watch-fonts",
    "watch-img"
  )
);

gulp.task("webserver", function() {
  browserSync.init(config);
});

gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});

gulp.task("default", gulp.parallel("build", "webserver", "watch"));
