var starbutton = document.getElementById("start");
starbutton.addEventListener('click',main())
function main(){
    var date = new Date(Date.now());
    var spanDate = document.getElementById('date');
    spanDate.innerHTML= date.toString();

    const stept = 0.02;
    var startpoint = 0;
    var socket = io.connect('http://localhost:3000');
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Arduino Signal",
                borderColor: "#FF5733",
                data: [],
                fill: false,
                pointStyle: 'circle',
                backgroundColor: '#3498DB',
                pointRadius: 1,
                pointHoverRadius: 1,
                lineTension: 0,
            }]
        },
        options:{
            // animation: {
            //     onComplete: ()=>{
            //         var sourceCanvas = this.chart.ctx.canvas;
            //         var copyWidth = this.scale.xScalePaddingLeft - 5;
            //         var copyHeight = this.scale.endPoint + 5;
            //         var targetCtx = document.getElementById("myChartAxis").getContext("2d");
            //         targetCtx.canvas.width = copyWidth;
            //         targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
            //     }
            // },
            scales:{
                x:{
                    type: 'time', 
                        beginAtZero: true,
                        title:{
                            display: true,
                            text: 'Voltage (V)'
                        },
                        time:{
                            unit: 'millisecond',
                            stepSize: 1,
                        }
                },
                y:{
                    type:'linear',
                        min:0,
                        max:3,
                        title:{
                            display: true,
                            text: 'Time (ms)'
                        },
                        ticks:{
                            callback: function(value){
                                return Math.round(1000*value)/1000
                            }
                        }
                }
            }
        }
    });
    socket.on('signal',(data)=>{
        for(let i =0; i<data.signal.length;i++){
            chart.data.labels.push(startpoint);
            chart.data.datasets.forEach((dataset)=>{
                dataset.data.push(data.signal[i])});
            startpoint += stept;
            chart.update();
        }
    })
}
