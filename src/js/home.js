define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/home/config",
    //"../html/home/template.hbs",
    "./charts/home/breedDiversity",
    "./charts/home/animalGeneticResources",
    "../nls/labels"
], function ($, log, _, C, PAGEC, pieBreedDiversity, stackedBarAnimalGeneticResources, labels) {

    "use strict";

    var s = {
            EL: "#home",
            ERRORS : "[data-role='errors']",

            charts : {
                BREED_DIVERSITY_CONTAINER_ID: "breedDiversity-pie",
                //Not Used
                BREED_DIVERSITY_LABELS_ID : "breedDiversityPie",
                ANIMAL_GENETIC_CONTAINER_ID: "animalGeneticResources-stackedBar",
                //Not Used
                ANIMAL_GENETIC_LABELS_ID : "animalGeneticResourcesStackedBar"
            }
        };

    function Home() {

        console.clear();

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        //this._attach();

        this._initVariables();

        this._renderCharts();

        //this._bindEventListeners();
    }

    Home.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }

        // if ($(s.EL).length === 0) {
        //     alert("Please specify a valid container [" + s.EL + "]");
        // }

    };

    Home.prototype._initVariables = function () {

        //this.$el = $(s.EL);

        this.lang = C.lang.toLowerCase();
        this.environment = C.environment;
        this.cache = C.cache;

    };

    Home.prototype._attach = function () {

        $(s.EL).html(template(labels[C.lang.toLowerCase()]));
    };

    Home.prototype._renderCharts = function () {

        this.breedDiversity = new pieBreedDiversity({
            elID: s.charts.BREED_DIVERSITY_CONTAINER_ID,
            labelsId : s.charts.BREED_DIVERSITY_LABELS_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "",
            selected_items: {"item" : ""},
            language: this.lang.toUpperCase()
        });

        this.animalGeneticResources = new stackedBarAnimalGeneticResources({
            elID: s.charts.ANIMAL_GENETIC_CONTAINER_ID,
            labelsId : s.charts.ANIMAL_GENETIC_LABELS_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "",
            selected_items: {"item" : ""},
            language: this.lang.toUpperCase()
        });
    };

    // Events

    Home.prototype._bindEventListeners = function () {
    };

    Home.prototype._showErrors = function() {

        this.$errors.show();
        this.$errors.html(labels[this.lang.toLowerCase()].validationErrors);

    };

    Home.prototype._hideErrors = function() {

        this.$errors.hide();

    };

    // CSS

    Home.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");

        //dropdown selector
        // require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        // //tree selector
        // require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // //range selector
        // require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        // require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        // //time selector
        // require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");


        // fenix-ui-filter
        // require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // fenix-ui-dropdown
        // require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        // require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        // // fenix-ui-catalog
        // require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //meta viewer requirements
        // require("jquery-treegrid-webpack/css/jquery.treegrid.css");

        //GIFT CSS
        require("../css/dadis.css");

    };

    return new Home();
});