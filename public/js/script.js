// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  console.log('axios JS imported successfully!');

  const key = 'demo';
  const functionName = 'TIME_SERIES_DAILY';
  const symbolName = 'MSFT';
  const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;

  function printChartJs(stockData) {
    const ctx = document.getElementById('myChart');

    // console.log(stockData['Time Series (Daily)']);

    const labels = Object.keys(stockData['Time Series (Daily)']);

    // console.log(stockData['Time Series (Daily)']['2022-06-27']['1. open']); // { 2022-06-27: { 1. open: "xxxx"} }

    const dailyData = stockData['Time Series (Daily)'];

    const data = labels.map((date) => dailyData[date]['1. open']);

    // stockData = { Meta Data: {}, Time Series (Daily): {} }

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Stock Chart',
            backgroundColor: 'rgb(255, 99, 123)',
            borderColor: 'rgb(255, 99, 123)',
            data: data,
          },
        ],

        labels: labels,
      },
      options: {},
    });
  }

  axios
    .get(apiUrl)
    .then((response) => {
      const stockData = response.data; // { Meta Data: { ...}, Time Series (Daily): { ... }  }
      printChartJs(stockData);
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
});
