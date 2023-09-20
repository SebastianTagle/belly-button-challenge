//We need to get the information with the url. So first, i define the url variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// then, i get the information from the url with D3 library
d3.json(url).then((data) => {
    console.log("ejemplo: ",data);
    var info_samples = data.samples;
    var info_metadata = data.metadata;
    var info_names = data.names;
    //console.log(info);
    
    // con esta funcion init(), lo que hago es poner el primer id en los graficos, despues tengo que agregar el listado.
    function init() {

        let info1 = info_samples[0];
        //console.log(info1.sample_values);

        //con esto, creo un array con que me diga OTU y el id
        let data_resume = info1.otu_ids.map(function(ids){
            return `OTU ${ids}`
        })

        //esto es para ir viendo que es lo voy imprimiendo
        //console.log(data_resume)

        //este es el primer grafico
        let trace1= {
            y: data_resume.slice(0,10).reverse(),
            x: info1.sample_values.slice(0,10).reverse(),
            type: "bar",
            orientation: "h" };
        let data1=[trace1];
        
        //con esto lo que hago es mostrar el grafico en la pagina.
        Plotly.newPlot("bar", data1);

        // esto es para el segundo grafico.
        let info2 = info_samples[0];
        console.log(info2.sample_value);
        let trace2={
            y: info2.sample_value,
            x: info2.otu_ids,
            text:info2.otu_ids,
            mode: "markers",
            marker:{
                size: info2.sample_values,
                color: info2.otu_ids
            }
        }

        let data2=[trace2];

        let layout2={
            title:"Size",
            xaxis:{title:`OTU ID ${info2.id}`},
            showlegend:false,
            height:600,
            width:1200

        }
        Plotly.newPlot("bubble", data2,layout2)

        let info3=info_metadata[0];
        let trace3 ={
            domain:{x:[0,1],y:[0,1]},
            value:info3.wfreq,
            title:{text:"Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number+delta",
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 1], title:{text:"0-1"},color:"white"},
                  { range: [1, 2], color: "gray" },
                  { range: [2, 3], color: "white" },
                  { range: [3, 4], color: "gray" },
                  { range: [4, 5], color: "white" },
                  { range: [5, 6], color: "gray" },
                  { range: [6, 7], color: "white" },
                  { range: [7, 8], color: "gray" },
                  { range: [8, 9], color: "white" }
                ],
            },
        }
        let data3 =[trace3]
        let layout3 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", data3, layout3);

        let info4=info_metadata[0];
        



    }
    init()
})



// d3.selectAll("#selDataset").on("change",updatePlotly);

// function updatePlotly(){

