module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			browser: {
				options:{
					banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n/*!(c)2013 Calvin Metcalf @license MIT https://github.com/calvinmetcalf/communist */\n/*!Includes Promiscuous (c)2013 Ruben Verborgh @license MIT https://github.com/RubenVerborgh/promiscuous*/\n/*!Includes Material from setImmediate Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola @license MIT https://github.com/NobleJS/setImmediate */\n',
					mangle: {
						except: ['Communist']
					}
				},
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		concat: {
		 
			browser: { 
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n/*!©2013 Calvin Metcalf @license MIT https://github.com/calvinmetcalf/communist */\n',
					seperator:";\n",
					footer : '})(this);}'
				},
				files: {'dist/<%= pkg.name %>.js':['src/IE.js','src/setImmediate.js','src/promiscuous.js','src/all.js','src/utils.js','src/worker.single.js','src/worker.general.js','src/worker.multiuse.js','src/fakeWorkers.js','src/worker.object.js','src/queue.js','src/worker.reducer.js','src/mapreduce.incremental.js','src/mapreduce.nonincremental.js','src/wrapup.js']}
			}
		},mocha_phantomjs: {
		all: {
			options: {
				urls: [
						"http://127.0.0.1:8080/test/index.html",
					"http://127.0.0.1:8080/test/index.min.html"
				]
			}
		}
	},
		connect: {
			server: {
				options: {
					port: 8080,
					base: '.'
				}
			}
		},
	jshint: {
		options:{
			multistr:true,
			expr:true,
			trailing:true,
			eqeqeq:true,
			curly:true
		},
		beforeconcat: ['src/*.js'],
		afterconcat: ['dist/communist.js']
	},
	"saucelabs-mocha":{
		options:{
			username:"calvinmetcalf",
			key: "f288b74b-589a-4fb4-9e65-d8b6ddd09d0e",
			concurrency:3,
			build: process.env.TRAVIS_JOB_ID
		},
		big:{
			options:{
				browsers: [
					{
						browserName: 'firefox',
						platform: 'linux',
						version: '21'
					},{
						browserName: "chrome",
						platform: "OS X 10.8"
					},{
						browserName: "safari",
						platform: "OS X 10.8",
						version:'6'
					},{
						browserName: "safari",
						platform: "OS X 10.6",
						version:'5'
					},{
						browserName: "iphone",
						platform: "OS X 10.8",
						version:'6'
					}, {
						browserName: 'internet explorer',
						platform: 'WIN8',
						version: '10'
					}, {
						browserName: 'opera',
						platform: 'linux',
						version: '12'
					},{
						browserName: 'safari',
						platform: 'win7',
						version: '5'
					},{
						browserName: 'chrome',
						platform: 'XP'
					}
				],
				urls:[
					"http://127.0.0.1:8080/test/index.html",
					"http://127.0.0.1:8080/test/index.min.html"
				]
			}
		},
		shim:{
			options:{
				browsers: [
					{
						browserName: 'internet explorer',
						platform: 'WIN8',
						version: '10'
					},{
						browserName: 'opera',
						platform: 'linux',
						version: '12'
					},{
						browserName: 'opera',
						platform: 'win7',
						version: '12'
					},{
						browserName: 'safari',
						platform: 'win7',
						version: '5'
					}
				],
			urls:[
					"http://127.0.0.1:8080/test/index.shim.html"
				]
			}
		},
		legacy:{
			options:{
				browsers: [
					{
						browserName: 'internet explorer',
						platform: 'WIN7',
						version: '9'
					}
				],
			urls:[
					"http://127.0.0.1:8080/test/index.leg.html"
				]
			}
		}
	},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha-phantomjs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-saucelabs');
	
	grunt.registerTask('sauce',['server','saucelabs-mocha:legacy','saucelabs-mocha:shim','saucelabs-mocha:big']);
	grunt.registerTask('server',['connect']);
	grunt.registerTask('browser',['concat:browser','uglify:browser']);
	grunt.registerTask('lint',['jshint:afterconcat']);
	grunt.registerTask('test', ['connect', 'mocha_phantomjs']);
	grunt.registerTask('default', ['browser','lint','sauce']);
	grunt.registerTask('c9', ['browser','lint','test']);

};
