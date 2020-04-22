<template>
  <section class="dashboard-task-feedback-page bg-white h-min-screen">
    <button
      class="goTop transition-slow block fixed h-10 opacity-0 outline-none rounded-full
      w-10 focus:outline-none border border-solid border-gray-700 bg-white right-0 bottom-0
      mr-3 mb-3 z-10"
      :class="showBtn ? 'opacity-100 ':'opacity-0'"
      @click="topFunction()"
    >
      <i aria-hidden="true" class="fa fa-angle-up text-gray-700 text-2xl" />
    </button>
    <img class="mb-4 mt-12 w-full" src="/img/backgrounds/pulse_dashboard.png" alt="Pulse Dashboard">
    <div class="flex font-bold font-dark-grey font-sans h-8 text-center text-sm cursor-pointer">
      <p
        class="w-1/2 outline-none border-red-500 ml-2 rounded-sm"
        :class="{ 'border-b-2': activeTab === 'vertical' }"
        @click="activeTab = 'vertical'"
      >
        Verticals
      </p>
      <p
        class="w-1/2 outline-none border-red-500 mr-2 rounded-sm"
        :class="{ 'border-b-2': activeTab === 'account' }"
        @click="activeTab = 'account'"
      >
        Accounts
      </p>
    </div>
    <section v-show="activeTab === 'vertical'" class="mt-12">
      <div>
        <h2
          class="font-bold font-normal italic m-0 py-2 text-genpact-blue text-center text-xl tracking-wide"
        >
          Overall account health across verticals
        </h2>
      </div>
      <div class="mx-auto my-2 relative w-2/3">
        <select
          v-model="selectedHealthFilter"
          class="block appearance-none w-full bg-gray-100 border border-gray-400
          hover:border-gray-500 px-4 py-1 pr-8 rounded leading-tight focus:outline-none
          text-sm font-bold"
          @change="loadGraphOnChange('healthGraph')"
        >
          <option
            v-for="chartOption in chartOptions"
            :key="chartOption.key"
            class="text-black"
            :value="chartOption.key"
          >
            {{ chartOption.value }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 font-black"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div class="w-full flex h-auto">
        <div style="height:344px;" class="flex flex-col items-center justify-between" />
        <div style="width:100%" class="flex justify-center">
          <highcharts :options="healthChart" class="container overflowScroll py-2" />
        </div>
      </div>
      <div class="p-4 flex items-center text-genpact-pink">
        <!-- *red accounts - rating less than or equal to 3 -->
      </div>
    </section>
    <section v-show="activeTab === 'vertical'">
      <div class="mt-4">
        <h2
          class="font-bold font-normal italic m-0 py-2 text-genpact-blue text-center text-xl tracking-wide"
        >
          Vertical wise - Average rating
        </h2>
      </div>
      <div class="mx-auto my-2 relative w-2/3">
        <select
          v-model="selectedPivotGraphFilter"
          class="block appearance-none w-full bg-gray-100 border border-gray-400
          hover:border-gray-500 px-4 py-1 pr-8 rounded leading-tight focus:outline-none
          text-sm font-bold"
          @change="loadGraphOnChange('pivotGraph')"
        >
          <option
            v-for="chartOption in chartOptions"
            :key="chartOption.key"
            class="text-black"
            :value="chartOption.key"
          >
            {{ chartOption.value }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 font-black"
        >
          <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div class="w-full flex h-auto">
        <div style="width:100%" class="flex justify-center">
          <highcharts :options="pivotChart" class="container overflowScroll py-2" />
        </div>
      </div>
    </section>
    <!-- <section v-show="activeTab === 'account'" class="mt-4">
      <div>
        <h2 class="font-bold font-normal italic m-0 py-2 text-genpact-blue text-center text-xl tracking-wide">
          Bottom Accounts (average rating less than or equal to 3)
        </h2>
      </div>
      <div class="mx-auto my-2 relative w-2/3">
        <select
          v-model="selectedAvgFilter"
          class="block
              appearance-none
              w-full
              bg-gray-100
              border
              border-gray-400
              hover:border-gray-500
              px-4
              py-2
              pr-8
              rounded
              leading-tight
              focus:outline-none
              text-sm
              font-bold"
          @change="loadGraphOnChange('avgGraph')"
        >
          <option v-for="chartOption in chartOptions" :key="chartOption.key" class="text-black" :value="chartOption.key">
            {{ chartOption.value }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 font-black">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div class="w-full flex h-auto">
        <div style="width:100%">
          <highcharts :options="averageChart" class="container overflowScroll py-2" />
        </div>
      </div>
    </section>-->
    <section v-show="activeTab === 'account'" class="mt-4">
      <div>
        <h2
          class="font-bold font-normal italic m-0 py-2 text-genpact-blue text-center text-xl tracking-wide"
        >
          Issue Bifurcation - Red Accounts
        </h2>
      </div>
      <div class="mx-auto my-2 relative w-2/3">
        <select
          v-model="selectedCategoryWiseFilter"
          class="block appearance-none w-full bg-gray-100 border border-gray-400
          hover:border-gray-500 px-4 py-1 pr-8 rounded leading-tight focus:outline-none
          text-sm font-bold"
          @change="loadGraphOnChange('categoryGraph')"
        >
          <option
            v-for="chartOption in chartOptions"
            :key="chartOption.key"
            class="text-black"
            :value="chartOption.key"
          >
            {{ chartOption.value }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 font-black"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div class="w-full flex h-auto">
        <div style="width:100%" class="flex justify-center">
          <highcharts :options="categoryChart" class="container overflowScroll py-2" />
        </div>
      </div>
    </section>
    <section v-show="activeTab === 'vertical'" id="account" class="m-4">
      <div>
        <h2
          class="font-bold font-normal italic m-0 py-2 text-genpact-blue text-center text-xl tracking-wide"
        >
          Vertical wise – Bottom 5 Accounts
        </h2>
      </div>
      <div class="mx-auto my-2 relative w-2/3">
        <select
          v-model="selectedBottomVerticalGraph"
          class="block appearance-none w-full bg-gray-100 border border-gray-400
          hover:border-gray-500 px-4 py-1 pr-8 rounded leading-tight focus:outline-none
          text-sm font-bold"
          @change="loadGraphOnChange('bottomVerticalGraph')"
        >
          <option
            v-for="chartOption in chartOptions"
            :key="chartOption.key"
            class="text-black"
            :value="chartOption.key"
          >
            {{ chartOption.value }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 font-black"
        >
          <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div class="w-full flex border border-gray-400 pb-24 my-3 px-1">
        <div style="width:100%; height:320px;">
          <highcharts :options="bottomBCMVerticalChart" class="container overflowScroll py-2" />
        </div>
      </div>
      <div class="w-full flex border border-gray-400 pb-24 my-3 px-1">
        <div style="width:100%; height:320px">
          <highcharts :options="bottomCGRLHVerticalChart" class="container overflowScroll py-2" />
        </div>
      </div>
      <div class="w-full flex border border-gray-400 pb-24 my-3 px-1">
        <div style="width:100%; height:320px">
          <highcharts
            :options="bottomInsuranceVerticalChart"
            class="container overflowScroll py-2"
          />
        </div>
      </div>
      <div class="w-full flex border border-gray-400 pb-24 my-3 px-1">
        <div style="width:100%; height:320px">
          <highcharts :options="bottomHMSVerticalChart" class="container overflowScroll py-2" />
        </div>
      </div>
    </section>
    <!-- <section class="m-4">
        <div>
          <h2 class="font-bold font-normal italic m-0 py-2 text-genpact-blue text-center text-xl tracking-wide">
            Variation of VOD and VOC
          </h2>
        </div>
        <div>
          <button
            class="bg-green-500 border-2 border-green-500 rounded text-white w-full"
            @click="downloadReport"
          >
            Click here for download
          </button>
        </div>
      </section>
    </div>
    <section>-->
    <div v-show="activeTab === 'account'" class="mt-10">
      <h2
        class="font-bold font-normal italic m-0 py-2 text-genpact-pink text-center text-xl tracking-wide"
      >
        Rating Variation of VOD and VOS
      </h2>
    </div>
    <div
      v-show="activeTab === 'account'"
      class="overflox-x-scroll overflow-y-hidden mx-1 mb-5 border border-dark-gray-600"
    >
      <table class="table-auto text-center md:text-sm text-xs w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="border text-sm md:text-base lg:py-1 py-px">
              Vertical
            </th>
            <th class="border text-sm md:text-base lg:py-1 py-px">
              Company
            </th>
            <th class="border text-sm md:text-base lg:py-1 py-px">
              Voice Of Sales
            </th>
            <th class="border text-sm md:text-base lg:py-1 py-px">
              Voice Of Delivery
            </th>
          </tr>
        </thead>
        <tbody v-for="(data, index) in tableData" :key="index">
          <tr
            v-if="(data.verticalName==='BCM') && (data.voc - data.vod >= 2 || data.vod - data.voc >= 2)"
          >
            <td class="border px-1 py-2" style="background:#fcfcfc">
              {{ data.verticalName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.companyName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.voc }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.vod }}
            </td>
          </tr>
          <!-- <template v-if="data.verticalName==='BCM'">
                        <tr>
                        </tr>
          </template>-->
          <tr
            v-if="data.verticalName==='CGRLH' && (data.voc - data.vod >= 2 || data.vod - data.voc >= 2)"
          >
            <td class="border px-1 py-2" style="background:#e1e1e1">
              {{ data.verticalName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.companyName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.voc }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.vod }}
            </td>
          </tr>
          <!-- <template v-if="data.Vertical==='CGRLH'">
                        <tr v-for="(newData, indexx) in data.companyData" v-bind:key="indexx">
                           <td class="border lg:py-1 py-px">{{newData.Company}}</td>
                           <td class="border lg:py-1 py-px">{{newData.VoiceOfSales}}</td>
                           <td class="border lg:py-1 py-px">{{newData.VoiceOfDelivery}}</td>
                        </tr>
          </template>-->
          <tr
            v-if="data.verticalName==='HMS' && (data.voc - data.vod >= 2 || data.vod - data.voc >= 2)"
          >
            <td class="border px-1 py-2" style="background:#fcfcfc">
              {{ data.verticalName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.companyName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.voc }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.vod }}
            </td>
          </tr>
          <!-- <template v-if="data.Vertical==='HMS'">
                        <tr v-for="(newData, indexx) in data.companyData" v-bind:key="indexx">
                           <td class="border lg:py-1 py-px">{{newData.Company}}</td>
                           <td class="border lg:py-1 py-px">{{newData.VoiceOfSales}}</td>
                           <td class="border lg:py-1 py-px">{{newData.VoiceOfDelivery}}</td>
                        </tr>
          </template>-->
          <tr
            v-if="data.verticalName==='Insurance' && (data.voc - data.vod >= 2 || data.vod - data.voc >= 2)"
          >
            <td class="border px-1 py-2" style="background:#e1e1e1">
              {{ data.verticalName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.companyName }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.voc }}
            </td>
            <td class="border lg:py-1 py-px">
              {{ data.vod }}
            </td>
          </tr>
          <!-- <template v-if="data.Vertical==='Insurance'">
                        <tr v-for="(newData, indexx) in data.companyData" v-bind:key="indexx">
                           <td class="border lg:py-1 py-px">{{newData.Company}}</td>
                           <td class="border lg:py-1 py-px">{{newData.VoiceOfSales}}</td>
                           <td class="border lg:py-1 py-px">{{newData.VoiceOfDelivery}}</td>
                        </tr>
          </template>-->
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { Chart } from 'highcharts-vue';
import Axios from 'axios';
import BottomAvg from '../../../graphql/BottomAverage.gql';
import RootCauseVariations from '../../../graphql/RootCauseVariations.gql';
import OverallHealth from '../../../graphql/OverallHealth.gql';
import CategoryWise from '../../../graphql/CategoryWise.gql';
import PivotGraph from '../../../graphql/PivotGraph.gql';
import TableAvgRating from '../../../graphql/TableAvgRating.gql';
// import VerticalWiseBottomAccounts from '../../../graphql/verticalWiseBottomAccounts.gql';
// import categoryChart from './categoryChartData.js';
import tableChart from './tableChartData';

export default {
  name: 'Analytics',
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      activeTab: 'vertical',
      showBtn: false,
      avg: [],
      tableChart,
      bottomAvgAccounts: {
        bcm: [],
        bcmAvg: 0,
        cgrlh: [],
        cgrlhAvg: 0,
        insurance: [],
        insuranceAvg: 0,
        hms: [],
        hmsAvg: 0,
      },
      bottomAvgAccountBCM: {
        bcm: [],
        avg: [],
      },
      bottomAvgAccountCGRLH: {
        cgrlh: [],
        avg: [],
      },
      bottomVerticalChartInsurance: {
        insurance: [],
        avg: [],
      },
      bottomAvgAccountHMS: {
        hms: [],
        avg: [],
      },
      overallHealthWidth: 0,
      overallHealth: [],
      categoriesWise: [],
      pivotOverallRating: [],
      tableData: [],
      averageChart: {
        chart: {
          type: 'bar',
          height: parseInt(30 * 21, 10),
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        xAxis: {
          categories: [],
          type: 'category',
          labels: {
            rotation: -20,
            style: {
              fontSize: '9px',
              fontWeight: 300,
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        legend: {
          enabled: false,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
        },
        tooltip: {
          pointFormat: 'Avg scores for the last 4 weeks: <b>{point.y:.2f}</b>',
          enabled: false,
        },
        colors: ['#4472C4'],
        plotOptions: {
          bar: {
            pointPadding: 0.3,
            groupPadding: 0.05,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            },
            mouseOut() {
              return false;
            },
            show() {
              return false;
            },
          },
        },
        series: [
          {
            name: 'Average',
            data: [],
            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#000000',
              align: 'left',
              format: '{point.y:.1f}', // one decimal
              x: 10,
              style: {
                fontWeight: '500',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
        ],
        scrollbar: {
          enabled: true,
        },
      },
      healthChart: {
        chart: {
          type: 'bar',
          height: parseInt(30 * 15, 10),
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        xAxis: {
          categories: [],
          crosshair: true,
          labels: {
            style: {
              fontSize: '10px',
              rotate: 45,
              fontWeight: 500,
            },
          },
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: '',
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px;font-weight:700">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
            + '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
          enabled: false,
        },
        legend: {
          align: 'center',
          verticalAlign: 'top',
          layout: 'horizontal',
          x: 0,
          y: 20,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
          // itemMarginBottom: 5,
        },
        plotOptions: {
          bar: {
            pointWidth: 9,
            groupPadding: 0.07,
            borderWidth: 0,
            // stacking: 'normal',
            dataLabels: {
              enabled: true,
              color: '#000000',
              align: 'center',
              format: '{point.y:.0f}%', // one decimal
              y: 0, // 10 pixels down from the top
              x: 20,
              style: {
                fontWeight: '400',
                fontSize: '10px',
              },
            },
            events: {
              legendItemClick() {
                return false;
              },
              mouseOver() {
                return false;
              },
              mouseOut() {
                return false;
              },
              show() {
                return false;
              },
            },
          },
          allowPointSelect: false,
        },
        colors: [
          '#ff7d83',
          '#eb2f45',
          '#b6e6ed',
          '#0f548c',
        ],
        groupPadding: 1,
        series: [],
      },
      pivotChart: {
        chart: {
          type: 'bar',
          height: parseInt(30 * 12, 10),
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        xAxis: {
          categories: [],
          crosshair: true,
          title: false,
          labels: {
            style: {
              fontSize: '10px',
              rotate: 45,
              fontWeight: 500,
            },
          },
        },
        yAxis: {
          title: false,
        },
        tooltip: {
          enabled: false,
          // headerFormat: '<span style="font-size:10px;font-weight:700">{point.key}</span><table>',
          // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
          //   + '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
          // footerFormat: '</table>',
          // shared: true,
          // useHTML: true,
          // enabled: false,
        },
        legend: {
          align: 'center',
          verticalAlign: 'top',
          layout: 'horizontal',
          x: 0,
          y: 20,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
          // itemMarginBottom: 5,
        },
        plotOptions: {
          bar: {
            pointWidth: 9,
            groupPadding: 0.07,
            borderWidth: 0,
            // stacking: 'normal',
            dataLabels: {
              enabled: true,
              color: '#000000',
              align: 'center',
              format: '{point.y:.2f}', // one decimal
              y: 0, // 10 pixels down from the top
              x: 20,
              style: {
                fontWeight: '400',
                fontSize: '10px',
              },
            },
            events: {
              legendItemClick() {
                return false;
              },
              mouseOver() {
                return false;
              },
              mouseOut() {
                return false;
              },
              show() {
                return false;
              },
            },
          },
          allowPointSelect: false,
        },
        colors: [
          '#767171',
          '#6fcddb',
          '#316c9c',
        ],
        groupPadding: 1,
        series: [],
      },
      categoryChart: {
        chart: {
          type: 'bar',
          height: parseInt(30 * 9, 10),
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          },
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: ['BCM', 'CGRLH', 'HMS', 'Insurance'],
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: '',
          },
        },
        legend: {
          verticalAlign: 'top',
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            pointPadding: 0.15,
            groupPadding: 0.001,
            dataLabels: {
              enabled: true,
              color: 'black',
              rotation: 0,
              align: 'center',
              format: '{point.y:.0f}%', // one decimal
              y: 0,
              x: 0, // 10 pixels down from the top
              style: {
                // textDecoration: 'none',
                fontWeight: '300',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
            events: {
              legendItemClick() {
                return false;
              },
              mouseOver() {
                return false;
              },
              mouseOut() {
                return false;
              },
              show() {
                return false;
              },
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        colors: [
          '#073262',
          '#0f548c',
          '#316c9c',
          '#00aecf',
          '#17b5d3',
          '#434040',
          '#767171',
          '#7f7f7f',
          '#a6a6a6',
          '#bfbfbf',
          '#e9e9e9',
        ],
        series: [],
      },
      bottomBCMVerticalChart: {
        chart: {
          type: 'column',
          // height: parseInt((30 * (21)), 10),
        },
        title: {
          text: 'BCM',
        },
        subtitle: {
          text: 'Bottom Accounts – Average Rating',
        },
        xAxis: {
          categories: [],
          type: 'category',
          labels: {
            // rotation: -20,
            style: {
              fontSize: '9px',
              fontWeight: 300,
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        yAxis: {
          title: {
            text: 'Rating',
          },
        },
        legend: {
          enabled: false,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
        },
        tooltip: {
          pointFormat: 'Avg scores for the last 4 weeks: <b>{point.y:.2f}</b>',
          enabled: false,
        },
        colors: [
          '#a6a6a6',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
        ],
        plotOptions: {
          bar: {
            pointPadding: 0.3,
            groupPadding: 0.05,
          },
          column: {
            colorByPoint: true,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            },
            mouseOut() {
              return false;
            },
            show() {
              return false;
            },
          },
        },
        series: [
          {
            name: 'BCM',
            data: [],
            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#000000',
              align: 'left',
              format: '{point.y:.2f}', // one decimal
              x: -5,
              style: {
                fontWeight: '500',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
        ],
        scrollbar: {
          enabled: true,
        },
      },
      bottomCGRLHVerticalChart: {
        chart: {
          type: 'column',
          // height: parseInt((30 * (21)), 10),
        },
        title: {
          text: 'CGRLH',
        },
        subtitle: {
          text: 'Bottom Accounts – Average Rating',
        },
        xAxis: {
          categories: [],
          type: 'category',
          labels: {
            // rotation: -20,
            style: {
              fontSize: '9px',
              fontWeight: 300,
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        yAxis: {
          title: {
            text: 'Rating',
          },
        },
        legend: {
          enabled: false,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
        },
        tooltip: {
          pointFormat: 'Avg scores for the last 4 weeks: <b>{point.y:.2f}</b>',
          enabled: false,
        },
        colors: [
          '#a6a6a6',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
        ],
        plotOptions: {
          bar: {
            pointPadding: 0.3,
            groupPadding: 0.05,
          },
          column: {
            colorByPoint: true,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            },
            mouseOut() {
              return false;
            },
            show() {
              return false;
            },
          },
        },
        series: [
          {
            name: 'CGRLH',
            data: [],
            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#000000',
              align: 'left',
              format: '{point.y:.2f}', // one decimal
              x: -5,
              style: {
                fontWeight: '500',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
        ],
        scrollbar: {
          enabled: true,
        },
      },
      bottomInsuranceVerticalChart: {
        chart: {
          type: 'column',
          // height: parseInt((30 * (21)), 10),
        },
        title: {
          text: 'Insurance',
        },
        subtitle: {
          text: 'Bottom Accounts – Average Rating',
        },
        xAxis: {
          categories: [],
          type: 'category',
          labels: {
            // rotation: -20,
            style: {
              fontSize: '9px',
              fontWeight: 300,
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        yAxis: {
          title: {
            text: 'Rating',
          },
        },
        legend: {
          enabled: false,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
        },
        tooltip: {
          pointFormat: 'Avg scores for the last 4 weeks: <b>{point.y:.2f}</b>',
          enabled: false,
        },
        colors: [
          '#a6a6a6',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
        ],
        plotOptions: {
          bar: {
            pointPadding: 0.3,
            groupPadding: 0.05,
          },
          column: {
            colorByPoint: true,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            },
            mouseOut() {
              return false;
            },
            show() {
              return false;
            },
          },
        },
        series: [
          {
            name: 'Insurance',
            data: [],
            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#000000',
              align: 'left',
              format: '{point.y:.2f}', // one decimal
              x: -5,
              style: {
                fontWeight: '500',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
        ],
        scrollbar: {
          enabled: true,
        },
      },
      bottomHMSVerticalChart: {
        chart: {
          type: 'column',
          // height: parseInt((30 * (21)), 10),
        },
        title: {
          text: 'HMS',
        },
        subtitle: {
          text: 'Bottom Accounts – Average Rating',
        },
        xAxis: {
          categories: [],
          type: 'category',
          labels: {
            // rotation: -20,
            style: {
              fontSize: '9px',
              fontWeight: 300,
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        yAxis: {
          title: {
            text: 'Rating',
          },
        },
        legend: {
          enabled: false,
          itemMarginTop: 5,
          itemStyle: {
            fontSize: '10px',
          },
        },
        tooltip: {
          pointFormat: 'Avg scores for the last 4 weeks: <b>{point.y:.2f}</b>',
          enabled: false,
        },
        colors: [
          '#a6a6a6',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
          '#6fcddb',
        ],
        plotOptions: {
          bar: {
            pointPadding: 0.3,
            groupPadding: 0.05,
          },
          column: {
            colorByPoint: true,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            },
            mouseOut() {
              return false;
            },
            show() {
              return false;
            },
          },
        },
        series: [
          {
            name: 'HMS',
            data: [],
            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#000000',
              align: 'left',
              format: '{point.y:.2f}', // one decimal
              x: -5,
              style: {
                fontWeight: '500',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
        ],
        scrollbar: {
          enabled: true,
        },
      },
      typeFilter: 'monthly',
      selectedHealthFilter: 'monthly',
      selectedAvgFilter: 'monthly',
      selectedCategoryWiseFilter: 'monthly',
      selectedPivotGraphFilter: 'monthly',
      selectedTableAvgFilter: 'monthly',
      selectedBottomVerticalGraph: 'monthly',
      chartOptions: [
        { key: 'monthly', value: 'MONTHLY' },
        { key: '15day', value: 'Last 15 Days' },
        { key: '7day', value: 'Last 7 Days' },
        { key: '5day', value: ' Last 5 Days' },
      ],
    };
  },
  mounted() {
    this.loadGraphOnChange('healthGraph');
    this.loadGraphOnChange('pivotGraph');
    this.loadGraphOnChange('avgGraph');
    this.loadGraphOnChange('categoryGraph');
    this.loadGraphOnChange('bottomVerticalGraph');
    this.getRootCauseVariationsChanges();
    this.createTableChart('tableChart', this.tableChart);
  },
  beforeMount() {
    window.addEventListener('scroll', this.scrollFunction);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollFunction);
  },
  methods: {
    createTableChart() {},
    scrollFunction() {
      this.showBtn = window.scrollY > 200;
    },

    topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    loadGraphOnChange(graphType) {
      switch (graphType) {
        case 'healthGraph':
          this.overallHealthOnChange();
          break;
        case 'pivotGraph':
          this.pivotGraphOnChange();
          break;
        // case 'avgGraph':
        //   this.avgGraphFilterOnChange();
        //   break;
        case 'categoryGraph':
          this.categoryWiseOnChange();
          break;
        case 'bottomVerticalGraph':
          // this.verticalBottomOnChange();
          this.plotAllVerticalsBottomGraphs();
          break;
        default:
          break;
      }
    },
    downloadReport() {
      console.log(global.localStorage.getItem('accessToken'));
      Axios({
        method: 'get',
        url: `${Axios.defaults.baseURL}/api/v1/download-report`,
        responseType: 'arraybuffer',
      }).then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Report.pdf';
        link.click();
      });
    },
    addSeriesInAverageChart() {
      const avg = this.avg;
      const resultArray = Object.keys(avg).map((key) => [
        avg[key].companyName,
        avg[key].avgRating,
      ]);
      this.averageChart.series[0].data = resultArray;
    },
    addSeriesInBottomAvgBCM() {
      const avg = this.bottomAvgAccountBCM.avg;
      const resultArray = Object.keys(avg).map((key) => [
        avg[key].companyName,
        avg[key].avgRating,
      ]);
      this.bottomBCMVerticalChart.series[0].data = resultArray;
    },
    addSeriesInBottomAvgCGLRH() {
      const avg = this.bottomAvgAccountCGRLH.avg;
      console.log(
        'TCL: addSeriesInBottomAvgCGLRH -> avg',
        this.bottomAvgAccountCGRLH,
      );
      const resultArray = Object.keys(avg).map((key) => [
        avg[key].companyName,
        avg[key].avgRating,
      ]);

      this.bottomCGRLHVerticalChart.series[0].data = resultArray;
    },
    addSeriesInBottomAvgHMS() {
      const avg = this.bottomAvgAccountHMS.avg;
      const resultArray = Object.keys(avg).map((key) => [
        avg[key].companyName,
        avg[key].avgRating,
      ]);
      this.bottomHMSVerticalChart.series[0].data = resultArray;
    },
    addSeriesInBottomAvgInsurance() {
      const avg = this.bottomVerticalChartInsurance.avg;
      const resultArray = Object.keys(avg).map((key) => [
        avg[key].companyName,
        avg[key].avgRating,
      ]);
      this.bottomInsuranceVerticalChart.series[0].data = resultArray;
    },
    // addSeriesInVerticlBottomAverageChart() {
    //   const bcmAvg = this.bottomAvgAccounts.bcm.slice(0, 6);
    //   console.log('TCL: addSeriesInVerticlBottomAverageChart -> bcmAvg', bcmAvg);
    //   const resultArrayBCM = Object.keys(bcmAvg).map((key) => [bcmAvg[key].name, bcmAvg[key].rating]);
    //   this.bottomBCMVerticalChart.series[0].data = resultArrayBCM;

    //   const cgrlhAvg = this.bottomAvgAccounts.cgrlh.slice(0, 6);
    //   const resultArrayCGRLH = Object.keys(cgrlhAvg).map((key) => [cgrlhAvg[key].name, cgrlhAvg[key].rating]);
    //   this.bottomCGRLHVerticalChart.series[0].data = resultArrayCGRLH;

    //   const insuranceAvg = this.bottomAvgAccounts.insurance.slice(0, 6);
    //   const resultArrayInsurance = Object.keys(insuranceAvg).map((key) => [insuranceAvg[key].name, insuranceAvg[key].rating]);
    //   this.bottomInsuranceVerticalChart.series[0].data = resultArrayInsurance;

    //   const hmsAvg = this.bottomAvgAccounts.hms.slice(0, 6);
    //   const resultArrayHMS = Object.keys(hmsAvg).map((key) => [hmsAvg[key].name, hmsAvg[key].rating]);
    //   this.bottomHMSVerticalChart.series[0].data = resultArrayHMS;
    // },
    getDates(selectedPeriod) {
      const date = new Date();
      const currentDate = `${date.getFullYear()}-${date.getMonth()
        + 1}-${date.getDate()}`;
      const selectedDates = { from: null, to: currentDate };
      let pastDate = new Date();
      switch (selectedPeriod) {
        case '5day':
          pastDate = new Date(pastDate.setDate(date.getDate() - 5));
          pastDate = `${pastDate.getFullYear()}-${pastDate.getMonth()
            + 1}-${pastDate.getDate()}`;
          selectedDates.from = pastDate;
          break;
        case '7day':
          pastDate = new Date(pastDate.setDate(date.getDate() - 7));
          pastDate = `${pastDate.getFullYear()}-${pastDate.getMonth()
            + 1}-${pastDate.getDate()}`;
          selectedDates.from = pastDate;
          break;
        case '15day':
          pastDate = new Date(pastDate.setDate(date.getDate() - 15));
          pastDate = `${pastDate.getFullYear()}-${pastDate.getMonth()
            + 1}-${pastDate.getDate()}`;
          selectedDates.from = pastDate;
          break;
        case 'monthly':
          pastDate = new Date(pastDate.setMonth(date.getMonth() - 1));
          pastDate = `${pastDate.getFullYear()}-${pastDate.getMonth()
            + 1}-${pastDate.getDate()}`;
          selectedDates.from = pastDate;
          break;
        default:
          pastDate = new Date(pastDate.setDate(date.getDate() - 5));
          pastDate = `${pastDate.getFullYear()}-${pastDate.getMonth()
            + 1}-${pastDate.getDate()}`;
          selectedDates.from = pastDate;
          break;
      }
      return selectedDates;
    },
    formatHealthChartData(overallHealth) {
      const vosRed = { name: 'VOS <=3', data: [] };
      const vodRed = { name: 'VOD <=3', data: [] };
      const vosGreen = { name: 'VOS >3', data: [] };
      const vodGreen = { name: 'VOD >3', data: [] };
      const categories = [];
      overallHealth.forEach((e) => {
        vosRed.data.push(e.vocMin);
        vosGreen.data.push(e.vocMax);
        vodRed.data.push(e.vodMin);
        vodGreen.data.push(e.vodMax);
        categories.push(e.vertical);
      });
      this.healthChart.xAxis.categories = categories;
      const all = [vosRed, vodRed, vosGreen, vodGreen];
      return all;
    },
    formatPivotChartGraph(pivotOverallRating) {
      const vosAvg = { name: 'VOS Average', data: [] };
      const vodAvg = { name: 'VOD Average', data: [] };
      const avgRating = { name: 'Vertical Average', data: [] };
      const categories = [];
      pivotOverallRating.forEach((e) => {
        vosAvg.data.push(e.vocAvg);
        vodAvg.data.push(e.vodAvg);
        avgRating.data.push(e.avgRating);
        categories.push(e.verticalName);
      });
      this.pivotChart.xAxis.categories = categories;
      const all = [avgRating, vosAvg, vodAvg];
      return all;
    },
    // async avgGraphFilterOnChange() {
    //   const allDates = this.getDates(this.selectedAvgFilter);
    //   try {
    //     const { data } = await this.$apollo.query({
    //       addTypename: false,
    //       query: BottomAvg,
    //       variables: {
    //         fromDate: allDates.from,
    //         toDate: allDates.to,
    //         vertical: 'BCM',
    //       },
    //       fetchPolicy: 'network-only',
    //     });
    //     this.avg = data.getBottomAccount;
    //     this.averageChart.xAxis.categories = this.avg.map((m) => {
    //       const c = m.companyName.split(' ');
    //       if (c.length > 1) {
    //         return c[0];
    //       }
    //       return c;
    //     });
    //     this.addSeriesInAverageChart();
    //   } catch (error) {
    //     console.log('bottom average error ---> ', error);
    //   }
    // },
    async overallHealthOnChange() {
      console.log('table', this.tableData);
      const allDates = this.getDates(this.selectedHealthFilter);
      try {
        const { data } = await this.$apollo.query({
          addTypename: false,
          query: OverallHealth,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
          },
          fetchPolicy: 'network-only',
        });
        this.overallHealth = data.getOverallAccountHealth;
        this.healthChart.series = this.formatHealthChartData(
          this.overallHealth,
        );
      } catch (error) {
        console.log('bottom average error ---> ', error);
      }
    },
    async getRootCauseVariationsChanges() {
      console.log('tablgge', this.tableData);
      const allDates = this.getDates(this.selectedHealthFilter);
      try {
        const { data } = await this.$apollo.query({
          addTypename: false,
          query: RootCauseVariations,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
          },
          fetchPolicy: 'network-only',
        });
        this.tableData = data.getRootCauseVariations;
        console.log('tasdble', this.tableData);
      } catch (error) {
        console.log('root caouse variations error ---> ', error);
      }
    },
    getSortedArray(data) {
      // eslint-disable-next-line no-param-reassign
      data.forEach((account) => {
        // eslint-disable-next-line no-param-reassign
        account.rating = (account.lastVOCRating + account.lastVODRating) / 2;
      });
      const result = data && data.length ? data.sort((a, b) => a.rating - b.rating) : [];
      return result;
    },
    getAvgOfArray(data) {
      // const result = (data && data.length) ? data.reduce((a, b) => {
      //   a.vocRatings + a.vodRatings + b.vocRatings + b.vodRatings
      //   }, 0) / data.length : 0;
      // return result;
      // let vocRatings = 0;
      // let vodRatings = 0;
      // let vocFeedbacks = 0;
      // let vodFeedbacks = 0;
      let avgRating = 0;
      let dataLength = 0;
      if (data && data.length > 0) {
        data.forEach((account) => {
          if (account.name === 'Wells Fargo') {
            console.log('account.name');
          }
          // vocRatings += account.vocRatings;
          // vocFeedbacks += account.vocFeedbacks;
          // vodRatings += account.vodRatings;
          // vodFeedbacks += account.vodFeedbacks;
          const avgVOC = account.vocFeedbacks !== 0
            ? account.vocRatings / account.vocFeedbacks
            : 0;
          const avgVOD = account.vodFeedbacks !== 0
            ? account.vodRatings / account.vodFeedbacks
            : 0;
          // console.log(`account: ${account.name}, vertical: ${account.vertical}`);
          // console.log(`voc: ${account.vocRatings}, vocFeedbacks: ${account.vocFeedbacks}, vodRatings: ${account.vodRatings}, vodFeedbacks: ${account.vodFeedbacks}, avgVOC: ${avgVOC}, avgVOD: ${avgVOD}`);
          avgRating += (avgVOC + avgVOD) / 2;
        });
        dataLength = data.length;
      }
      const result = dataLength !== 0 ? avgRating / dataLength : 0;
      return result;
    },
    async plotAllVerticalsBottomGraphs() {
      try {
        await Promise.all([
          this.verticalBottomBCMGraphs(),
          this.verticalBottomGraphsHMS(),
          this.verticalBottomGraphsCGLRH(),
          this.verticalBottomGraphsInsurance(),
        ]);
      } catch (error) {
        console.log('plotAllVerticalsBottomGraphs -->', error);
      }
    },
    async verticalBottomBCMGraphs() {
      const allDates = this.getDates(this.selectedBottomVerticalGraph);
      try {
        const { data } = await this.$apollo.query({
          query: BottomAvg,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
            vertical: 'BCM',
          },
          fetchPolicy: 'network-only',
        });
        this.bottomAvgAccountBCM.avg = data.getBottomAccount;
        this.bottomBCMVerticalChart.xAxis.categories = this.bottomAvgAccountBCM.avg.map(
          (m) => m.companyName,
        );
        this.addSeriesInBottomAvgBCM();
      } catch (error) {
        console.log('verticalBottomBCMGraphs error ---> ', error);
      }
    },
    async verticalBottomGraphsHMS() {
      const allDates = this.getDates(this.selectedBottomVerticalGraph);
      try {
        const { data } = await this.$apollo.query({
          query: BottomAvg,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
            vertical: 'HMS',
          },
          fetchPolicy: 'network-only',
        });
        this.bottomAvgAccountHMS.avg = data.getBottomAccount;
        this.bottomHMSVerticalChart.xAxis.categories = this.bottomAvgAccountHMS.avg.map(
          (m) => m.companyName,
        );
        this.addSeriesInBottomAvgHMS();
        console.log(
          'data vertical bottom graphs --> ',
          this.bottomHMSVerticalChart,
        );
      } catch (error) {
        console.log('verticalBottomGraphsHMS error ---> ', error);
      }
    },
    async verticalBottomGraphsInsurance() {
      const allDates = this.getDates(this.selectedBottomVerticalGraph);
      try {
        const { data } = await this.$apollo.query({
          query: BottomAvg,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
            vertical: 'INSURANCE',
          },
          fetchPolicy: 'network-only',
        });
        this.bottomVerticalChartInsurance.avg = data.getBottomAccount;
        this.bottomInsuranceVerticalChart.xAxis.categories = this.bottomVerticalChartInsurance.avg.map(
          (m) => m.companyName,
        );
        this.addSeriesInBottomAvgInsurance();
        console.log(
          'data vertical bottom graphs --> ',
          this.bottomInsuranceVerticalChart,
        );
      } catch (error) {
        console.log('verticalBottomGraphsInsurace error ---> ', error);
      }
    },
    async verticalBottomGraphsCGLRH() {
      const allDates = this.getDates(this.selectedBottomVerticalGraph);
      try {
        const { data } = await this.$apollo.query({
          query: BottomAvg,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
            vertical: 'CGRLH',
          },
          fetchPolicy: 'network-only',
        });
        this.bottomAvgAccountCGRLH.avg = data.getBottomAccount;
        this.bottomCGRLHVerticalChart.xAxis.categories = this.bottomAvgAccountCGRLH.avg.map(
          (m) => m.companyName,
        );
        this.addSeriesInBottomAvgCGLRH();
        console.log(
          'data vertical bottom graphs --> ',
          this.bottomCGRLHVerticalChart,
        );
      } catch (error) {
        console.log('verticalBottomGraphsCGLRH error ---> ', error);
      }
    },
    // async verticalBottomOnChange() {
    //   const allDates = this.getDates(this.selectedBottomVerticalGraph);
    //   try {
    //     const { data } = await this.$apollo.query({
    //       addTypename: false,
    //       query: VerticalWiseBottomAccounts,
    //       variables: {
    //         fromDate: allDates.from,
    //         toDate: allDates.to,
    //       },
    //       fetchPolicy: 'network-only',
    //     });
    //     this.bottomAvgAccounts.bcm = (data.verticalWiseAccounts && data.verticalWiseAccounts.length) ? data.verticalWiseAccounts.filter((account) => account.vertical === 'BCM') : [];
    //     this.bottomAvgAccounts.bcm = this.getSortedArray(this.bottomAvgAccounts.bcm);
    //     this.bottomAvgAccounts.bcmAvg = this.getAvgOfArray(this.bottomAvgAccounts.bcm);
    //     this.bottomAvgAccounts.cgrlh = (data.verticalWiseAccounts && data.verticalWiseAccounts.length) ? data.verticalWiseAccounts.filter((account) => account.vertical === 'CGRLH') : [];
    //     this.bottomAvgAccounts.cgrlh = this.getSortedArray(this.bottomAvgAccounts.cgrlh);
    //     this.bottomAvgAccounts.cgrlhAvg = this.getAvgOfArray(this.bottomAvgAccounts.cgrlh);
    //     this.bottomAvgAccounts.insurance = (data.verticalWiseAccounts && data.verticalWiseAccounts.length) ? data.verticalWiseAccounts.filter((account) => account.vertical === 'Insurance') : [];
    //     this.bottomAvgAccounts.insurance = this.getSortedArray(this.bottomAvgAccounts.insurance);
    //     this.bottomAvgAccounts.insuranceAvg = this.getAvgOfArray(this.bottomAvgAccounts.insurance);
    //     this.bottomAvgAccounts.hms = (data.verticalWiseAccounts && data.verticalWiseAccounts.length) ? data.verticalWiseAccounts.filter((account) => account.vertical === 'HMS') : [];
    //     this.bottomAvgAccounts.hms = this.getSortedArray(this.bottomAvgAccounts.hms);
    //     this.bottomAvgAccounts.hmsAvg = this.getAvgOfArray(this.bottomAvgAccounts.hms);
    //     console.log(`bcm: ${this.bottomAvgAccounts.bcm.length}, CGRLH: ${this.bottomAvgAccounts.cgrlh.length}, Insurance: ${this.bottomAvgAccounts.insurance.length}, HMS: ${this.bottomAvgAccounts.hms.length}`);
    //     console.log(`AVG bcm: ${this.bottomAvgAccounts.bcmAvg}, CGRLH: ${this.bottomAvgAccounts.cgrlhAvg}, Insurance: ${this.bottomAvgAccounts.insuranceAvg}, HMS: ${this.bottomAvgAccounts.hmsAvg}`);
    //     const bcmFilter = this.pivotOverallRating.length > 0 ? this.pivotOverallRating.filter((account) => account.verticalName === 'BCM') : 0;
    //     this.bottomAvgAccounts.bcmAvg = (bcmFilter.length > 0 && bcmFilter[0].avgRating) ? bcmFilter[0].avgRating : 0;
    //     const cgrlhFilter = this.pivotOverallRating.length > 0 ? this.pivotOverallRating.filter((account) => account.verticalName === 'CGRLH') : 0;
    //     this.bottomAvgAccounts.cgrlhAvg = (cgrlhFilter.length > 0 && cgrlhFilter[0].avgRating) ? cgrlhFilter[0].avgRating : 0;
    //     const insuranceFilter = this.pivotOverallRating.length > 0 ? this.pivotOverallRating.filter((account) => account.verticalName === 'Insurance') : 0;
    //     this.bottomAvgAccounts.insuranceAvg = (insuranceFilter.length > 0 && insuranceFilter[0].avgRating) ? insuranceFilter[0].avgRating : 0;
    //     const hmsFilter = this.pivotOverallRating.length > 0 ? this.pivotOverallRating.filter((account) => account.verticalName === 'HMS') : 0;
    //     this.bottomAvgAccounts.hmsAvg = (hmsFilter.length > 0 && hmsFilter[0].avgRating) ? hmsFilter[0].avgRating : 0;
    //     // console.log(`AVG bcm: ${this.bottomAvgAccounts.bcmAvg}, CGRLH: ${this.bottomAvgAccounts.cgrlhAvg}, Insurance: ${this.bottomAvgAccounts.insuranceAvg}, HMS: ${this.bottomAvgAccounts.hmsAvg}`);
    //     // console.log(`AVG bcm: ${this.bottomAvgAccounts.bcm[0].rating}, ${this.bottomAvgAccounts.bcm[this.bottomAvgAccounts.bcm.length - 1].rating}`);
    //     this.bottomAvgAccounts.bcm.unshift({ name: 'Average(BCM)', rating: this.bottomAvgAccounts.bcmAvg });
    //     this.bottomAvgAccounts.cgrlh.unshift({ name: 'Average(CGRLH)', rating: this.bottomAvgAccounts.cgrlhAvg });
    //     this.bottomAvgAccounts.insurance.unshift({ name: 'Average(Insurance)', rating: this.bottomAvgAccounts.insuranceAvg });
    //     this.bottomAvgAccounts.hms.unshift({ name: 'Average(HMS)', rating: this.bottomAvgAccounts.hmsAvg });
    //     this.bottomBCMVerticalChart.xAxis.categories = this.bottomAvgAccounts.bcm.slice(0, 7).map((m) => {
    //       const c = m.name.split(' ');
    //       if (c.length > 1) {
    //         return c[0];
    //       }
    //       return c;
    //     });
    //     this.bottomCGRLHVerticalChart.xAxis.categories = this.bottomAvgAccounts.cgrlh.slice(0, 7).map((m) => {
    //       const c = m.name.split(' ');
    //       if (c.length > 1) {
    //         return c[0];
    //       }
    //       return c;
    //     });
    //     this.bottomInsuranceVerticalChart.xAxis.categories = this.bottomAvgAccounts.insurance.slice(0, 7).map((m) => {
    //       const c = m.name.split(' ');
    //       if (c.length > 1) {
    //         return c[0];
    //       }
    //       return c;
    //     });
    //     this.bottomHMSVerticalChart.xAxis.categories = this.bottomAvgAccounts.hms.slice(0, 7).map((m) => {
    //       const c = m.name.split(' ');
    //       if (c.length > 1) {
    //         return c[0];
    //       }
    //       return c;
    //     });
    //     this.addSeriesInVerticlBottomAverageChart();
    //   } catch (error) {
    //     console.log('bottom average error ---> ', error);
    //   }
    // },
    formatCategoryWiseChartData(categoriesWise) {
      // const data = [];
      // const result = [];
      // for (let i = 0; i < categoriesWise.length; i += 1) {
      //   const total = categoriesWise[i].total;
      //   categoriesWise[i].values.forEach((e) => {
      //     data.push({ name: e.keyword, data: [(e.countofkeyword * 100) / total], vertical: [categoriesWise[i].verticalName] });
      //   });
      // }
      // data.forEach((item) => {
      //   const existing = result.filter((resultItem) => resultItem.name === item.name);
      //   if (existing.length) {
      //     const existingIndex = result.indexOf(existing[0]);
      //     result[existingIndex].data.push(...item.data);
      //     result[existingIndex].vertical.push(...item.vertical);
      //   } else {
      //     result.push(item);
      //   }
      // });
      const staticValues = ['BCM', 'CGRLH', 'HMS', 'Insurance'];
      const res = categoriesWise.reduce(
        (r, { verticalName, total, values }) => {
          values.forEach(({ keyword: name, countofkeyword }) => {
            let temp = r.find((q) => q.name === name);
            // eslint-disable-next-line no-unused-vars
            if (!temp) {
              r.push(
                (temp = {
                  name,
                  // eslint-disable-next-line no-unused-vars
                  data: staticValues.map((_) => 0),
                  vertical: [...staticValues],
                }),
              );
            }
            temp.data[staticValues.indexOf(verticalName)] = (countofkeyword * 100) / total;
          });
          return r;
        },
        [],
      );
      return res;
    },
    async categoryWiseOnChange() {
      const allDates = this.getDates(this.selectedCategoryWiseFilter);
      try {
        const { data } = await this.$apollo.query({
          addTypename: false,
          query: CategoryWise,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
          },
          fetchPolicy: 'network-only',
        });
        this.categoriesWise = data.getCategoryWiseIssue;
        this.categoryChart.series = this.formatCategoryWiseChartData(
          this.categoriesWise,
        );
      } catch (error) {
        console.log('categoryWiseOnChange error --->', error);
      }
    },
    async pivotGraphOnChange() {
      const allDates = this.getDates(this.selectedPivotGraphFilter);
      try {
        const { data } = await this.$apollo.query({
          addTypename: false,
          query: PivotGraph,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
          },
          fetchPolicy: 'network-only',
        });
        this.pivotOverallRating = data.getPivotGraphData;
        this.pivotChart.series = this.formatPivotChartGraph(
          this.pivotOverallRating,
        );
      } catch (error) {
        console.log('bottom average error ---> ', error);
      }
    },
    async tableAverageRatingOnChange() {
      console.log('tabnale', this.tableData);
      const allDates = this.getDates(this.selectedTableAvgFilter);
      try {
        const { data } = await this.$apollo.query({
          addTypename: false,
          query: TableAvgRating,
          variables: {
            fromDate: allDates.from,
            toDate: allDates.to,
          },
          fetchPolicy: 'network-only',
        });
        this.tableData = data.getRootCauseVariations;
      } catch (error) {
        console.log('bottom average error ---> ', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .feedback-row {
//   position: relative;
//   &:before {
//     position: absolute;
//     height: 97%;
//     content: '';
//     left: -10px;
//     width: 3px;
//     border-radius: 4px;
//     top: 50%;
//     transform: translateY(-50%);
//     opacity: 0.8;
//   }

//   &.voc-row:before {
//     background: #FF545E;
//   }

//   &.vod-row:before {
//     background: #00ADCF;
//   }
// }
.overflowScroll {
  overflow: scroll !important;
}
</style>

<style>
.highcharts-credits {
  display: none !important;
}
.none {
  display: none;
}

.hccontainer {
  height: 300px;
  min-width: 310px;
  max-width: 800px;
}
.scaled {
  transform: scale(1);
}
</style>

