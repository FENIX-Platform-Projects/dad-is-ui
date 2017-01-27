define( function () {

    "use strict";

    return {
        chart: {
            type: 'bar',
            width: 680,
            height: 600,
            style: {
                fontFamily: 'inherit'
            }
        },
        colors: ['#BABABA', '#CCFFCC'],
        title: {
            text: 'Proportions of national breed populations for which population data have been reported'
        },
        xAxis: {
            labels: {
                groupedOptions: [{
                    // first level option
                }, {
                    // second level option
                    align: 'right'
                }],
                rotation: 0,
                x: -5
            },

            categories: [{
                name: "Southwest Pacific",
                categories: ["Avian", "Mammalian"]
            }, {
                name: "North America",
                categories: ["Avian", "Mammalian"]
            }, {
                name: "Near and Middle East",
                categories: ["Avian", "Mammalian"]
            }, {
                name: "Latin America & the Caribbean",
                categories: ["Avian", "Mammalian"]
            }, {
                name: "Europe and the Caucasus",
                categories: ["Avian", "Mammalian"]
            }, {
                name: "Asia",
                categories: ["Avian", "Mammalian"]
            }, {
                name: "Africa",
                categories: ["Avian", "Mammalian"]
            }]
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage'
            },
            labels: {
                formatter: function() {
                    return this.value+"%";
                }
            },
            tickInterval: 20,
            breaks: [{
                from: 0,
                to: 5,
                breakSize: 20
            }]
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical',
            floating: false,
            padding: 0,
            symbolHeight: 6,
            symbolWidth: 6,
            symbolRadius: 0,
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'percent',
                borderWidth: 1,
                borderColor: 'black',
                dataLabels: {
                    enabled: true,
                    color: '#000',

                    formatter: function() {return this.y},
                    inside: true,
                    rotation: 0
                }
            }
        },
        series: [{
            name: 'without population data',
            data: [128,272,7,83,36,159,353,1377,415,727,374,739,325,999]
        },{
            name: 'with population data',
            data: [20, 153, 103, 234, 23, 123, 70, 341, 1480, 3965, 354, 1223, 110, 722]
        }],
        credits: false
    }

});