import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoadscriptsService {
	constructor() {
	}

	public loadScript(url: string, scriptid: string) {
    console.log(url)
		const body = <HTMLDivElement>document.body;
		const script = document.createElement('script');
		script.innerHTML = '';
		script.src = url;
		script.id = scriptid;
		script.async = false;
		script.defer = true;
    console.log(script)
		body.appendChild(script);
	}

  revomeScriptById = (scriptid: string) => {
    console.log(scriptid)
    document.getElementById(scriptid).remove();
  }
}
