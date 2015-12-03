

class Include
    {
    private onLoadHandler(ev: Event) {
        var scr: HTMLScriptElement = <HTMLScriptElement>ev.srcElement;
        var index: number = this.queue.indexOf(scr);
        this.queue.splice(index, 1);
        if (this.queue.length == 0)
            this.doneCallback();
    }
    private doneCallback: () => void;
    private queue: HTMLScriptElement[] = [];
    include(jsScriptPath: string): Include {
        if (typeof document === undefined)
        {
            throw "include can only be used for scripts in web pages";
        }
        var scr: HTMLScriptElement = document.createElement("script");
        scr.type = "text/javascript";
        scr.async = false;
        scr.src = jsScriptPath;
        scr.onload = (ev: Event) => { this.onLoadHandler(ev); };
        scr.onerror = (ev: Event) => {
            var scr: HTMLScriptElement = <HTMLScriptElement>ev.srcElement;
            console.error(scr.src + " failed to load");
        };
        this.queue.push(scr);
        document.head.appendChild(scr);
        return this;
    }
    done(p: () => void ){
        this.doneCallback = p;
    }
}

var TSIncludeJS = new Include();
