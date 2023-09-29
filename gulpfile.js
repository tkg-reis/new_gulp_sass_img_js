const { src, dest, series, watch } = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const imageMin = require("gulp-imagemin");
// const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const purgecss = require("gulp-purgecss");
const cleancss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));


// command npx gulp sass
function defaultTask() {
  return watch(["./css/*.scss", "./css/setting/*.scss"], () => {
    return src("css/main.scss")
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(autoPrefixer())
      .pipe(dest("css"));
  });
}

exports.default = defaultTask;

// command npx gulp imagemin
function imagemin(done) {
  src("./img/**")
    .pipe(changed("./dist/img/"))
    .pipe(
      imageMin([
        pngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
        // jpegはcommonjsの環境下でgulpでは使用が不可。ejs(import)形式でしか無理そう。
        // mozjpeg({ quality: 65 }),
        imageMin.svgo(),
        imageMin.optipng({ optimizationLevel: 5 }),
        imageMin.gifsicle(),
      ])
    )
    .pipe(dest("./dist/img/"));

  done();
}

exports.imagemin = imagemin;

// command npx gulp js
function js(done) {
  src("./js/**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest("./dist/js/"));
  done();
}

exports.js = js;

// command gulp minify
function minify(done) {
  src("./css/*.css")
    .pipe(plumber())
    .pipe(
      purgecss({
        content: ["./html/*.html", "./html/**/*.js"],
      })
    )
    .pipe(cleancss())
    .pipe(dest("./dist/css/"));

  done();
}

exports.minify = minify;

