

interface fn {
    (param: string): any;
}

interface includeCall {
    func: fn;
    scriptPath: string;
}

class Include
{
    private loadedIndex: number = -1;
    private onLoadHandler(ev: Event) {
        //var scr: HTMLScriptElement = <HTMLScriptElement>ev.srcElement;
        //var index: number = this.queue.indexOf(scr);
        //this.queue.splice(index, 1);
        //if (this.queue.length == 0)
        //    this.doneCallback();
        if (this.loadedIndex == (this.fnqueue.length - 1))
            this.doneCallback();
        else
            this.loadNextScript();
    }
    private dataBoot: string = null;
    private doneCallback: () => void;
    private fnqueue: includeCall[] = [];
    //private queue: HTMLScriptElement[] = [];
    include(jsScriptPath: string): Include {
        if (typeof document === undefined)
        {
            throw "include can only be used for scripts in web pages";
        }
        this.fnqueue.push({
            func: (path: string) => { this.addScriptElement(path); }, scriptPath: jsScriptPath
        });
        if (this.loadedIndex == -1)
            this.loadNextScript(); //Start sequencial script loading
        return this;
    }
    private loadNextScript(): void {
        this.loadedIndex++;
        var call: includeCall = this.fnqueue[this.loadedIndex];
        call.func(call.scriptPath);
    }

    private addScriptElement(jsScriptPath: string):void
    {
        var scr: HTMLScriptElement = document.createElement("script");
        scr.type = "text/javascript";
        scr.async = false;
        scr.src = jsScriptPath;
        scr.onload = (ev: Event) => { this.onLoadHandler(ev); };
        scr.onerror = (ev: Event) => {
            var scr: HTMLScriptElement = <HTMLScriptElement>ev.srcElement;
            console.error(scr.src + " failed to load");
        };
        document.head.appendChild(scr);
    }
    done(p: () => void) {
        this.doneCallback = p;
    };
    boot(): any {
        //now when we are loaded, load anyone using us defined in data-boot.
        var scripts: NodeListOf<HTMLScriptElement> = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var script: HTMLScriptElement = scripts[i];
            this.dataBoot = script.getAttribute("data-boot");
            if (typeof this.dataBoot != "undefined" && this.dataBoot != null && this.dataBoot.length > 3) {
                this.fnqueue.push({
                    func: (path: string) => { ;; }, scriptPath: ""
                }); //Need to push this onto queue
                this.loadedIndex++; //Move one so include does not trigger loading, but rather the onload call back for the boot script
                this.addScriptElement(this.dataBoot);
                break;
            }
        }
    }
}

var TSIncludeJS = new Include();
TSIncludeJS.boot();
