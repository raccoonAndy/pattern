module.exports = function(grunt){
	// Configure task(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        postcss: {
            options: {
                processors: [
                    require('stylelint')({
                        "extends": "stylelint-config-standard",
                        "rules": {
                            "indentation": "tab",
                            "number-leading-zero": null,
                            "unit-whitelist": ["em", "rem", "s"]
                        }
                    }),
                    require('autoprefixer')({browsers: ['> 0.5%', 'last 2 version','ie 6-8']}),
                    require('cssnano'),
                    require('postcss-color-rgba-fallback')(),
                    require('postcss-opacity')(),
                    require('pixrem')({
                        options: {
                            rootvalue: '14px',
                            replace: true,
                            browsers: ['> 0.5%', 'last 2 version','ie 6-8']
                        },
                        dist: {
                            src: 'assets/src/scss/style.scss',
                            dest: 'public/css/style.min.css'
                        }
                    })
                ]
            },
            dist: {
                src: 'assets/src/scss/style.scss',
                dest: 'public/css/style.min.css'
            }
        },

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
			}
		},

        //setup sprite
        sprite: {
            all: {
                src: 'assets/src/sprites/*.png',
                dest: 'public/img/sprites/spritesheet.png',
                destCss: 'public/css/sprites.css',
                algorithm: 'binary-tree',
                padding: 10
            }
        },

        //setup imagemin
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'assets/src/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'public/img/'
                }]
            }
        },

        //setup csscomb
        csscomb: {
            dist: {
                options: {
                    config: 'config_csscomb.json'
                },
                files: {}
            }
        },

        // setup watch task
        watch: {
            js: {
                files: ['bower_components/**/*.js', 'assets/src/js/*.js'],
                tasks: ['uglify:dev']
            },
            sass: {
                files: ['assets/src/scss/**/*.scss', 'bower_components/**/*.scss'],
                tasks: ['sass:dev']
            },
            css: {
                files: ['assets/src/scss/style.scss'],
                tasks: ['postcss']
            },
            sprites: {
                files: ['assets/src/sprites/*.png'],
                tasks: ['sprite']
            },
            img: {
                files: ['assets/src/img/**/*.png', 'assets/src/img/**/*.jpg', 'assets/src/img/**/*.gif', 'assets/src/img/**/*.svg'],
                tasks: ['imagemin']
            }
        },

        //for documentation sass codes
        sassdoc: {
            srcs: {
                src: ['assets/src/scss/*.scss', 'assets/src/scss/partials/*.scss', 'bower_components/bootstrap-sass/assets/stylesheets/**/*.scss']
            }
        },

        //setup browserSync
        browserSync: {
            bsFiles: {
                src : ['assets/src/scss/*.scss','public/css/*.css', 'assets/template/*.html']
            },
            options: {
                server: {
                    watchTask: true,
                    baseDir: "./"
                }
            }
        }
	});

	// Load the plugins
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sassdoc');
    grunt.loadNpmTasks('grunt-browser-sync');

	// Register task(s)
	grunt.registerTask('default', ['watch','uglify:dev','sass:dev','postcss','sassdoc','sprite','imagemin','browserSync']);
	grunt.registerTask('build', ['uglify:build', 'sass:build']);
};