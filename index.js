'use strict';

var path = require('path');

module.exports = function(relativePathPrefix) {
    var pathPrefix = path.resolve(relativePathPrefix);
    var cache = require.cache;
    for (var modulePath in cache) {
        if (!cache.hasOwnProperty(modulePath))
            continue;

        if (modulePath.indexOf(pathPrefix) !== 0)
            continue;

        delete cache[modulePath];
    }
    var pathCache = module.constructor._pathCache;
    for (var cacheKey in pathCache) {
        if (!pathCache.hasOwnProperty(cacheKey))
            continue;

        if (cacheKey.indexOf(pathPrefix) < 0)
            continue;

        delete pathCache[cacheKey]
    }
}
