let targetPage = "*://*/*";

function rewriteUserAgentHeader(e) {



	   let obj = {};
        try {
            obj = JSON.parse(localStorage.getItem('info'));
            if (!obj) obj = {};
        } catch (e) {
            obj = {};
        }

        let enable = false;
		if(obj.host && obj.token && obj.enable){
			for (let header of e.requestHeaders) {
				if (header.name.toLowerCase() == "host") {
					let arr = obj.host.split('\n');
					arr.some(host => {
						if(header.value == host){
							enable = true;
							return true;
						}
					});
				}
			}
		}
		if(enable){
			e.requestHeaders.push({
				name: 'tokenStr',
				value: obj.token
			});
		}


  return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  {urls: [targetPage]},
  ["blocking", "requestHeaders"]
);