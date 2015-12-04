/// <reference path="qunit.d.ts" />
/// <reference path="jquery.d.ts" />

        QUnit.test("hello test", function (assert) {
            assert.ok(1 == 1, "Works!");
        });

        QUnit.test("jquery test", function (assert) {
            assert.ok((typeof $ === "function"), "Works!");
        });

