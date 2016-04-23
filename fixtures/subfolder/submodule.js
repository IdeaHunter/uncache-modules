var wasCalledBefore = false;

module.exports = function() {
    var called = wasCalledBefore;
    wasCalledBefore = true;
    return called;
}
