export default ({req, redirect, $appConfig}) => {
    if (!process.server || process.static) {
        return Promise.resolve();
    }

    const staticUrls = [
        '/favicon.ico',
    ];

    if (staticUrls.indexOf(req.url) !== -1) {
        return redirect(`${$appConfig.PUBLIC_PATH}static${req.url}`);
    }
};
