<template>
  <div class="<%= nameKebab %>">
    <h2 class="app-h2">总览</h2>
    <ul class="pd20">
      <li>
        <chart :options="pieData" auto-resize v-if="pieData"></chart>
      </li>
      <li>
        <chart :options="lineData" auto-resize v-if="lineData"></chart>
      </li>
      <li>
        <chart :options="barData" auto-resize v-if="barData"></chart>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import api from '@/api';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';

Vue.component('chart', ECharts);

/**
 * 将接口返回的数据映射为pie图表组件的数据格式
 */
const getChartPieData = (dataOrigin) => {
  if (!dataOrigin) {
    return null;
  }

  const dataMap = dataOrigin.map((item) => ({
    name: item.title,
    value: item.value
  }));

  return {
    title: {
      text: '饼图',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: dataMap.map((item) => item.name),
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: dataMap,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}

/**
 * 将接口返回的数据映射为line图表组件的数据格式
 */
const getChartLineData = (dataOrigin) => {
  if (!dataOrigin) {
    return null;
  }

  return {
    title: {
      text: '线图',
      x: 'center',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: Object.keys(dataOrigin.y),
      left: 'left',
      orient: 'vertical',
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['stack', 'tiled'] },
        saveAsImage: { show: true },
      }
    },
    xAxis: {
      boundaryGap: false,
      splitLine: {
        show: false
      },
      splitNumber: 10,
      data: dataOrigin.x
    },
    yAxis: {
      type: 'value',
    },
    series: Object.keys(dataOrigin.y).map(key => {
      return {
        name: key,
        type: 'line',
        smooth: true,
        // symbol: 'none',
        data: dataOrigin.y[key]
      };
    })
  };
}

/**
 * 将接口返回的数据映射为bar图表组件的数据格式
 */
const getChartBarData = (dataOrigin) => {
  if (!dataOrigin) {
    return null;
  }

  return {
    title: {
      text: '柱图',
      x: 'center',
    },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: dataOrigin.x,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '柱高',
        type: 'bar',
        barWidth: '60%',
        data: dataOrigin.y
      }
    ]
  };
}

export default {
  name: '<%= nameKebab %>',
  data() {
    return {
      detail: {},
    };
  },
  computed: {
    pieData() {
      return getChartPieData(this.detail.pieInfo);
    },
    lineData() {
      return getChartLineData(this.detail.lineInfo);
    },
    barData() {
      return getChartBarData(this.detail.barInfo);
    }
  },
  created() {
    api.general.getDetail({})
      .then(data => {
        this.detail = data;
      })
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/function';

.<%= nameKebab %> {
  li {
    display: inline-block;
    margin: 15px 0 0 20px;
  }
}

.echarts {
  width: 450px;
  height: 450px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 1px 10px 3px rgba(0, 0, 0, .1);

  &:hover {
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, .2);
  }
}
</style>
