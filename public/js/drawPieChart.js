
google.charts.load('current', {'packages':['corechart']});
let piechart = {
  title: 'test pie chart',
  columename: ['Topping', 'Slices'],
  columetype: ['string', 'number'],
  date: [
    ['Mushrooms', 1],
    ['Onions', 1],
    ['Olives', 2],
    ['Zucchini', 2],
    ['Pepperoni', 1]
  ],
  div: 'chart1'
}

function drawPieChart() {
  var data = new google.visualization.DataTable();
  for (let i = 0; i < piechart.columename.length; i ++) {
    data.addColumn(piechart.columetype, piechart.columename);
  }
  data.addRow(piechart.data);
  var options = {
    title: piechart.title,
    width: 400,
    height:300
  };
  var chart = new google.visualization.PieChart(document.getElementById(piechart.div));
  chart.draw(data, options);
}
google.charts.setOnLoadCallback(drawPieChart);
