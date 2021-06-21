import ReactEcharts from 'echarts-for-react';
const data = [
  {
    type: 'Starts',
    metadata: [
      { name: 'Expansion', value: 394 },
      { name: 'Replacement', value: 326 },
    ],
  },
  {
    type: 'Exits',
    metadata: [
      { name: 'Involuntary Turnover', value: -116 },
      { name: 'Voluntary Turnover', value: -232 },
    ],
  },
  {
    type: 'Discrepencies',
    metadata: [{ name: 'Discrepencies', value: 7 }],
  },
  {
    type: 'Net Change',
    metadata: [{ name: 'Net Change' }],
  },
];

const Waterfall = () => {
  const computeType = (type) => {
    let arr = [];
    data.forEach((element) => {
      element.metadata.forEach((node) => {
        if (element.type === type) {
          arr.push(Math.abs(node.value));
        } else {
          arr.push('-');
        }
      });
    });
    return arr;
  };

  const computeXAxis = () => {
    let arr = [];
    data.forEach((element) => {
      element.metadata.forEach((node) => {
        arr.push(node.name);
      });
    });
    return arr;
  };

  const computeNetChange = () => {
    let arr = [];
    let sum = 0;
    data.forEach((element) => {
      element.metadata.forEach((node) => {
        if (element.type === 'Net Change') {
          arr.push(sum);
        } else {
          arr.push('-');
          sum += node.value;
        }
      });
    });
    return arr;
  };

  const computeLegend = () => {
    let legend = [];
    data.forEach((element) => {
      legend.push(element.type);
    });
    return legend;
  };

  const computeEmpty = () => {
    let arr = [];
    let sum = 0;
    let flag = 1;
    data.forEach((element, i) => {
      element.metadata.forEach((node) => {
        if (flag === 1) {
          arr.push(0);
          sum += node.value;
        } else if (
          element.type === 'Starts' ||
          element.type === 'Discrepencies'
        ) {
          arr.push(sum);
          sum += node.value;
        } else if (element.type === 'Exits') {
          arr.push(sum - Math.abs(node.value));
          sum -= Math.abs(node.value);
        } else {
          arr.push('-');
        }
        flag = 0;
      });
    });
    console.log(arr);
    return arr;
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        var tar;
        for (let i = 1; i <= 4; i++) {
          if (params[i].value !== '-') {
            tar = params[i];
          }
        }
        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      },
    },
    legend: {
      data: computeLegend(),
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: computeXAxis(),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Empty',
        type: 'bar',
        stack: 'empty',
        itemStyle: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)',
          },
        },
        barWidth: '95%',
        data: computeEmpty(),
        // [0, 394, 604, 372, 372, "-"]
      },
      {
        name: 'Starts',
        type: 'bar',
        stack: 'empty',
        itemStyle: {
          borderColor: 'rgb(190,241,198)',
          color: 'rgb(190,241,198)',
        },
        label: {
          show: true,
          position: 'top',
        },
        data: computeType('Starts'),
      },
      {
        name: 'Exits',
        type: 'bar',
        stack: 'empty',
        itemStyle: {
          borderColor: 'rgb(249,178,194)',
          color: 'rgb(249,178,194)',
        },
        label: {
          show: true,
          position: 'bottom',
        },
        data: computeType('Exits'),
      },
      {
        name: 'Discrepencies',
        type: 'bar',
        stack: 'empty',
        itemStyle: {
          borderColor: 'rgb(233,233,235)',
          color: 'rgb(233,233,235)',
        },
        label: {
          show: true,
          position: 'bottom',
        },
        data: computeType('Discrepencies'),
      },
      {
        name: 'Net Change',
        type: 'bar',
        stack: 'empty',
        itemStyle: {
          borderColor: 'rgb(200,231,249)',
          color: 'rgb(200,231,249)',
        },
        label: {
          show: true,
          position: 'top',
        },
        data: computeNetChange(),
      },
    ],
  };
  return <ReactEcharts option={option} />;
};

export default Waterfall;
