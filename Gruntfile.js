module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

    grunt.initConfig({

        // used by the changelog task
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                node: true
            },
            all: ['*.js','./modules/*.js']
        },

        shell: {
            publish: {
                command: 'npm publish'
            },
            pubinit: {
                // command: 'npm publish --access public'
                command: [
                    'npm publish --access public',
                    'git tag v0.1.0',
                    'git push origin --tags',
                  ].join('&&')
            },
        },

        // To test: grunt bump --dry-run

        bump: {
            options: {

                commit: true,
                createTag: true,
                push: true,
                pushTo: 'origin',

                updateConfigs: ['pkg'],
                commitFiles: ['package.json']
            }
        },


        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        // dashes will be converted to caps in actual name 
                        // i.e.: -test-zeta becomes TestZeta
                        // standalone: 'MitchAllen.-aframe-border-component'
                        // standalone: 'mitchallen.-aframe-border-component'
                    },
                    transform: [['babelify', {presets: ['es2015']}]],
                    plugin: [[ "browserify-derequire" ]]
                },
                files: {
                   // if the source file has an extension of es6 then
                   // we change the name of the source file accordingly.
                   // The result file's extension is always .js
                   "./dist/aframe-border-component.js": ["./browser.js"]
                   // For non-standalone, use ./browser.js instead.
                   // "./dist/aframe-border-component.js": ["./browser.js"]
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    './dist/aframe-border-component.min.js': ['./dist/aframe-border-component.js']
                }
            }
        },

        watch: {
             scripts: {
                files: ["./modules/*.js","./*.js"],
                tasks: ['jshint','browserify','uglify']
             }
        },

        jsdoc2md: {
              oneOutputFile: {
                src: 'modules/*.js',
                dest: 'DOC-API.md'
              }
        },

        upcoming: {
            default: {
                files: [
                    { src: 'package.json', dest: ['upcoming-info.json'] }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-upcoming');

    grunt.registerTask('default', ['upcoming:patch','build']);
    grunt.registerTask("build",   ['jshint','browserify','uglify']);
    grunt.registerTask('pubinit', ['build','shell:pubinit']);
    grunt.registerTask('publish', ['upcoming:patch','build','bump','shell:publish']);
};
