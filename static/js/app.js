// store URL in variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){ 

    // fetch the json data and console log it
    d3.json(url).then(function(alldata){

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        let names = alldata.names;
        console.log(names);

        // Add  samples to dropdown menu
        names.forEach(function(id){
            
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });
        
        let value = names[0];
        barchart(value);
    });
};
init();

function barchart(passedvalue){

    d3.json(url).then(function(alldata){

        let samples = alldata.samples;
        console.log(samples);

        let id = samples.filter(take=>take.id == passedvalue);
        
        let subject = id[0];

        let values = subject.sample_values;
        console.log(values);
        let labels = subject.otu_ids;
        console.log(labels);
        let hovertext  = subject.otu_labels;
        console.log(hovertext);

        let x_values = values.slice(0,10);
        console.log(x_values);
        let y_values = labels.slice(0,10).map(id => `OTU ${id}`);
        console.log(y_values);
        let hovers = hovertext.slice(0,10);
        console.log(hovers);
        
        let data = [{
            x: x_values.reverse(),
            y: y_values.reverse(),
            type: 'bar',
            // mode: 'markers',
            // marker: {size:15},
            text: hovers.reverse(),
            orientation: 'h'
        }];
    
        let layout = {
            title: 'Top 10 OTUs'
        };
        Plotly.newPlot('bar', data, layout);
    });
};