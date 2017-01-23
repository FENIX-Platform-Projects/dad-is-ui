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
        HEIGHT: 200,
        WIDTH: 300,
        process: []
    };

    function PercentageChart(params) {

        this._init(params);

        // Load Exporting Module after Highcharts loaded
        if (!require.cache[require.resolveWeak("highcharts-no-data-to-display")]) {
            require('highcharts-no-data-to-display')(Highcharts);
        }

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

    PercentageChart.prototype._init = function (opts) {

        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.selected_item_label = opts.selected_item_label;
        this.process = s.process;

        this.elID = opts.elID;

        this.language = opts.language;
        this.labelsId = opts.labelsId;

        //pub/sub
        this.channels = {};
    };

    PercentageChart.prototype._updateProcessConfig = function (process) {

        process[0].sid[0].uid = this.uid;

        process[0].parameters = this.selected_items;

        return process;
    };

    PercentageChart.prototype._getProcessedResourceForChart = function (processConfig) {
        var process = this._updateProcessConfig(processConfig);

        return this.bridge.getProcessedResource({body: process, params: {language: this.language}});
    };

    PercentageChart.prototype._onSuccess = function (resource) {

        //var data = this._processSeries(resource);
        //this._setHTMLvariables(data);
        //var series = this._dataToChartSeries(data);
        // var chartConfig = this._getChartConfig(series);
        var chartConfig = this._getChartConfig();
        return this._renderChart(chartConfig);
    };

    PercentageChart.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)
    };

    PercentageChart.prototype._getChartConfig = function (series) {

        var self = this;
        var chartConfig = {
            chart: {
                type: 'bar',
                events: {
                    load: function (event) {
                        self._trigger("ready");
                    }
                }
            },
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
            xAxis: {
                categories: [labels[self.language.toLowerCase()]['category1'], labels[self.language.toLowerCase()]['category2'], labels[self.language.toLowerCase()]['category3'], labels[self.language.toLowerCase()]['category4'], labels[self.language.toLowerCase()]['category5'], labels[self.language.toLowerCase()]['category6'], labels[self.language.toLowerCase()]['category7'], labels[self.language.toLowerCase()]['category8']],
            },
            yAxis: {
                min: 0,
                max : 100,
                title: {
                    style: {
                        display: 'none'
                    }
                }
            },
            //remove credits
            credits: {
                enabled: false
            },

            //hide legend
            legend: {
                enabled: false
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.y + '%</b>';
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            //series: series
            series: [
                {
                    name: labels[self.language.toLowerCase()]['unknown'],
                    data: [88, 80, 40, 94, 99, 81, 96, 63],
                    color :"#C1CDCD"
                }, {
                name: labels[self.language.toLowerCase()]['atRisk'],
                data: [3, 2, 40, 2, 0, 14, 2, 20],
                color :"#CD3333"
                }, {
                    name: labels[self.language.toLowerCase()]['notAtRisk'],
                    data: [9, 18, 20, 4, 1, 5, 2, 17],
                    color :"#6495ED"
                }]
        };

        return chartConfig;
    };


    PercentageChart.prototype._getChartConfig2 = function () {

        var self = this;
        var chartConfig = {
            chart: {
                type: 'column',
                margin: [10, 10, 10, 10],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },

            //hide xAxis
            xAxis: {
                categories: ['1'],
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                gridLineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },

            //hide yAxis
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                min: 0,
                max: 100,
                lineWidth: 0,
                lineColor: 'transparent',

                title: {
                    enabled: false
                },

                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
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

            //remove credits
            credits: {
                enabled: false
            },

            //hide legend
            legend: {
                enabled: false
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.y + '</b>';
                }
            },

            series: [{
                data: [10],
                pointWidth: 80
            }]
        };

        return chartConfig;
    };

    PercentageChart.prototype._renderChart = function (chartConfig) {
        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    PercentageChart.prototype._processSeries = function (resource) {

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
        }

        var umLabelIdx = _.findIndex(columns, function (col) {
            return col.id == um_column_id + '_' + self.language;
        });

        var htmlData = [];
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};

                var it = data[i];
                obj.valueFormat = Formatter.format(it[value_index]);
                obj.value = it[value_index];
                obj.unit = it[umLabelIdx];

                htmlData.push(obj);
            }
        }

        return htmlData;
    };

    PercentageChart.prototype._dataToChartSeries = function (htmlData) {

        var atRisk = parseInt(htmlData[0].valueFormat, 10);
        var notAtRisk = 100 - atRisk;
        var atRiskValues = [];
        atRiskValues.push(atRisk);
        var notAtRiskValues = [];
        notAtRiskValues.push(notAtRisk);

        var series = [
            {
                name: 'Not at risk',
                color: '#333333',
                pointWidth: 200,
                data: notAtRiskValues
            }, {
                name: 'At risk',
                color: 'red',
                pointWidth: 200,
                data: atRiskValues
            }]

        return series;
    };

    PercentageChart.prototype._setHTMLvariables = function (dataToChart) {
        $('#' + this.labelsId + '-title').html(labels[this.language.toLowerCase()][this.labelsId + '_title']);
    }

    PercentageChart.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    PercentageChart.prototype.dispose = function (opts) {
        //this.chart.destroy();
    };

    PercentageChart.prototype._trigger = function (channel) {

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

    /**
     * pub/sub
     * @return {Object} component instance
     */
    PercentageChart.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return PercentageChart;
});