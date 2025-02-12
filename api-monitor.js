(function () {
    console.log("API Performance Monitoring Script Loaded...");

    // Intercept Fetch API calls
    const originalFetch = window.fetch;

    window.fetch = async function (...args) {
        const startTime = performance.now();
        const response = await originalFetch(...args);
        const endTime = performance.now();

        console.log(`API: ${args[0]} | Time Taken: ${(endTime - startTime).toFixed(2)}ms`);

        return response;
    };

    // Intercept XMLHttpRequest (XHR) calls
    const originalXHR = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        const startTime = performance.now();

        this.addEventListener("loadend", function () {
            const endTime = performance.now();
            console.log(`API: ${url} | Time Taken: ${(endTime - startTime).toFixed(2)}ms`);
        });

        return originalXHR.apply(this, arguments);
    };
})();
