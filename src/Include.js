//See sample sample/UnitTests.html for usage

var Include = (function () {
    function Include() {
        this.queue = [];
    }
    Include.prototype.onLoadHandler = function (ev) {
        var scr = ev.srcElement;
        var index = this.queue.indexOf(scr);
        this.queue.splice(index, 1);
        if (this.queue.length == 0)
            this.doneCallback();
    };
    Include.prototype.include = function (jsScriptPath) {
        var _this = this;
        if (typeof document === undefined) {
            throw "include can only be used for scripts in web pages";
        }
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.async = false;
        scr.src = jsScriptPath;
        scr.onload = function (ev) { _this.onLoadHandler(ev); };
        scr.onerror = function (ev) {
            var scr = ev.srcElement;
            console.error(scr.src + " failed to load");
        };
        this.queue.push(scr);
        document.head.appendChild(scr);
        return this;
    };
    Include.prototype.done = function (p) {
        this.doneCallback = p;
    };
    ;
    return Include;
})();
var TSIncludeJS = new Include();
//# sourceMappingURL=Include.js.map
