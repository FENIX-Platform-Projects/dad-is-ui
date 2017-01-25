$(function () {
    (function (Highcharts) {
        Highcharts.seriesTypes.pie.prototype.setTitle = function (titleOption) {
            var chart = this.chart,
                center = this.center || (this.yAxis && this.yAxis.center),
                labelBox,
                box,
                format;

            if (center && titleOption) {
                box = {
                    x: chart.plotLeft + center[0] - 0.5 * center[2],
                    y: chart.plotTop + center[1] - 0.5 * center[2],
                    width: center[2],
                    height: center[2]
                };

                format = titleOption.text || titleOption.format;
                format = Highcharts.format(format, this);

                if (this.title) {
                    this.title.attr({
                        text: format
                    });

                } else {
                    this.title = this.chart.renderer.label(format)
                        .css(titleOption.style)
                        .add()
                }
                labelBBox = this.title.getBBox();
                titleOption.width = labelBBox.width;
                titleOption.height = labelBBox.height;
                this.title.align(titleOption, null, box);
            }
        };

        Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'render', function (proceed) {
            proceed.call(this);
            this.setTitle(this.options.title);
        });

    } (Highcharts));

    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container', // here is the id of the div
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            colors: ['#800000', '#FF0000', '#FF6600', '#FFCC00', '#000000', '#008080', '#C0C0C0'],
            title: {
                text: 'Proportions of the world\'s breeds by risk status category'
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                symbolHeight: 6,
                symbolWidth: 6,
                symbolRadius: 0,
                y: -50,
                x: 50,
                itemMarginTop: 8,
                itemMarginBottom: 8
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    size: 100,
                    dataLabels: {
                        enabled: true,
                        connectorWidth: 0,
                        distance: 5,
                        format: '{y}%'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'All species',
                center: [150, 100],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:true,
                data: [
                    ['critical',   6],
                    ['critical-maintained',       1],
                    ['endangered',       7],
                    ['endangered-maintained',    3],
                    ['extinct',     7],
                    ['not at risk',   18],
                    ['unknown', 58]
                ]
            },{
                type: 'pie',
                name: 'Avian',
                center: [450,100],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['critical',   7],
                    ['critical-maintained',       1],
                    ['endangered',       7],
                    ['endangered-maintained',    4],
                    ['extinct',     3],
                    ['not at risk',   12],
                    ['unknown', 66]
                ]
            },{
                type: 'pie',
                name: 'Mammalian',
                center: [150,450],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['critical',   6],
                    ['critical-maintained',       1],
                    ['endangered',       6],
                    ['endangered-maintained',    3],
                    ['extinct',     9],
                    ['not at risk',   21],
                    ['unknown', 54]
                ]
            }]
        },function(chart) {

            $(chart.series[0].data).each(function(i, e) {
                e.legendItem.on('click', function(event) {
                    var legendItem=e.name;
                    event.stopPropagation();
                    $(chart.series).each(function(j,f){
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
        });
    });

});
