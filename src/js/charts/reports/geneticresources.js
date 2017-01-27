define( function () {

    "use strict";

    return {
        chart: {
            type: 'column',
            width: 800,
            height: 900
        },
        colors: ['#C0C0C0', '#C6D9F1', '#17375E'],
        title: {
            text: 'Proposed indicator 2.5.1. of the Sustainable Development Goals on the numbers of national breed populations with material stored in a cryobank by region, based on 128 country reports'
        },
        xAxis: {
            categories: ['Africa', 'Asia', 'Europe and the Caucasus', 'Latin America & the Caribbean', 'Near and Middle East', 'North America', 'Southwest Pacific']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'gray'
                }
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical',
            floating: false,
            padding: 50,
            symbolHeight: 6,
            symbolWidth: 6,
            symbolRadius: 0,
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: 'white'
                }
            }
        },
        series: [{
            name: 'Number of unknow/unstored national breed populations',
            data: [5, 3, 4, 7, 2, 4, 6]
        }, {
            name: 'Number of national breed populations for which (unsufficient) material is stored',
            data: [2, 2, 3, 2, 1, 2, 6]
        }, {
            name: 'Number of national breed populations for which sufficient material is stored',
            data: [3, 4, 4, 2, 5, 1, 5]
        }],
        credits: false
    }
});