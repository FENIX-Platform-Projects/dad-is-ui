define( function () {

    "use strict";

    return {
        chart: {
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
    }

});
