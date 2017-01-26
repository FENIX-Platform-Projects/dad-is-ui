define([
    "jquery",
    "loglevel",
    "highcharts",
    "./charts/reports/statereporting",
    "./charts/reports/breeddiversity",
    "./charts/reports/riskstatus",
    "./charts/reports/trends",
    "./charts/reports/geneticresources",
    "bootstrap",
], function ($, log, Highcharts, HCstatereporting, HCbreeddiversity, HCriskstatus, HCtrends, HCgeneticresources) {

    "use strict";

    var s = {
        DIV_STATEREPORTING: "chart_statereporting",
        DIV_BREEDDIVERSITY: "chart_breeddiversity",
        DIV_RISKSTATUS: "chart_riskstatus",
        DIV_TRENDS: "chart_trends",
        DIV_GENETICRESOURCES: "chart_geneticresources"
        },
        riskstatus,
        breeddiversity;

    function DemoReports() {
        console.clear();
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._initVariables();
        this._renderCharts();
    }

    DemoReports.prototype._initVariables = function () {
        if (!require.cache[require.resolveWeak("highcharts-grouped-categories")]) {
            require('highcharts-grouped-categories')(Highcharts);
        }
//        if (!require.cache[require.resolveWeak("highcharts-pie-plugin")]) {
            require('highcharts-pie-plugin')(Highcharts);
//        }

    };

    DemoReports.prototype._renderCharts = function () {

        Highcharts.chart(s.DIV_STATEREPORTING, HCstatereporting);
        breeddiversity = Highcharts.chart(s.DIV_BREEDDIVERSITY, HCbreeddiversity);
        riskstatus = Highcharts.chart(s.DIV_RISKSTATUS, HCriskstatus);
        // >NOTREADY> Highcharts.chart(s.DIV_TRENDS, HCtrends);
        Highcharts.chart(s.DIV_GENETICRESOURCES, HCgeneticresources);

        this._unifiedPie(breeddiversity);
        this._unifiedPie(riskstatus);

    };

    DemoReports.prototype._unifiedPie = function (currentChart) {
            console.log("currentChart", currentChart);
            $(currentChart.series[0].data).each(function(i, e) {
                e.legendItem.on('click', function(event) {
                    var legendItem=e.name;
                    event.stopPropagation();
                    $(currentChart.series).each(function(j,f){
                        $(this.data).each(function(k,z){
                            if(z.name==legendItem)
                                if(z.visible) {
                                    z.setVisible(false);
                                } else {
                                    z.setVisible(true);
                                }
                        });
                    });

                });
            });
    };


    // CSS

    DemoReports.prototype._importThirdPartyCss = function () {
        require("../css/sandboxed-bootstrap.css");
        require("../css/dadis.css");
    };

    return new DemoReports();

});