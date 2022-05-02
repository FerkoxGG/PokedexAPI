$(document).ready(function() {
    $('form').submit(function(e) {
      e.preventDefault();
      let valueInput = $('#pokemonInput').val();

      $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon/' + valueInput,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          let name = data.name;
          let weight = data.weight;
          let image = data.sprites.front_default;

          function capitalizarPrimeraLetra(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }

          $('#pokeInfo').html(`
          <div class="text-center">
            <h3>${capitalizarPrimeraLetra(name)}</h3>
            <img src="${image}">
            <h6>Peso: ${weight}</h6>
          </div>
          `);

          let estadisticas = [];

          data.stats.forEach(function(stat) {
            estadisticas.push({
              label: stat.stat.name,
              y: stat.base_stat,
            });
          });

          let config = {
            animationEnabled: true,
            title: {
              text: "Estadísticas",
            },
            axisY: {
              title: "Valor",
            },
            axisX: {
              title: "Estadística",
            },
            data: [{
              type: "column",
              dataPoints: estadisticas
            }],
          };

          let chart = new CanvasJS.Chart("pokeStats", config);
          chart.render();
          
        },
      });
    });
  });