'use strict';

var uncacheModules = require('./index');

describe('uncacheModules(path)', function() {
    it('throw an error when path is empty', function() {
        expect(uncacheModules).toThrowError(TypeError);
    })
    it('not throw an error when path for modules not exists', function() {
        var unloadNotExistsFolder = function() {
            uncacheModules('path/not/exists');
        };

        expect(unloadNotExistsFolder).not.toThrow();
    })
    it('not throw an error when no modules loaded for path', function() {
        var unloadNoModulesLoaded = function() {
            uncacheModules('./fixtures');
        };

        expect(unloadNoModulesLoaded).not.toThrow();
    })
    it('not throw an error when unloading loaded modules', function() {
        var unload = function() {
            require('./fixtures/single')
            uncacheModules('./fixtures');
        };

        expect(unload).not.toThrow();
    })
    it('module would be unloaded', function() {
        var callCountBefore = require('./fixtures/single')();
        uncacheModules('./fixtures');
        var callCountAfter = require('./fixtures/single')();

        expect(callCountBefore).toBe(callCountAfter);
    })
    it('submodule on same level would be unloaded', function() {
        var callCountBefore = require('./fixtures/with-submodule-on-same-level')();
        uncacheModules('./fixtures');
        var callCountAfter = require('./fixtures/single')();

        expect(callCountBefore).toBe(callCountAfter);
    })
    it('submodule in subfolder would be unload', function() {
        var callCountBefore = require('./fixtures/with-submodule-in-subfolder')();
        uncacheModules('./fixtures');
        var callCountAfter = require('./fixtures/with-submodule-in-subfolder')();

        expect(callCountBefore).toBe(callCountAfter);
    })
    it('submodule in parent folder would not be unload', function() {
        var callCountBefore = require('./fixtures/parent/with-submodule-in-parent-folder')();
        uncacheModules('./fixtures/parent');
        var callCountAfter = require('./fixtures/submodule-in-parent')();

        expect(callCountBefore).not.toBe(callCountAfter);
    })
})
