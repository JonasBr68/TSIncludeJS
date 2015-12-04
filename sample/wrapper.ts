/// <reference path="../src/include.ts" />


TSIncludeJS.include("https://code.jquery.com/jquery-2.1.4.js")
    .include("http://code.jquery.com/qunit/qunit-1.20.0.js")
    .run("only-tests.js");
