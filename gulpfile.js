const gulp = require('gulp')
		, browserify = require('browserify')
		, nodemon = require('gulp-nodemon')
		, babel = require('gulp-babel')
		, autoprefixer = require('gulp-autoprefixer')
		, changed = require('gulp-changed')
		, concat = require('gulp-concat')
		, rename = require('gulp-rename')
		, sourcemaps = require('gulp-sourcemaps')
		, stylus = require('gulp-stylus')
		, uglify = require('gulp-uglify')
		, minify = require('gulp-minify-css')
		, watchify = require('watchify')
		, browserSync = require('browser-sync')
		, source = require('vinyl-source-stream')
		, buffer = require('vinyl-buffer')
		, plumber = require('gulp-plumber')
		, notify = require('gulp-notify')
		, reload = browserSync.reload
		, config = require('./config')

const b = browserify({
		entries: [ './dist/js/' + config.enter ],
		debug: true,
		NODE_ENV: 'development',
		cache: {},
	  packageCache: {},
	  plugin: [ watchify ]
	})

// b.on('update', bundle)
gulp.task('es6', () => {
	return gulp.src('app/es6/*.js')
		.pipe(changed('dist/js'))
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError('\n\033[31m Error: <%= error.message %> \033[0m')}))
		.pipe(babel({ 
			presets: ['es2015', 'stage-3', 'react'], 
			plugins: [ 'transform-runtime' ] 
		}))
		// .pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/js'))
})
gulp.task('styles', function() {
	return gulp.src('app/styl/*.styl')
		.pipe(changed('dist/css', { extension: '.css' }))
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError('\n\033[31m Error: <%= error.message %> \033[0m')}))
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(minify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/css'))
})
gulp.task('cssreload', ['styles'], reload)
gulp.task('reload', ['bundle'], reload)

gulp.task('watch', () => {
	// bundle()
	gulp.watch('app/styl/*.styl', ['cssreload'])
	gulp.watch('app/es6/*.js', ['reload'])
	gulp.watch('app/view/*.*', reload)
	gulp.watch('app/view/html/*.*', reload)
})


gulp.task('nodemon', function() {
	return	nodemon({
		script: config.server,
		env: {
			'NODE_ENV': 'development'
		},
		execMap: {
			js: 'node'
		},
		ignore : [ 'app/es6/**/*.js', 'dist/js/*.js' ]
	})
})

gulp.task('browser', [ 'nodemon' ], function() {
	browserSync.init({
			proxy: config.proxy,
			port: config.port
	})
})

gulp.task('default', [ 'browser', 'watch' ])

gulp.task('bundle', [ 'es6' ], bundle)

b.on('update', bundle)

function bundle() {
	return b.bundle()
		.on('error', function(err) { console.log('\033[31m' + err.message + '\033[0m'); this.emit('end') })
		.pipe(source(config.enter))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		// .pipe(plumber({errorHandler: notify.onError('\n\033[31m Error: <%= error.message %> \033[0m')}))			
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/js/bundles'))
}


gulp.task('build', () => {
	return b.bundle()
		.on('error', function(err) { console.log('\033[31m' + err.message + '\033[0m'); this.emit('end') })
		.pipe(source(config.enter))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(plumber({errorHandler: notify.onError('\n\033[31m Error: <%= error.message %> \033[0m')}))			
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/js/bundles'))
})