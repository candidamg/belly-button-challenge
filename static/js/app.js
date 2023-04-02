// store URL in variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
 // fetch the json data and console log it
 d3.json(url).then(function(data){
    console.log(data);

    let otuID = Object.values(data.samples[0]);
    
    let labels = [];
    let values = [];

    for (let i=0; i<10; i++){

        labels.push(otuID[1][i]);
        
        values.push(otuID[0][i]);
        
    };
    console.log(labels);
    console.log(values);
});



function init(){   

    let data = [{
        values: values,
        labels: labels,
        type: 'bar',
        mode: 'markers',
        marker: {size:15},
        text: hovers
    }];

    let layout = {
        height: 600,
        widht: 800
    };

    Plotly.newPlot('bar', data, layout);
};

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", barchart);

function barchart (){
      
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");

    let labels = [];
    let values = [];
    let hovers = [];
    let data = [];
    
    let otuID = Object.values(data.samples[0]);
    let allIDs = otuID[1];

    
    

    if(dataset === '1167'){
        data = labels[0];

    }
    else if (dataset == 2859){
        data = labels[1];
    }
    else if (dataset === 482){
        data = labels[2];
    }
    else if (dataset == '2264'){
        data = labels[3];
    }

    Plotly.restyle("bar", 'values', [data]);
    
};


init();

