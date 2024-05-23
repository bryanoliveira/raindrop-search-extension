chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    console.log("received request", details);

    for (let i = 0; i < details.responseHeaders.length; i++) {
      if (details.responseHeaders[i].name.toLowerCase() === "x-frame-options") {
        details.responseHeaders.splice(i, 1); // Remove the X-Frame-Options header
        break;
      }
    }
    return { responseHeaders: details.responseHeaders };
  },
  {
    urls: ["https://app.raindrop.io/*"],
    types: ["sub_frame"],
  },
  ["blocking", "responseHeaders"]
);