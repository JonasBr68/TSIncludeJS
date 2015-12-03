var Include = (function () {
    function Include() {
        this.loadedIndex = -1;
        this.dataBoot = null;
        this.fnqueue = [];
    }
    Include.prototype.onLoadHandler = function (ev) {
        //var scr: HTMLScriptElement = <HTMLScriptElement>ev.srcElement;
        //var index: number = this.queue.indexOf(scr);
        //this.queue.splice(index, 1);
        //if (this.queue.length == 0)
        //    this.doneCallback();
        if (this.loadedIndex == (this.fnqueue.length - 1))
            this.doneCallback();
        else
            this.loadNextScript();
    };
    //private queue: HTMLScriptElement[] = [];
    Include.prototype.include = function (jsScriptPath) {
        var _this = this;
        if (typeof document === undefined) {
            throw "include can only be used for scripts in web pages";
        }
        this.fnqueue.push({
            func: function (path) { _this.addScriptElement(path); }, scriptPath: jsScriptPath
        });
        if (this.loadedIndex == -1)
            this.loadNextScript(); //Start sequencial script loading
        return this;
    };
    Include.prototype.loadNextScript = function () {
        this.loadedIndex++;
        var call = this.fnqueue[this.loadedIndex];
        call.func(call.scriptPath);
    };
    Include.prototype.addScriptElement = function (jsScriptPath) {
        var _this = this;
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.async = false;
        scr.src = jsScriptPath;
        scr.onload = function (ev) { _this.onLoadHandler(ev); };
        scr.onerror = function (ev) {
            var scr = ev.srcElement;
            console.error(scr.src + " failed to load");
        };
        document.head.appendChild(scr);
    };
    Include.prototype.done = function (p) {
        this.doneCallback = p;
    };
    ;
    Include.prototype.boot = function () {
        //now when we are loaded, load anyone using us defined in data-boot.
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            this.dataBoot = script.getAttribute("data-boot");
            if (typeof this.dataBoot != "undefined" && this.dataBoot != null && this.dataBoot.length > 3) {
                this.fnqueue.push({
                    func: function (path) { ; ; }, scriptPath: ""
                }); //Need to push this onto queue
                this.loadedIndex++; //Move one so include does not trigger loading, but rather the onload call back for the boot script
                this.addScriptElement(this.dataBoot);
                break;
            }
        }
    };
    return Include;
})();
var TSIncludeJS = new Include();
TSIncludeJS.boot();
//# sourceMappingURL=Include.js.map