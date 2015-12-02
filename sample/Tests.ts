/// <reference path="../src/include.ts" />


TSIncludeJS.include("https://code.jquery.com/jquery-2.1.4.js")
    .include("http://code.jquery.com/qunit/qunit-1.20.0.js")
    .done(() => {


        QUnit.test("hello test", function (assert) {
            assert.ok(1 == 1, "Passed!");
        });

        QUnit.test("jquery test", function (assert) {
            assert.ok((typeof $ === "JQueryStatic"), "Works!");
        });
    });
