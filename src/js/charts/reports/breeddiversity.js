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
            colors: ['#088A68', '#0431B4', '#8A2908', '#CEF6CE', '#A9BCF5', '#FF8000'],
            title: {
                text: 'Number of local and transboundary breeds at regional level'
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y ;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                symbolHeight: 6,
                symbolWidth: 6,
                symbolRadius: 0,
                y: -10,
                x: -120,
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
                        format: '{y}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Africa',
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
                    ['International transboundary mammalian breeds',   205],
                    ['Regional transboundary mammalian breeds',       91],
                    ['Local mammalian breeds',       578],
                    ['International transboundary avian breeds',    67],
                    ['Regional transboundary avian breeds',     4],
                    ['Local avian breeds',   228]
                ]
            },{
                type: 'pie',
                name: 'Asia',
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
                    ['International transboundary mammalian breeds',   177],
                    ['Regional transboundary mammalian breeds',       69],
                    ['Local mammalian breeds',       1251],
                    ['International transboundary avian breeds',    80],
                    ['Regional transboundary avian breeds',     8],
                    ['Local avian breeds',   523]
                ]
            },{
                type: 'pie',
                name: 'Europe & the Caucasus',
                center: [150,350],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['International transboundary mammalian breeds',   285],
                    ['Regional transboundary mammalian breeds',       203],
                    ['Local mammalian breeds',       2121],
                    ['International transboundary avian breeds',    135],
                    ['Regional transboundary avian breeds',     68],
                    ['Local avian breeds',   1257]
                ]
            },{
                type: 'pie',
                name: 'Latin America & the Carribean',
                center: [450,350],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['International transboundary mammalian breeds',   216],
                    ['Regional transboundary mammalian breeds',       25],
                    ['Local mammalian breeds',       446],
                    ['International transboundary avian breeds',    103],
                    ['Regional transboundary avian breeds',     0],
                    ['Local avian breeds',   152]
                ]
            },{
                type: 'pie',
                name: 'Near & Middle East',
                center: [150,600],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['International transboundary mammalian breeds',   46],
                    ['Regional transboundary mammalian breeds',       5],
                    ['Local mammalian breeds',       185],
                    ['International transboundary avian breeds',    7],
                    ['Regional transboundary avian breeds',     0],
                    ['Local avian breeds',   51]
                ]
            },{
                type: 'pie',
                name: 'North America',
                center: [450,600],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['International transboundary mammalian breeds',   132],
                    ['Regional transboundary mammalian breeds',       18],
                    ['Local mammalian breeds',       98],
                    ['International transboundary avian breeds',    61],
                    ['Regional transboundary avian breeds',     0],
                    ['Local avian breeds',   42]
                ]
            },{
                type: 'pie',
                name: 'Southwest Pacific',
                center: [150,850],
                size: 150,
                title: {
                    align: 'center',
                    format: '<b>{name}</b>',
                    verticalAlign: 'top',
                    y: -40
                },
                showInLegend:false,
                data: [
                    ['International transboundary mammalian breeds',   165],
                    ['Regional transboundary mammalian breeds',       5],
                    ['Local mammalian breeds',       136],
                    ['International transboundary avian breeds',    69],
                    ['Regional transboundary avian breeds',     0],
                    ['Local avian breeds',   54]
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
