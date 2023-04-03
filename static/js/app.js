// store URL in variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){ 

    // fetch the json data and console log it
    d3.json(url).then(function(alldata){

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // getting all names from json
        let names = alldata.names;

        // getting dropdown 
        names.forEach(function(id){
            dropdownMenu.append("option").text(id).property("value",id);
        });
        
        // pass first subject and calling barchart function
        barchart(names[0]);
        bubblechart(names[0]);
    });
};

// function when the subject id changes
function optionChanged(passedvalue) {
    barchart(passedvalue);
    bubblechart(passedvalue);
};

function barchart(passedvalue){

    // json data
    d3.json(url).then(function(alldata){

        // retrieve all samples data
        let samples = alldata.samples;
        let id = samples.filter(take=>take.id == passedvalue);

        // get data for chart 
        let values = id[0].sample_values;
        let labels = id[0].otu_ids;
        let hovertext = id[0].otu_labels;

        // select first 10 elements from data
        let x_values = values.slice(0,10).reverse();
        let y_values = labels.slice(0,10).map(id => `OTU ${id}`).reverse(); // map data to name the y-values as OTU
        let hovers = hovertext.slice(0,10).reverse();
        
        // data for chart
        let data = [{
            type: 'bar',
            x: x_values,
            y: y_values,
            text: hovers,
            orientation: 'h'
        }];
    
        // layout for chart
        let layout = {
            title: 'Bar Chart',
            height: 500,
            width: 400            
        };

        // display bar chart
        Plotly.newPlot('bar', data, layout);
    });
};

function bubblechart(passedvalue){

    // json data
    d3.json(url).then(function(alldata){

        // retrieve all samples data
        let samples = alldata.samples;
        let id = samples.filter(take=>take.id == passedvalue);

        // get data for chart
        let x_values = id[0].otu_ids; 
        let y_values = id[0].sample_values;
        let m_size = id[0].sample_values;
        let m_color = id[0].otu_ids;
        let text = id[0].otu_labels;

        let data = [{
            x: x_values,
            y: y_values,
            text: text,
            mode: 'markers',
            marker:{
                color: m_color,
                colorscale: 'Earth',
                size: m_size
            }
        }];

        let layout = {
            title: 'Bubble Chart'
        };

        // display bubble chart
        Plotly.newPlot('bubble', data, layout);
    });
};

init();

//REFERENCES:
// colorscale for bubble chart: https://plotly.com/javascript/colorscales/