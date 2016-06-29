module.exports = function(grunt){

	// Configure task(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// setup uglify task
		uglify: {
			build: {
				files: {
					'public/js/scripts.min.js': ['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'assets/src/js/*.js']
				}
			},
			dev: {
				options: {
					beautify: true,
					mangle: false,
					compress: false,
					preserveComments: 'all'
				},
				files: {
					'public/js/scripts.min.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js', 'assets/src/js/*.js']
				}
			}
		},

		// setup watch task
		watch: {
			js: {
				files: ['bower_components/**/*.js', 'assets/src/js/*.js'],
				tasks: ['uglify:dev']
			},
			css: {
				files: ['assets/src/scss/**/*.scss', 'bower_components/bootstrap-sass/assets/stylesheets/**/*.scss'],
				tasks: ['sass:dev']
			}
		},

		// setup sass
		sass: {
			dev: {
				options: {
					outputStyle: 'compact'
				},
				files: {
					'public/css/bootstrap.min.css' : 'assets/src/scss/bootstrap.scss',
					'public/css/style.min.css' : 'assets/src/scss/style.scss'
				}
			},
			build: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'public/css/bootstrap.min.css' : 'assets/src/scss/bootstrap.scss',
                    'public/css/style.min.css' : 'assets/src/scss/style.scss'
				}
			},

            //for documentation sass codes
            sassdoc: {
                srcs: {
                    src: ['assets/src/scss/*.scss', 'assets/src/scss/partials/*.scss', 'bower_components/bootstrap-sass/assets/stylesheets/**/*.scss']
                }
            }
		}
	});

	// Load the plugins
    grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-sassdoc');

	// Register task(s)
	grunt.registerTask('default', ['uglify:dev','sass:dev','watch','sassdoc']);
	grunt.registerTask('build', ['uglify:build', 'sass:build']);
};