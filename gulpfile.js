import gulp from "gulp";
import plumber from 'gulp-plumber';
import notify from "gulp-notify";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import ejs from "gulp-ejs";
import rename from "gulp-rename";
import sassGlob from "gulp-sass-glob";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

const ejsTask = (done) => {
	gulp
		.src(["./src/**/*.ejs", "!./src/**/_*.ejs"])
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(ejs())
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("./build"));
	done();
};

const sassTask = (done) => {
	gulp
		.src("./src/**/*.scss", gulp.task("sass"))
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(postcss([autoprefixer(
			{
				"overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 5"],
				cascade: false
			}
		)]))
		.pipe(gulp.dest("./build"));
	done();
};

const copyTask = (done) => {
	gulp
		.src(["./src/**/*{.png,jpg}"], {encoding:false})
		.pipe(gulp.dest("./build"));
	done();
};

const watchTask= (done) => {
	gulp.watch("./src/**/*.scss", sassTask);
	gulp.watch("./src/**/*.ejs", ejsTask);
	gulp.watch("./src/**/*{.png,jpg}", copyTask);
};


export default gulp.parallel(ejsTask, sassTask, copyTask);
export { ejsTask as ejs };
export { sassTask as sass };
export { copyTask as copy };
export { watchTask as watch };