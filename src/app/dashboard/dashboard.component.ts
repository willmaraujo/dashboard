import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

declare var google: any; //global variable

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      data => {
        this.data = data;
        this.init();
      });
  }

  init(): void {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.showCharts());
      }, 1000);
    }
  }

  showCharts(): void {
    this.showPieChart();
    this.show3dPieChart();
    this.showDonutChart();
    this.showBarChart();
    this.showLineChart();
    this.showColumnChart();
  }

  showPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  show3dPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options.is3D = true;
    chart.draw(this.getDataTable(), options);
  }

  showDonutChart(): void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options.pieHole = 0.4;
    chart.draw(this.getDataTable(), options);
  }

  showBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  showLineChart(): void {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  showColumnChart(): void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  getDataTable(): void {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Month');
    data.addColumn('number', 'Qtd');
    data.addRows(this.data);

    return data;
  }

  getOptions(): any {
    return {
      title: 'Quantity of registers in the first semester',
      width: 400,
      height: 300
    }
  }

}
