﻿/// <reference path="../src1/include.ts" />
TSIncludeJS.include("https://code.jquery.com/jquery-2.1.4.js").include("http://code.jquery.com/qunit/qunit-1.20.0.js").done(function () {
    QUnit.test("hello test", function (assert) {
        assert.ok(1 == 1, "Works!");
    });

    QUnit.test("jquery test", function (assert) {
        assert.ok((typeof $ === "JQueryStatic"), "Works!");
    });
});
