define( function () {

    "use strict";

    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 680,
            height: 700,
            style: {
                fontFamily: 'inherit'
            }
        },
        colors: ['#800000', '#FF0000', '#FF6600', '#FFCC00', '#000000', '#008080', '#C0C0C0'],
        credits: false,
        title: {
            text: 'Proportions of the world\'s breeds by risk status category',
            align: 'center'
        },
        tooltip: {
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            style: {
                padding: 0
            },

            formatter: function () {
                return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
            symbolHeight: 10,
            symbolWidth: 10,
            symbolRadius: 10,
            y:-130,
            x:-75,
            itemMarginTop: 5,
            itemMarginBottom: 5
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    formatter: function () {
                        return '<div class="pie-label">' + this.y +'%<div>';
                    },
                    style: {
                        color: '#333',
                        textShadow: false,
                        fontWeight: "normal"
                    },
                    distance: -1
                }

            }
        },
        series: [{
            type: 'pie',
            name: 'All species',
            center: [150, 120],
            size: 180,
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
            center: [450,120],
            size: 180,
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
            center: [150,390],
            size: 180,
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
