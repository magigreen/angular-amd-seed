/*******************************************************************************
 *  Var  Definition
 *
 *  !!!must to add file 'config.json' from  'config.json.default' and custom update
 *******************************************************************************/
var gulp = require('gulp');
var argv = require('yargs').argv;
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var replace = require('gulp-replace');
var fs = require("fs");
var gulpsync = require('gulp-sync')(gulp);
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
//var gulpImagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var git = require('git-rev');
var intercept = require('gulp-intercept');
var watchPath = require('gulp-watch-path');
var gcallback = require('gulp-callback');
var changeCase = require('change-case');
var gmux = require('gulp-mux');
var debug = require('gulp-debug');
//var sourcemaps = require('gulp-sourcemaps');
/*******************************************************************************
 *
 *  Setting Definition
 *
 *******************************************************************************/
var isDebug = argv.debug; // true is not to minify js file, ex: gulp [taskname] --debug
//var isRedirect = argv.redirect; // true is redirect js file domain, map: redirectStaticUrl, ex: gulp [taskname] --redirect
var isBuildConfig = argv.buildConfig; // true is auto build file copy 'config.json.default' to 'config.json' , ex: gulp [taskname] --buildConfig

var config = {}; // from 'config.json'
var dynamicTask = {};

/*******************************************************************************
 *
 *  Develop Task Definition
 *
 *******************************************************************************/
gulp.task('default', gulpsync.sync([
    'buildConfig',
    'clean',
    'processBase',

    'replaceHtmlIndex',
    'replaceJsMain',
    'replaceDevApi',

    'runServer',
    'watchReload'
]));

/*******************************************************************************
 *
 *  Deploy Task Definition
 *
 *******************************************************************************/
gulp.task('deploy', gulpsync.sync([
    'buildConfig',
    'clean',
    'processBase',

    'replaceHtmlIndex',
    'replaceJsMain',
    'replaceDeployApi'
]));

/*******************************************************************************
 *
 *  Other Task Definition
 *
 *******************************************************************************/
gulp.task('buildConfig', buildConfig);
gulp.task('setConfig', setConfig);
gulp.task('clean', clean);
gulp.task('runServer', runServer);
gulp.task('watchReload', watchReload);
gulp.task('browserReload', browserReload);

/*******************************************************************************
 *
 *  Replace Task Definition
 *
 *******************************************************************************/
gulp.task('replaceDeployApi', replaceDeployApi);
gulp.task('replaceDevApi', replaceDevApi);
gulp.task('replaceJsMain', replaceJsMain);
gulp.task('replaceHtmlIndex', replaceHtmlIndex);

/*******************************************************************************
 *
 *  Process Task Definition
 *
 *******************************************************************************/
//process js
gulp.task('processJsPluginFile', processJsPluginFile);
gulp.task('processJsPluginMin', processJsPluginMin);
gulp.task('processJsPlugin', gulpsync.sync([
    'processJsPluginFile',
    'processJsPluginMin'
]));

gulp.task('processJsMain', processJsMain);
gulp.task('processJsApp', processJsApp);
gulp.task('processJs', gulpsync.sync([
    'processJsMain',
    'processJsApp'
]));

//process css
gulp.task('processCssPluginFile', processCssPluginFile);
gulp.task('processCssPluginMin', processCssPluginMin);
gulp.task('processCssPlugin', gulpsync.sync([
    'processCssPluginFile',
    'processCssPluginMin'
]));
gulp.task('processCssApp', processCssApp);

//process other
gulp.task('processI18n', processI18n);
gulp.task('processHtmlApp', processHtmlApp);
gulp.task('processHtmlIndex', processHtmlIndex);

gulp.task('processBase', gulpsync.sync([
    'processJs',
    'processJsPlugin',
    'processCssApp',
    'processCssPlugin',
    'processHtmlApp',
    'processHtmlIndex',
    'processI18n'
]));


/*******************************************************************************
 *
 *  Function Definition
 *
 *******************************************************************************/
function buildConfig() {
    return gulp.src([
            'config.json.default'
        ])
        .pipe(debug())
        .pipe(gulpif(isBuildConfig, rename({
            basename: "config",
            extname: ".json"
        })))
        .pipe(gulp.dest('./'))
        .pipe(gcallback(function() {
            setConfig();
        }));
}

function setConfig() {
    config = JSON.parse(fs.readFileSync('config.json'));
}

function clean() {
    return gulp.src(config.deploy.folderPath, {
            read: false
        })
        .pipe(debug())
        .pipe(rimraf({
            force: true
        }));
}

function runServer() {
    return browserSync({
        server: {
            baseDir: config.deploy.folderPath
        },
        //https: true,
        open: true,
        browser: ['google chrome'],
        files: config.deploy.folderPath + '**/*',
        watchOptions: {
            debounceDelay: 2000
        }
    });
}

function browserReload() {
    return browserSync.reload();
}

function watchReload() {
    //watch js main
    gulp.watch(config.dev.folderPath+'app/main.js', gulpsync.sync(['processJsMain', 'replaceJsMain', 'browserReload']));

    //watch js app
    gulp.watch([
        config.dev.folderPath+'app/**/*.js',
        '!'+config.dev.folderPath+'app/plugin/**/*',
        '!'+config.dev.folderPath+'app/main.js'
    ], function(event) {
        var paths = watchPath(event, config.dev.folderPath+'app/', config.deploy.folderPath + 'app/');
        var taskName = (function() {
            //console.log(paths);
            var taskNameAry = (paths.srcDir.split('/').length > 1) ? paths.srcDir.split('/') : paths.srcDir.split('\\');
            var taskName = '';
            for (var i = 0; i < taskNameAry.length; i++) {
                if (i == 0) {
                    continue;
                }
                if(i==1){
                    taskName += taskNameAry[i];
                }else{
                    taskName += changeCase.upperCaseFirst(taskNameAry[i]);
                }
                
            }
            return taskName;
        })();
        var taskInfo = (function() {
            var taskList = config.processJsApp.processList;
            var taskInfo = {};
            for (var i = 0; i < taskList.length; i++) {
                if (taskList[i].taskName === taskName) {
                    taskInfo = taskList[i];
                    break;
                }
            }
            return taskInfo;
        })();
        return gulp.src(paths.srcPath)
            .pipe(debug())
            .pipe(gcallback(function() {
                dynamicTask[taskName](taskInfo);
            }))
            .pipe(gcallback(function() {
                replaceDevApi();
            }))
            .pipe(gcallback(function() {
                browserReload();
            }));
    });

    //watch js plugin
    gulp.watch([config.dev.folderPath+'app/plugin/js/**/*.js'], gulpsync.sync(['processJsPluginMin', 'browserReload']));
    gulp.watch([
        config.dev.folderPath+'app/plugin/js/**/*',
        '!'+config.dev.folderPath+'app/plugin/js/**/*.js'
    ], function(event) {
        var paths = watchPath(event, config.dev.folderPath+'app/plugin/js/', config.deploy.folderPath + 'app/plugin/js/');
        return gulp.src(paths.srcPath)
            .pipe(debug())
            .pipe(gulp.dest(paths.distDir))
            .pipe(gcallback(function() {
                browserReload();
            }));
    });

    //watch css
    gulp.watch(config.dev.folderPath+'app/**/*.css', gulpsync.sync(['processCssApp', 'browserReload']));
    gulp.watch(config.dev.folderPath+'app/plugin/css/**/*.css', gulpsync.sync(['processCssPluginMin', 'browserReload']));

    //watch html
    gulp.watch(config.dev.folderPath+'app/**/*.html', gulpsync.sync(['processHtmlApp', 'browserReload']));
    gulp.watch(config.dev.folderPath+'index.html', gulpsync.sync(['processHtmlIndex', 'replaceHtmlIndex', 'browserReload']));

    //watch I18n
    gulp.watch(config.dev.folderPath+config.i18n.folderPath+'**/*.json', gulpsync.sync(['processI18n', 'browserReload']));
}

function replaceDevApi() {
    if (!config.dev.apiUrl) {
        return false;
    }
    return gulp.src([
            config.deploy.folderPath + 'app/app.js',
            config.deploy.folderPath + 'app/app.min.js'
        ])
        .pipe(debug())
        .pipe(replace(/API_ROOT_URL:[^,]*/, 'API_ROOT_URL: "' + config.dev.apiUrl + '"'))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/'));
}

function replaceDeployApi() {
    if (!config.deploy.apiUrl) {
        return false;
    }
    return gulp.src([
            config.deploy.folderPath + 'app/app.js',
            config.deploy.folderPath + 'app/app.min.js'
        ])
        .pipe(debug())
        .pipe(replace(/API_ROOT_URL:[^,]*/, 'API_ROOT_URL: "' + config.deploy.apiUrl + '"'))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/'));
}

function replaceHtmlIndex() {
    return git.short(function(hash) {
        return gulp.src([
                config.deploy.folderPath + 'index.html'
            ])
            .pipe(debug())
            .pipe(replace('require.min.js', 'require.min.js?ver=' + hash))
            .pipe(replace('main.min.js', 'main.min.js?ver=' + hash))
            .pipe(gulp.dest(config.deploy.folderPath));
    });
}

function replaceJsMain() {
    return git.short(function(hash) {
        return gulp.src([
                config.deploy.folderPath + 'app/main.min.js'
            ])
            .pipe(debug())
            //.pipe(replace(/<apiUrl>/, config.deploy.apiUrl))
            .pipe(replace(/'urlArgs':[^,]*/, "'urlArgs':" + '"ver=' + hash + '"'))
            // .pipe(gulpif(isRedirect, intercept(function(file) {
            //     var fileString = file.contents.toString();
            //     var mainJson = (function() {
            //         var tmpString = /'paths':[^}]*/.exec(fileString)[0] + '}';
            //         return tmpString.split("'paths':")[1].replace(/\'/g, '"');
            //     })();
            //     var mainObject = (function() {
            //         var tmpObject = JSON.parse(mainJson);
            //         var maxCount = config.redirectStaticUrl.length;
            //         var i = 0;
            //         for (var key in tmpObject) {
            //             // if (/^kai/.test(key)) {
            //             //     continue;
            //             // }
            //             if (/<css>$/.test(key)) {
            //                 continue;
            //             }
            //             if (/<http>$/.test(key)) {
            //                 continue;
            //             }
            //             tmpObject[key] = config.redirectStaticUrl[i] + tmpObject[key];
            //             i = (i == maxCount - 1) ? 0 : i + 1;
            //         }
            //         return tmpObject;
            //     })();
            //     var replaceJson = JSON.stringify(mainObject);
            //     file.contents = new Buffer(fileString.replace(/'paths':[^}]*/, "'paths':" + replaceJson.split("}")[0]));
            //     return file;
            // })))
            .pipe(gulp.dest(config.deploy.folderPath + 'app/'));
    });
}

function processI18n() {
    //!!!!!!!!!!!!!!!!!!!!!!need check
    // var sourceMain = JSON.parse(fs.readFileSync(config.dev.folderPath+config.i18n.mainPath));
    // var sourceFinal = {};
    // for (var i = 0; i < config.i18n.extendPath.length; i++) {
    //     var sourceExtend = JSON.parse(fs.readFileSync(config.dev.folderPath+config.i18n.extendPath[i]));
    //     for (var keyA in sourceMain) {
    //         var isBuild = true;
    //         for (var keyB in sourceExtend) {
    //             if (keyA == keyB) {
    //                 sourceFinal[keyA] = sourceExtend[keyA];
    //                 isBuild = false;
    //                 break;
    //             }
    //         }
    //         if (isBuild) {
    //             sourceFinal[keyA] = sourceMain[keyA];
    //         }
    //     }
    //     fs.unlink(config.dev.folderPath+config.i18n.extendPath[i],function(){
    //         fs.appendFile(config.dev.folderPath+config.i18n.extendPath[i], JSON.stringify(sourceFinal, null, "\t"));   
    //     });
          
    // }
    return gulp.src(config.dev.folderPath+'static/i18n/*.*')
        .pipe(debug())
        .pipe(gulp.dest(config.deploy.folderPath + 'static/i18n/'));
}

function processCssPluginFile() {
    return gulp.src([
            config.dev.folderPath+'app/plugin/css/**/*.*',
        ])
        .pipe(debug())
        .pipe(gulp.dest(config.deploy.folderPath + 'app/plugin/css/'));
};

function processCssPluginMin() {
    return gulp.src([
            config.dev.folderPath+'app/plugin/css/**/*.css',
            '!'+config.dev.folderPath+'app/plugin/css/**/*.min.css'
        ])
        .pipe(debug())
        .pipe(gulp.dest(config.deploy.folderPath + 'app/plugin/css/'))
        //minify
        .pipe(cleanCSS({ keepSpecialComments: 0 }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/plugin/css/'));
};

function processCssApp() {
    return gulp.src(config.dev.folderPath+'app/**/*.css')
        .pipe(debug())
        //minify
        .pipe(gulpif(!isDebug, cleanCSS({ keepSpecialComments: 0 })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/'));
};

function processHtmlApp() {
    return gulp.src(config.dev.folderPath+'app/**/*.html')
        .pipe(debug())
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true }))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/'));
};

function processHtmlIndex() {
    return gulp.src(config.dev.folderPath+'index.html')
        .pipe(debug())
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true }))
        .pipe(gulp.dest(config.deploy.folderPath));
};

function processJsPluginFile() {
    return gulp.src([
            config.dev.folderPath+'app/plugin/js/**/*.*'
        ])
        .pipe(debug())
        .pipe(gulp.dest(config.deploy.folderPath + 'app/plugin/js/'));
};

function processJsPluginMin() {
    return gulp.src([
            config.dev.folderPath+'app/plugin/js/**/*.js',
            '!'+config.dev.folderPath+'app/plugin/js/**/*.min.js',
            '!'+config.dev.folderPath+'app/plugin/js/**/*.map',

            //ignore plug list
            '!'+config.dev.folderPath+'app/plugin/js/amcharts/**/*.*',
            '!'+config.dev.folderPath+'app/plugin/js/datatables/**/*.*',
        ])
        .pipe(debug())
        .pipe(gulp.dest(config.deploy.folderPath + 'app/plugin/js'))
        //minify
        .pipe(ngAnnotate())
        .pipe(gulpif(!isDebug, uglify({ mangle: false })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/plugin/js/'));
};


function processJsMain() {
    return gulp.src([
            config.dev.folderPath+'app/main.js'
        ])
        .pipe(debug())
        .pipe(concat('main.js'))
        //.pipe(gulp.dest(config.deploy.folderPath + 'app/'))
        //minify
        .pipe(uglify({
            mangle: false,
            output: {
                quote_style: 1,
                quote_keys: true
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.deploy.folderPath + 'app/'));
};


function processJsApp() {
    var taskList = config.processJsApp.processList;
    for (var i = 0; i < taskList.length; i++) {
        var taskName = taskList[i].taskName;
        dynamicTask[taskName] = function(taskInfo) {
            var srcPath = (taskInfo) ? taskInfo.srcPath : taskList[i].srcPath;
            var fileName = (taskInfo) ? taskInfo.fileName : taskList[i].fileName;
            var fileList = (function() {
                var defaultFileList = (taskInfo) ? taskInfo.fileList : taskList[i].fileList;
                var finalFileList = [];

                defaultFileList = (defaultFileList.length) ? defaultFileList : config.processJsApp.defaultFileList;
                for (var j = 0; j < defaultFileList.length; j++) {
                    finalFileList.push(config.dev.folderPath+srcPath + defaultFileList[j]);
                }
                return finalFileList;
            })();
            
            return gulp.src(fileList)
                .pipe(debug())
                .pipe(concat(fileName))
                //pipe(gulp.dest(config.deploy.folderPath+srcPath))

                .pipe(gulpif(!isDebug, ngAnnotate()))
                //.pipe(gulpif(!isDebug, sourcemaps.init()))
                .pipe(gulpif(!isDebug, uglify({ mangle: false })))
                .pipe(rename({ suffix: '.min' }))
                //.pipe(gulpif(!isDebug, sourcemaps.write('./')))
                .pipe(gulp.dest(config.deploy.folderPath+srcPath));
        };

        gmux.createAndRunTasks(gulp, dynamicTask[taskName], taskName, '', '', '', function() {});
    }
}
