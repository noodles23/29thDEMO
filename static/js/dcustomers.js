// queue()
//     // .defer(d3.csv)
//     .await(makeGraphs);

d3.csv('/static/demo_cust_base.csv', function makeGraphs(data) {
	
//Start Transformations
	var dataSet =data ;
	// var dateFormat = d3.time.format("%m/%d/%Y");
	dataSet.forEach(function(d) {
		// d.month = dateFormat.parse(d.month);
				// d.transaction_date.setDate(1);
		d.month= +d.month;
		d.product_price = +d.product_price;
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var all = ndx.groupAll();	
	var monthNum = ndx.dimension(function(d) { return d.month; });
	var custStatus = ndx.dimension(function(d) { return d.customer_new_or_return; });
	
	var prodCategory = ndx.dimension(function(d) { return d.product_category; });
	var genderStatus = ndx.dimension(function(d) { return d.customer_gender; });

	var custNew=monthNum.group().reduceCount(function(d) 
   {if (d.customer_new_or_return==='new') {return d.customer_id;}else{return 0;}});
	var custReturn=monthNum.group().reduceCount(function(d) 
   {if (d.customer_new_or_return==='return') {return d.customer_id;}else{return 0;}});
   
   var salespriceByMonth=monthNum.group().reduceSum(dc.pluck('product_price'));
   var ordersByMonth=monthNum.group().reduceSum(dc.pluck('product_price'));
   
   	var custCity = ndx.dimension(function(d) { return d.customer_state; });
	var cityGroup = custCity.group();
	
	var netTotalSales = ndx.groupAll().reduceSum(dc.pluck('product_price'));
	var netTotalOrders = ndx.groupAll().reduceCount(dc.pluck('product_price'));

	//Define threshold values for data
	var minDate = monthNum.bottom(1)[0].month;
	var maxDate = monthNum.top(1)[0].month;


    //Charts
	var netOrders = dc.numberDisplay("#total-orders");
	var netSales = dc.numberDisplay("#total-sales");
	var newcustChart = dc.lineChart("#newcust-chart");

	selectField = dc.selectMenu('#menuselect')
        .dimension(custCity)
        .group(cityGroup); 

    dc.dataCount("#row-selection")
        .dimension(ndx)
        .group(all);


	netOrders
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(netTotalOrders)
		.formatNumber(d3.format(".3s"));

	netSales
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(netTotalSales)
		.formatNumber(d3.format(".3s"));

	newcustChart
		//.width(600)
		.height(300)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(monthNum)
		.group(custReturn, 'Returning Customers')
		.stack(custNew,'New Customers')
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("2014 month Number#")
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
		.elasticX(true)
        // .brushOn(false)
        .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
		.yAxis().ticks(6);	

    dc.renderAll();

});