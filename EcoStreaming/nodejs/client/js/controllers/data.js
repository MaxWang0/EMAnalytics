app.controller('DataController', function($scope, $location, $http) {
    $scope.priceData = {
        promise: $http.post('/api/web/data/retrieve', {})
    };
});

app.directive("linearChart", function($window) {
    return {
        restrict: "EA",
        // scope: { promise: '=linearChart' },
        template: "<svg width='1000' height='1000'></svg>",
        link: function(scope, elem, attrs){
            scope.priceData.promise.success(function (data) {
                console.log("DATA");
                console.log(data);

                // Build the priceData
                var priceData = [];

                data.list.forEach(function(d) {
                    var temp = {};
                    temp.price = d.lmp5;
                    temp.date = new Date(d.intend);

                    if (temp.price && temp.date)
                        priceData.push(temp);
                });

                console.log(priceData);

                // Draw the Graph
                var padding = 20;
                var width = 1000;
                var height = 1000;

                drawLineChart();

                function drawLineChart() {
                    var d3 = $window.d3;
                    var rawSvg=elem.find('svg');
                    var svg = d3.select(rawSvg[0]);
                    var pathClass="path";
                    var xScale, yScale, xAxisGen, yAxisGen, lineLMP5;

                    xScale = d3.time.scale()
                               .domain([priceData[0].date, priceData[priceData.length - 1].date])
                               .rangeRound([0,width-padding]);

                    yScale = d3.scale.linear()
                      .domain([0, d3.max(priceData, function (d) {
                        return d.price;
                        })])
                      .range([width - padding, 0]);

                    xAxisGen = d3.svg.axis()
                                 .scale(xScale)
                                 .orient("bottom")
                                 .ticks(d3.time.hour, 1);

                    yAxisGen = d3.svg.axis()
                                 .scale(yScale)
                                 .orient("left")
                                 .ticks(10);

                    lineLMP5 = d3.svg.line()
                                .x(function (d) {
                                  return xScale(d.date);
                                })
                                .y(function (d) {
                                  return yScale(d.price);
                              });
                                // .interpolate("basis");

                    svg.append("svg:g")
                     .attr("class", "x axis")
                     .attr("transform", "translate(50," + (height - padding) + ")")
                     .call(xAxisGen);

                    svg.append("svg:g")
                      .attr("class", "y axis")
                      .attr("transform", "translate(50,0)")
                      .call(yAxisGen);

                    svg.append("svg:path")
                      .attr({
                        d: lineLMP5(priceData),
                        "stroke": "blue",
                        "stroke-width": 2,
                        "fill": "none",
                        "class": pathClass
                    });
                }
            });
        }
    };
});
