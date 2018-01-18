
//Data for Neural network
// var myData = [
	// {"id": 0, "T": 97.0, "HR":  71, "S_true":  0, "S_pred":  0},
	// {"id": 1, "T": 99.0, "HR":  57, "S_true":  0, "S_pred":  0},
	// {"id": 2, "T": 98.6, "HR":  52, "S_true":  0, "S_pred":  0},
	// {"id": 3, "T": 99.1, "HR":  63, "S_true":  0, "S_pred":  0},
	// {"id": 4, "T": 99.9, "HR":  72, "S_true":  0, "S_pred":  0},
	// {"id": 5, "T": 98.9, "HR":  74, "S_true":  1, "S_pred":  0},
	// {"id": 6, "T": 99.0, "HR":  73, "S_true":  1, "S_pred":  0},
	// {"id": 7, "T": 99.2, "HR":  80, "S_true":  1, "S_pred":  0},
	// {"id": 8, "T": 98.5, "HR":  81, "S_true":  1, "S_pred":  0},
	// {"id": 9, "T": 99.0, "HR":  85, "S_true":  1, "S_pred":  0},			
	// ];

var myData = [
{"id": 0, "T": 2.781083600, "HR":  2.550537003, "S_true":  0, "S_pred":  0},
{"id": 1, "T": 1.465489372, "HR":  2.362125076, "S_true":  0, "S_pred":  0},
{"id": 2, "T": 3.396561688, "HR":  4.400293529, "S_true":  0, "S_pred":  0},
{"id": 3, "T": 1.388070190, "HR":  1.850220317, "S_true":  0, "S_pred":  0},
{"id": 4, "T": 3.064072320, "HR":  3.005305973, "S_true":  0, "S_pred":  0},
{"id": 5, "T": 7.627531214, "HR":  2.759262235, "S_true":  1, "S_pred":  0},
{"id": 6, "T": 5.332441248, "HR":  2.088626775, "S_true":  1, "S_pred":  0},
{"id": 7, "T": 6.922596716, "HR":  1.771063670, "S_true":  1, "S_pred":  0},
{"id": 8, "T": 8.675418651, "HR": -0.242068655, "S_true":  1, "S_pred":  0},
{"id": 9, "T": 7.673756466, "HR":  3.508563011, "S_true":  1, "S_pred":  0},			
];

// {'weights': [0.13436424411240122, 0.8474337369372327, 0.763774618976614]},
// {'weights': [0.2550690257394217, 0.49543508709194095]} 
// {'weights': [0.4494910647887381, 0.651592972722763]}
// newNet.Layers[0].Neurons[0].SetWeights([0.13436424411240122, 0.8474337369372327])
	
var myNeurons = [
  { "x":  0, "y": +1, "r": 50, "b":    0, "c" : "black"},
  { "x":  0, "y": -1, "r": 50, "b":    0, "c" : "black"},
  { "x":  1, "y": +1, "r": 50, "b":    1, "c" : "black"},
  { "x":  1, "y": -1, "r": 50, "b":    1, "c" : "black"},
  { "x":  2, "y":  0, "r": 50, "b":    1, "c" : "black"},
  ];
  
var myWeights = [
  { "fromNeuron":  0, "toNeuron": 2, "t": 1, "c" : "black"},
  { "fromNeuron":  0, "toNeuron": 3, "t": 1, "c" : "black"},
  { "fromNeuron":  1, "toNeuron": 2, "t": 1, "c" : "black"},
  { "fromNeuron":  1, "toNeuron": 3, "t": 1, "c" : "black"},
  { "fromNeuron":  2, "toNeuron": 4, "t": 1, "c" : "black"},
  { "fromNeuron":  3, "toNeuron": 4, "t": 1, "c" : "black"},
  ];

function forwardPropagate(inputData,wts){
	var networkOutput = [];
	
	for (n=0;n<inputData.length;n++) {
	
		//Hidden Layer
		var in3 = inputData[n].T*wts[0].t + inputData[n].HR*wts[2].t + myNeurons[2].b;
		var in4 = inputData[n].T*wts[1].t + inputData[n].HR*wts[3].t + myNeurons[3].b;
		var out3 = activate(in3);
		var out4 = activate(in4);
		
		//Output Layer
		var in5 = out3*wts[4].t+out4*wts[5].t + myNeurons[4].b;
		var out5 = activate(in5);
		
		myData[n].S_pred = out5;
		
		obj = {"predicted" : out5, "target": inputData[n].S_pred};
		networkOutput.push(obj); 
		
	}
	
	return networkOutput;
}

function activate(x){
	return 1/(1+Math.exp(-x));
}

// Forward propagate an input
// Calculate errors
// Back propagate errors

var newNet;

function trainNet(nIterations,learningRate){
	var n, i;
	for(n=0;n<nIterations;n++){
		
		var allError = 0;
		for (i=0;i<myData.length;i++){
			
			var dataIn  = [myData[i].T,myData[i].HR];
			var dataOut = myData[i].S_true;
			
			newNet.ForwardPropagate(dataIn);
			newNet.BackPropagateError(dataOut);
			newNet.UpdateNeuralNetWeights(learningRate,dataIn);
			
			allError = allError + 0.5*newNet.Layers[1].Neurons[0].GetLastError()**2;
		}
		
		newNet.Error.push( allError );
		// console.log('Iter ' + n);
	}
}

var margin = {mtop: 20, right: 30, bottom: 20, left: 30};
var width_Error  = 250-margin.left-margin.right;
var height_Error = 200-margin.mtop-margin.bottom;

var x_Err = d3.scaleLinear().domain([0, 10000])
							.range([0, width_Error]);
var y_Err = d3.scaleLinear().domain([3,0])
							.range([0,height_Error]);
var y_Wt = d3.scaleLinear().domain([8,-8])
							.range([0,height_Error]);
							
var errorLine = d3.line()
    .x(function(d,i) { return x_Err(i); })
    .y(function(d)   { return y_Err(d); });
	
	
var weightLine = d3.line()
    .x(function(d,i) { return x_Err(i); })
    .y(function(d)   { return y_Wt(d); });

var xAxis = d3.axisBottom(x_Err)
    .ticks(5);
	
var yAxis_W = d3.axisLeft(y_Wt)
    .ticks(5);	
	
var yAxis_E = d3.axisLeft(y_Err)
    .ticks(5);	
	
function visualizeNet(){
	
	var svg = d3.select('#Error').append('svg')
		.attr('id','ErrorOverTime')
		.style('width',width_Error+margin.left+margin.right)
		.style('height',height_Error+margin.mtop+margin.bottom)
	.append("g")
		.attr('transform',"translate(" + margin.left + "," + margin.mtop + ")");
		
	svg.append('path')
		.attr('class','line')
		.attr("d", errorLine(newNet.Error))
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5);
		// .attr("d", errorLine(newNet.Error));
		
	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_Error + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis_E);	
		
	var svgW = d3.select('#Error').append('svg')
		.attr('id','W_OverTime')
		.style('width',width_Error+margin.left+margin.right)
		.style('height',height_Error+margin.mtop+margin.bottom)
	.append("g")
		.attr('transform',"translate(" + margin.left + "," + margin.mtop + ")");
	
	svgW.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_Error + ")")
        .call(xAxis);

    svgW.append("g")
        .attr("class", "y axis")
        .call(yAxis_W);
	
	var i,j,k;

	for (i=0;i<newNet.Layers.length;i++){
		for (j=0;j<newNet.Layers[i].Neurons.length;j++){
			var lastWeight = newNet.Layers[i].Neurons[j].Weights.length;
			
			for (k=0;k<newNet.Layers[i].Neurons[j].Weights[0].length;k++){
				var col = newNet.Layers[i].Neurons[j].Weights.map(function(value,index) { return value[k]; });
				
				var newCol = [];
				for (idx = 0; idx < col.length; idx=idx+myData.length) {
				  newCol.push(col[idx]);
				}
				
				// console.log(newCol);
				svgW.append('path')
					.attr('class','line')
					.attr("d", weightLine(newCol))
					.attr("fill", "none")
					.attr("stroke", "steelblue")
					.attr("stroke-linejoin", "round")
					.attr("stroke-linecap", "round")
					.attr("stroke-width", 1.5);		
			}
			
		
		}
	}
	
}

function NeuralNet(neuronsPerLayer){
	
	//Constructor
	var L;
	this.Layers = [];
	this.Error = [];
	
	for (L=0; L < (neuronsPerLayer.length-1); L++){

		var neuronsInLayer 	 	= neuronsPerLayer[L];
		var neuronsInLayerAbove = neuronsPerLayer[L+1];

		this.Layers[L] = new NeuralLayer(neuronsInLayerAbove,neuronsInLayer);
	}
	
	//Forward propagate inputs through the Neural net
	this.ForwardPropagate = function(dataInputs){
		var L;
		for (L=0; L < this.Layers.length; L++){
			// console.log(dataInputs);
			this.Layers[L].ActivateLayer(dataInputs);
			this.Layers[L].TransferLayer();
			dataInputs = this.Layers[L].GetLayerOutputs();
		}

	}
		
	// Back propagate error through the Neural net	
	this.BackPropagateError = function(targetVal){
		var outputLayer = this.Layers.length-1;
		var currentLayer, currentNeuron, nNeurons;
		var Err;		
		
		//hidden layers backpropagation - Iterate backwards through layers
		for (currentLayer = outputLayer; currentLayer > -1; currentLayer--){
			
			//Get errors depending if current layer is output or hidden layer
			if (currentLayer===outputLayer){ Err = targetVal - this.Layers[outputLayer].GetLayerOutputs(); }
			else { Err = this.Layers[currentLayer + 1].BackPropagateFromLayer(); }
			
			nNeurons = this.Layers[currentLayer].Neurons.length;
			for (currentNeuron=0; currentNeuron < nNeurons ; currentNeuron++){
				if (!Array.isArray(Err)){ var neuronError = Err; }
				else{ var neuronError = Err[currentNeuron]; }

				// console.log('neuronError = ' + neuronError);
				
				this.Layers[currentLayer].Neurons[currentNeuron].Error.push(neuronError);
				this.Layers[currentLayer].Neurons[currentNeuron].Delta.push(
					neuronError*
					this.Layers[currentLayer].Neurons[currentNeuron].TransferDerivative() );
			}

		}
		
	}
	
	// Update Weights in the Neural Network
	this.UpdateNeuralNetWeights = function(learningRate,inputs){
		var n;

		for (n=0;n<this.Layers.length;n++){
			// console.log(inputs);
			this.Layers[n].UpdateLayerWeights(learningRate,inputs);
			inputs = this.Layers[n].GetLayerOutputs();
		}
	}
	
}

function NeuralLayer(nNeurons, nInputs){
	var n;
	this.Neurons = [];
	for (n=0;n<nNeurons;n++){
		this.Neurons[n] = new Neuron(nInputs);
	}
	
	this.ActivateLayer = function(inputsToLayer){
		// console.log('Activating Neurons Index 0 to Index ' + (this.Neurons.length-1));
		for (n=0;n<this.Neurons.length;n++){
			this.Neurons[n].ActivateNeuron(inputsToLayer);
		}
	}
	
	this.TransferLayer = function(){
		for (n=0;n<this.Neurons.length;n++){
			this.Neurons[n].TransferNeuron();
		}
	}
	
	this.GetLayerOutputs = function(){
		var layerOutputs = [];
		
		for (n=0;n<this.Neurons.length;n++){
			var lastOutput = this.Neurons[n].Output.length-1;
			
			layerOutputs[n] = (this.Neurons[n].Output[lastOutput]);
		}
		return layerOutputs;
	}
	
	this.BackPropagateFromLayer = function (){

		var neurons = this.Neurons;
		var Err = [];
		var i, n; 
		var wt, e;
		var latestUpdate;

		for (inputNeuron=0; inputNeuron < neurons[0].GetNumberOfInputNeurons(); inputNeuron++){
			
			Err[inputNeuron] = 0;

			for (n=0; n < neurons.length; n++){
				
				//console.log('Backpropagating. ' + 'inputNeuron = ' + inputNeuron + '. n = ' + n)
				latestUpdate = neurons[n].GetLatestUpdateIndex();
				wt = neurons[n].Weights[latestUpdate][inputNeuron];
				e  = neurons[n].Error[latestUpdate];

				//console.log('latestUpdate =  ' + latestUpdate + '. wt = ' + wt + '. e = ' + e)
				Err[inputNeuron] = Err[inputNeuron] + wt * e; 
			}
		}
		//console.log(Err)
		return Err;
	}

	this.UpdateLayerWeights = function(learningRate,inputs){
		for (n=0;n<this.Neurons.length;n++){
			var latestUpdate = this.Neurons[n].GetLatestUpdateIndex();
			// var latestUpdate  = this.Neurons[n].Delta.length-1;
			
			var D = this.Neurons[n].Delta[latestUpdate];
			var update = inputs.map(function(x){return x * learningRate * D;} )
			
			this.Neurons[n].Weights.push( this.Neurons[n].Weights[latestUpdate].map(function(a,i){return a+update[i];} ) );
			this.Neurons[n].Bias.push( this.Neurons[n].Bias[latestUpdate]+learningRate*D );
		}
	
	}
}

function Neuron(nInputs){
	
	var j;
	
	this.Weights = [];
	this.Weights = [Array(nInputs)]; 
	for (j=0;j<this.Weights[0].length;j++){
		this.Weights[0][j] = 1;
	}
	this.Bias = [];
	this.Bias.push(1);
	this.Activation = [];
	this.Output = [];
	this.Error = [];
	this.Delta = [];
	
	
	this.SetWeights = function(newWeights){
		var lastWeight = this.Weights.length -1;
		
		this.Weights[lastWeight] = newWeights;  
	}
	
	this.SetBias = function(newBias){
		var lastBias = this.Bias.length -1;
		
		this.Bias[lastBias] = newBias;  
	}

	this.GetNumberOfInputNeurons = function(){
		return this.Weights[0].length;
	}

	this.GetLatestUpdateIndex = function(){
		return this.Weights.length-1;
	}

	this.ActivateNeuron = function(inputs){
		var lastWeight = this.Weights.length -1;
		var lastBias   = this.Bias.length -1;
		
		var weights = this.Weights[lastWeight];
		var bias    = this.Bias[lastBias];
		var activation = dotProduct(inputs,weights)+bias;
		this.Activation.push(activation);
	}
	
	this.TransferNeuron =  function(){
		var lastActivation = this.Activation.length -1;
		
		this.Output.push(1/(1+Math.exp(-this.Activation[lastActivation])));
	}
	
	this.TransferDerivative = function(){
		var lastOutput = this.Output.length -1;
		
		return this.Output[lastOutput]*(1-this.Output[lastOutput]);
	}
	
	this.GetLastError = function(){
		var lastError = this.Error.length-1;
		return this.Error[lastError]
	}
}

function dotProduct(in1,in2){
	var theSum = 0;
	for (n=0;n<in1.length;n++){
		theSum = theSum + in1[n]*in2[n];
	}
	return theSum;
}

forwardPropagate(myData,myWeights);






		// //output Layer backpropagation
		// for (n=0;n<this.Layers[outputLayer].Neurons.length;n++){
			// var Err = targetVal - this.Layers[outputLayer].Neurons[n].Output;
			
			// this.Layers[outputLayer].Neurons[n].Error.push(Err);
			// this.Layers[outputLayer].Delta.push(Err*N.TransferDerivative());
		// }
		
			// this.GetLayerErrors = function(){
		// var Err=[];
		// var n;
		
		// for (n=0;n<this.Neurons.length;n++){
			// var lastError = this.Neurons[n].Error.length-1;
			
			// console.log('Neuron ' + n + '. Last error = ' + this.Neurons[n].Error[lastError]);
			// // console.log('Neuron ' + n + '. Errors ' + this.Neurons[n].Error);
			
			// Err.push( this.Neurons[n].Error[lastError] );
			// // Err.push( dotProduct(this.Neurons[n].Delta,this.Neurons[n].Weights) );	
		// }
		
		// return Err;
	// }
	
	// var myData = [
	// {"id": 0, "T": 2.781083600, "HR":  2.550537003, "S_true":  0, "S_pred":  0},
	// {"id": 1, "T": 1.465489372, "HR":  2.362125076, "S_true":  0, "S_pred":  0},
	// {"id": 2, "T": 3.396561688, "HR":  4.400293529, "S_true":  0, "S_pred":  0},
	// {"id": 3, "T": 1.388070190, "HR":  1.850220317, "S_true":  0, "S_pred":  0},
	// {"id": 4, "T": 3.064072320, "HR":  3.005305973, "S_true":  0, "S_pred":  0},
	// {"id": 5, "T": 7.627531214, "HR":  2.759262235, "S_true":  1, "S_pred":  0},
	// {"id": 6, "T": 5.332441248, "HR":  2.088626775, "S_true":  1, "S_pred":  0},
	// {"id": 7, "T": 6.922596716, "HR":  1.771063670, "S_true":  1, "S_pred":  0},
	// {"id": 8, "T": 8.675418651, "HR": -0.242068655, "S_true":  1, "S_pred":  0},
	// {"id": 9, "T": 7.673756466, "HR":  3.508563011, "S_true":  1, "S_pred":  0},			
	// ];	
	