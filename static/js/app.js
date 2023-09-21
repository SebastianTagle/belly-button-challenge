//We need to get the information with the url. So first, i define the url variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//then, i create three variables to storage the information outside. with this, i can create the chart functions
var info_samples=[];
var info_metadata=[];
var info_ids=[];

// then, i get the information from the url with D3 library
d3.json(url).then((data) => {
    //console.log("ejemplo: ",data);

    info_samples = data.samples;
    info_metadata = data.metadata;
    info_ids = data.names;
    
    console.log("y:",info_samples);

    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.selectAll("option").data(info_ids).enter().append("option").text(id=>id).attr("value",id=>id)

    // let info_x = returndatasamples("940");
    // console.log("x:",info_x)

    // con esta funcion init(), lo que hago es poner el primer id en los graficos, despues tengo que agregar el listado.
    function init() {       
        bargraph("940");
        bubblegraph("940");
        gaugegraph("940");
        add_panelbody("940");
    }

    //dropdownMenu.on("change", getdata);  
    init()   

})

function optionChanged(id){
    return getdata(id);
 }

function getdata(value){

    value=d3.select("#selDataset").property("value");
    bargraph(value);
    bubblegraph(value);
    gaugegraph(value);
    d3.selectAll(".panel-body>p").remove()
    add_panelbody(value);
}

function returndatasamples (sample_id) {
    for (i=0;i<info_samples.length;i++){
        if (sample_id == info_samples[i].id){
            return info_samples[i]
        }
    }
}

function returnmetadata (sample_id) {
    for (i=0;i<info_metadata.length;i++){
        if (sample_id == info_metadata[i].id){
            return info_metadata[i]
        }
    }
}

function bargraph (id){
    let bar_data = returndatasamples(id);
    let data_resume = bar_data.otu_ids.map(function(ids){
        return `OTU ${ids}`
    })

    //este es el primer grafico
    let trace1= {
        y: data_resume.slice(0,10).reverse(),
        x: bar_data.sample_values.slice(0,10).reverse(),
        type: "bar",
        orientation: "h" };
    let data1=[trace1];
    
    let layout ={
        title:"Top 10 OTUs"
    }

    //con esto lo que hago es mostrar el grafico en la pagina.
    Plotly.newPlot("bar", data1,layout);
}

function bubblegraph(id){
    let bubble_data = returndatasamples(id);
    let trace2={
        y: bubble_data.sample_values,
        x: bubble_data.otu_ids,
        text:bubble_data.otu_labels,
        mode: "markers",
        marker:{
            size: bubble_data.sample_values,
            color: bubble_data.otu_ids
        }
    }

    let data2=[trace2];

    let layout2={
        title:{text:`Subject ID ${bubble_data.id}`},
        xaxis:{title:"OTU Ids"},
        showlegend:false,
        height:600,
        width:1200

    }
    Plotly.newPlot("bubble", data2,layout2)
}

function gaugegraph (id){
    let gauge_data = returnmetadata(id);
    let trace3 ={
        domain:{x:[0,1],y:[0,1]},
        value:gauge_data.wfreq,
        title:{text:"Belly Button Washing Frequency"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], text:"0-1",color:"white"},
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
    let layout3 = {width: 600, height: 600, margin: { t: 1, b: 1 } };
    Plotly.newPlot("gauge", data3, layout3);
}

function add_panelbody (id){
    let panelbody_data= returnmetadata(id);
    d3.select(".panel-body").append("p").text(`Id: ${panelbody_data.id}`);
    d3.select(".panel-body").append("p").text(`Ethnicity: ${panelbody_data.ethnicity}`);
    d3.select(".panel-body").append("p").text(`Gender: ${panelbody_data.gender}`);
    d3.select(".panel-body").append("p").text(`Age: ${panelbody_data.age}`);
    d3.select(".panel-body").append("p").text(`Location: ${panelbody_data.location}`);
    d3.select(".panel-body").append("p").text(`bbtype: ${panelbody_data.bbtype}`);
    d3.select(".panel-body").append("p").text(`wfreq: ${panelbody_data.wfreq}`);
}