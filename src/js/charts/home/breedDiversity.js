define([
    "underscore",
    "jquery",
    "loglevel",
    "../../../nls/labels",
    "fenix-ui-bridge",
    "highcharts",
    "../valueFormatter"
], function (_, $, log, labels, Bridge, Highcharts, Formatter) {


    var s = {
        HEIGHT: 300,
        WIDTH: 300,
        process: []
    };

    function BreedDiversityPieChart(params) {

        // Load Exporting Module after Highcharts loaded
        if (!require.cache[require.resolveWeak("highcharts-no-data-to-display")]) {
            require('highcharts-no-data-to-display')(Highcharts);
        }

        this._init(params);

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });

        //TO CHANGE: now it's skipping the ajax call to get the resource
        this._onSuccess();

        // this._getProcessedResourceForChart(s.process).then(
        //     _.bind(this._onSuccess, this),
        //     _.bind(this._onError, this)
        // );
    }

    BreedDiversityPieChart.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.process = s.process;
        this.elID = opts.elID;

        this.language = opts.language;
        this.labelsId = opts.labelsId;
        //pub/sub
        this.channels = {};
    };


    BreedDiversityPieChart.prototype._updateProcessConfig = function (process, group_code) {
        process[0].sid[0].uid = this.uid;
        if (this.selected_items) {
            process[1].parameters = this.selected_items;
        }
        return process;
    }

    BreedDiversityPieChart.prototype._getProcessedResourceForChart = function (processConfig, group_code) {
        var process = this._updateProcessConfig(processConfig, group_code);

        return this.bridge.getProcessedResource({body: process, params: {language: this.language}});
    };

    BreedDiversityPieChart.prototype._onSuccess = function (resource) {
        //var series = this._processSeries(resource);
        var series = [];
        //this._setHTMLvariables();
        var chartConfig = this._getChartConfig(series);

        return this._renderChart(chartConfig);
    };

    BreedDiversityPieChart.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)

    };

    BreedDiversityPieChart.prototype._processSeries = function (resource) {

        var self = this;
        var metadata = resource.metadata;
        var data = resource.data;

        var columns = metadata.dsd.columns;
        var um_index = '', value_index = '', code_index = '', code_column_id, um_column_id;

        for (var i = 0; i < columns.length; i++) {
            if (columns[i].subject == 'um') {
                um_index = i;
                um_column_id = columns[i].id;
            }
            else if (columns[i].subject == 'value') {
                value_index = i;
            }
            else if (columns[i].dataType == 'code') {
                code_index = i;
                code_column_id = columns[i].id;
            }
        }

        var umLabelIdx = _.findIndex(columns, function (col) {
            return col.id == um_column_id + '_' + self.language;
        });

        var codeLabelIdx = _.findIndex(columns, function (col) {
            return col.id == code_column_id + '_' + self.language;
        });

        var dataToChart = [];
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};

                var it = data[i];
                obj.y = Formatter.format(it[value_index]);
                obj.unit = it[umLabelIdx];
                obj.name = it[codeLabelIdx];
                obj.code = it[code_index];

                if (obj.code == "FAT") {
                    obj.color = '#2e76b7';
                }
                else if (obj.code == "PROTEIN") {
                    obj.color = '#bf1818';
                }
                else if (obj.code == "CARBOH") {
                    obj.color = '#fcc00d';
                }

                dataToChart.push(obj);
            }
        }
        //order series

        var result = [];
        result.push(_.findWhere(dataToChart, {name: "Fat"}));
        result.push(_.findWhere(dataToChart, {name: "Carbohydrates"}));
        result.push(_.findWhere(dataToChart, {name: "Protein"}));

        return result;
    };

    BreedDiversityPieChart.prototype._getChartConfig = function (series) {
        var self = this;
        var chartConfig = {
            chart: {
                type: 'pie',
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                events: {
                    load: function (event) {
                        self._trigger("ready");
                    }
                }
            },

            //remove title and subtitle
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },

            plotOptions: {
                pie: {
                    borderColor: '#000000',
                    allowPointSelect: true,
                    center: ["50%", "50%"],
                    //set radius
                    size: '75%',
                    //labels inside the pie
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '<span class="pie-label">' + this.y +'<span>';
                        },
                        style: {
                            textShadow: false
                        },
                        distance: -30
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.key + ': <b>' + this.y + '</b>';
                }
            },

            //remove credits
            credits: {
                enabled: false
            },

            // series: [{
            //     name: 'Breeds',
            //     data: series
            // }]
            series: [{
                name: 'Breeds',
                data: [{
                    name: labels[self.language.toLowerCase()]['internationalMammalian'],
                    color: '#006062',
                    y: 400
                }, {
                    name: labels[self.language.toLowerCase()]['regionalMammalian'],
                    color: '#2020A0',
                    y: 416
                }, {
                    name: labels[self.language.toLowerCase()]['localMammalian'],
                    color: '#622100',
                    y: 4815
                }, {
                    name: labels[self.language.toLowerCase()]['internationalAvian'],
                    color: '#C1FFD5',
                    y: 161
                }, {
                        name: labels[self.language.toLowerCase()]['regionalAvian'],
                        color: '#82C0FF',
                        y: 80
                    }, {
                        name: labels[self.language.toLowerCase()]['localAvian'],
                        color: '#EC5300',
                        y: 2307
                    }
                ]
            }]
        };
        return chartConfig;

    };

    BreedDiversityPieChart.prototype._renderChart = function (chartConfig) {

        // Make monochrome colors and set them as default for all pies
        // Highcharts.getOptions().plotOptions.pie.colors = (function () {
        //     var colors = [],
        //         base = Highcharts.getOptions().colors[0],
        //         i;
        //
        //     for (i = 0; i < 10; i += 1) {
        //         // Start out with a darkened base color (negative brighten), and end
        //         // up with a much brighter color
        //         colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        //     }
        //     return colors;
        // }());
        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    BreedDiversityPieChart.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    BreedDiversityPieChart.prototype.dispose = function () {
        //this.chart.destroy();
    };

    BreedDiversityPieChart.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    BreedDiversityPieChart.prototype._setHTMLvariables = function () {
        $('#' + this.labelsId + '-title').html(labels[this.language.toLowerCase()][this.labelsId + '_title']);
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    BreedDiversityPieChart.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return BreedDiversityPieChart;
});