define([
    "jquery",
    "loglevel"
], function ($, log) {

    "use strict";

    function Data() {

        console.clear();

        log.setLevel("silent");

        this._importThirdPartyCss();

    }

    // CSS

    Data.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");

        //DAD-IS CSS
        require("../css/dadis.css");

    };

    return new Data();
});