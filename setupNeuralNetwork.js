
var myNeurons = [
  { "x":  0, "y": +1, "r": 50, "b":    0, "c" : "black"},
  { "x":  0, "y": -1, "r": 50, "b":    0, "c" : "black"},
  { "x":  1, "y": +1, "r": 50, "b": 1.56, "c" : "black"},
  { "x":  1, "y": -1, "r": 50, "b": 0.76, "c" : "black"},
  { "x":  2, "y":  0, "r": 50, "b": 3.66, "c" : "black"},
  ];
  
var myWeights = [
  { "fromNeuron":  0, "toNeuron": 2, "t": -2.1, "c" : "black"},
  { "fromNeuron":  0, "toNeuron": 3, "t": -1.8, "c" : "black"},
  { "fromNeuron":  1, "toNeuron": 2, "t": +2.7, "c" : "black"},
  { "fromNeuron":  1, "toNeuron": 3, "t": +2.6, "c" : "black"},
  { "fromNeuron":  2, "toNeuron": 4, "t": -6.8, "c" : "black"},
  { "fromNeuron":  3, "toNeuron": 4, "t": -1.0, "c" : "black"},
  ];

function forwardPropagate(d,wts){
	var networkOutput = [];
	//
	for (n=0;n<d.length;n++) {
	
		//Hidden Layer
		var in3 = d[n].x1*wts[0].t + d[n].x2*wts[2].t + myNeurons[2].b;
		var in4 = d[n].x1*wts[1].t + d[n].x2*wts[3].t + myNeurons[3].b;
		var out3 = activate(in3);
		var out4 = activate(in4);
		
		//Output Layer
		var in5 = out3*wts[4].t+out4*wts[5].t + myNeurons[4].b;
		var out5 = activate(in5);
		
		<!-- console.log(in5); -->
		<!-- console.log(out5); -->
		myData[n].y_pred = out5;
		
		obj = {"predicted" : out5, "target": d[n].y};
		networkOutput.push(obj); 
		
	}
	
	return networkOutput;
}

function activate(x){
	return 1/(1+Math.exp(-x));
}

forwardPropagate(myData,myWeights);