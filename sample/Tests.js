/// <reference path="../geo-tax.ts" />
/// <reference path="../include.ts" />
//declare var requirejs: any;
//requirejs.config({
//    baseUrl: "/scripts"
//    //deps: ["jquery-2.1.4", "geo-tax", "qunit-1.20.0"]
//});
//// Start the main app logic.
//requirejs(["jquery-2.1.4", "geo-tax", "qunit-1.20.0"],
TSIncludeJS.include("../scripts/jquery-2.1.4.js")
    .include("../scripts/js.cookie.js")
    .include("../scripts/geo-tax.js")
    .include("../scripts/qunit-1.20.0.js")
    .done(function () {
    function assertIPCountry(assert, ip, expected) {
        var done = assert.async();
        var taxMockup = new GeoTaxMockup();
        TaxGeoService.init("key", taxMockup);
        TaxGeoService.countryBehaviours.push(function (country) {
            assert.ok(Country.equals(country, expected), QUnit.jsDump.parse(country) + QUnit.jsDump.parse(expected));
            if (country.EU)
                assert.ok(country.EU ? country.VAT != null : country.VAT != null, "EU country has valid VAT %");
            done();
        });
        TaxGeoService.detectCountry(ip);
    }
    QUnit.test("hello test", function (assert) {
        assert.ok(1 == 1, "Passed!");
    });
    QUnit.test("GeoIP 127.0.0.1 IE", function (assert) {
        var ie = { Name: "Ireland", Code: "IE", IP: "127.0.0.1", VAT: 23.00, EU: true };
        assertIPCountry(assert, "127.0.0.1", ie);
    });
    QUnit.test("GeoIP 1.1.1.1 AU", function (assert) {
        var au = { Name: "Australia", Code: "AU", IP: "1.1.1.1", VAT: null, EU: false };
        assertIPCountry(assert, au.IP, au);
    });
});
//# sourceMappingURL=GeoTaxTests.js.map