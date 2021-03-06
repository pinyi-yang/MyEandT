google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart() {
  var data = new google.visualization.DataTable();
  for (let i = 0; i < piechart.columename.length; i ++) {
    data.addColumn(piechart.columetype[i], piechart.columename[i]);
  }
  data.addRows(piechart.data);
  var options = {
    title: piechart.title,
    width: 400,
    height:300
  };
  var chart = new google.visualization.PieChart(document.getElementById(piechart.div));
  chart.draw(data, options);
}