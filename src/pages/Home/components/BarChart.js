// 柱状图组件

// 1.把功能代码都放到这个组件里面
// 2.把可变的部分抽象成props参数

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title }) => {
    const chartRef = useRef(null);
    useEffect(() => {
        // 保证dom可用才进行图表渲染
        // const chartDom = document.getElementById('main');
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
             type: 'value'
            },
            series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
            ]
        };

        option && myChart.setOption(option);
    }, []);

    return (
        // <div id="main" style={{width: '600px', height: '400px'}}>Home</div> 
        <div ref={chartRef} style={{width: '600px', height: '400px'}}>
            Home
        </div>
    );
}

export default BarChart; 