//adiciona listener de click aos botões superior

const buttonList = document.querySelectorAll('.currency__card');


buttonList.forEach((button)=>{
  button.addEventListener("click",()=>{
    const cryptoName = button.dataset.cryptoName
    const chartColor = button.dataset.chartColor
    createChart(cryptoName,chartColor);
  });
});


//Desenhar gráfico

const criptoPrice = []
const criptoDate = []
let myChart
async function createChart(cryptoName,color) {
  await getCriptoHistoryData(cryptoName);

  var graphArea = document.getElementById('myChart').getContext("2d");
  const labels = criptoDate;
  const data = {
    labels: labels.reverse(),
    datasets: [{
      label: 'Desempenho 7 dias',
      data: criptoPrice.reverse(),
      fill: false,
      borderColor: color,
      tension: 0.1
    }]
  };

  if(myChart){
    myChart.clear();
    myChart.destroy();
  }

  myChart = new Chart(graphArea,{type: 'line',data: data});

};

 

async function getCriptoHistoryData(criptoName){
  criptoPrice.length=0
  criptoDate.length = 0
  
  const apiUrl = `https://api.coincap.io/v2/assets/${criptoName}/history?interval=d1`
  const response = await fetch(apiUrl)
  const coinFullHistory = await response.json()
  
  let coinHistorySize = coinFullHistory.data.length
  for (var i = 1; i <= 7 ; i++){
    criptoPrice.push(parseFloat(coinFullHistory.data[coinHistorySize - i].priceUsd).toFixed(2))
    criptoDate.push((coinFullHistory.data[coinHistorySize - i].date).slice(0,10))
  }
}

createChart(buttonList[0].dataset.cryptoName,buttonList[0].dataset.chartColor);
