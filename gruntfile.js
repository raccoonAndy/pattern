module.exports = function(grunt){
	// Configure task(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

	jade: {
            html: {
                files: {
                    'public/template/': ['assets/template/*.jade']
                },
                options: {
                    pretty: true,
                    client: false
                }
            }
        },
        
        postcss: {
            options: {
                processors: [
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
        
        // svg-sprite configuration
        svg_sprite: {
            all: {
                src: 'assets/src/sprites/*.svg',
                dest: 'public/img/svg',
                options: {
                    "dest": ".",
                    "shape": {
                        "spacing": {
                            "padding": 20
                        }
                    },
                    "mode": {
                        "css": {
                            "dest": "assets/src/scss",
                            "common": "icon",
                            "prefix": ".icon-%s",
                            "dimensions": "-size",
                            "sprite": "../../../assets/src/img/svg/sprites.svg",
                            "render": {
                                "scss": true
                            }
                        }
                    }
                }
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
            jade: {
                files: ['assets/template/**/*.jade'],
                tasks: ['jade']
            },
            css: {
                files: ['assets/src/scss/style.scss'],
                tasks: ['postcss']
            },
            sass: {
                files: ['assets/src/scss/**/*.scss'],
                tasks: ['sass:dev']
            },
            sprites: {
                files: ['assets/src/sprites/*.png'],
                tasks: ['sprite']
            },
            svg_sprites: {
                files: ['assets/src/sprites/*.svg'],
                tasks: ['svg_sprite']
            },
            img: {
                files: ['assets/src/img/**/*.png', 'assets/src/img/**/*.jpg', 'assets/src/img/**/*.gif', 'assets/src/img/**/*.svg'],
                tasks: ['imagemin']
            }
        }
	});

	// Load the plugins
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Register task(s)
    grunt.registerTask('default', ['watch','jade','sass:dev','postcss','sprite','svg_sprite','imagemin']);
    grunt.registerTask('build', ['jade', 'sass:build']);
};
