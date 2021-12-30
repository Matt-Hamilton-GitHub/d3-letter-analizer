
var svgWidth = 800;
var svgHeight = 400;
var barHeight = 500;
var barPadding = 5;
var svg = d3.select("svg").attr('width',svgWidth).attr('height',svgHeight)



d3.select("#reset")
    .on("click", function() {
      d3.selectAll(".letter")
        .remove();
      d3.selectAll('text').remove()

      d3.select("#phrase")
          .text("");

      d3.select("#count")
          .text("");
    });

d3.select("form")
    .on("submit", function() {
      d3.event.preventDefault();
      var input = d3.select("input");
      var text = input.property("value");
      var data = getFrequencies(text)
      var barWidth = svgWidth / data.length - barPadding;

      var letters = svg
                      .selectAll('.letter')
                      .data(data, (d => d.character))

      console.log(getFrequencies(text));


      letters
          .classed("new", false)
        .exit()
        .remove();

      var letterEnter = letters
        .enter()
        .append("g")
          .classed("letter", true)
          .classed("new", true)

      letterEnter.append('rect');
      letterEnter.append('text');

        letterEnter.merge(letters)
          .select('rect')
          .attr("width", barWidth )
          .attr('height',(d => d.count *20))
          .attr('x', ((d,idx)=> (barWidth   + barPadding) * idx))
          .attr('y',(d=> svgHeight - d.count *20))

          letterEnter.merge(letters)
                      .select('text')
                      .attr('x',(d,idx)=> (barWidth   + barPadding) * idx + barWidth /2 )
                      .attr('y',(d=> svgHeight - d.count *20 - 10))
                      .attr('text-anchor','middle')
                      .text(d=>d.character)
          




      d3.select("#phrase")
          .text("Analysis of: " + text);

      d3.select("#count")
          .text("(New characters: " + letters.enter().nodes().length + ")");

      input.property("value", "");
    });

function getFrequencies(str) {
  var sorted = str.split("").sort();
  var data = [];
  for (var i = 0; i < sorted.length; i++) {
    var last = data[data.length - 1];
    if (last && last.character === sorted[i]) last.count++;
    else data.push({ character: sorted[i], count: 1 });
  }
  return data;
}



// // write your code here!

// var input = d3.select('input')
// var phrase = d3.select('#phrase')
// var countCh = d3.select('#count')
// var reset = d3.select('#reset')
// var letters = d3.select('#letters').selectAll('li')
// var uniqueChar = {}
// var counted = {}
// var userString = ''
// var userArray = {}


// input.on('input', function(){
//     d3.event.preventDefault()
//     userString = d3.event.target.value;
//     userArray =  userString.toLocaleLowerCase()
//     userArray = userArray.split('').filter(element => element  !== ' ' );
//     uniqueChar = [...new Set(userArray)]
//     console.log(userArray);
//     console.log(uniqueChar);

//     userArray.forEach(function(x){
//         counted[x] = countChar(x, userArray);
//  })


//     console.log(counted);

    
    
// })


// d3.select('#submit').on('click', function(){

//     d3.event.preventDefault()
//     phrase.style('font-weight','bolder')
//     .text(`Analisys of "${userString}"`)
//     countCh.text(`(New characters: ${uniqueChar.length})`)

//     letters.data(uniqueChar).enter()
//     .append('li')
//     .attr('class','letter')
//     .style('height', function(d){
//         return `${counted[d]*20}px`
//     })
//     .text((d,idx) => `${counted[d]} ${uniqueChar[idx].toUpperCase()}` )
//     .merge(letters)
//     .add.remove()

//     console.log(counted);



    
    
// })

// function countChar(chr, arr){
//     var count = 0;
//     arr.forEach(x => x === chr ? count+=1 : null)
    
//     return count
// }

// reset.on('click', function(){
//     input.property('value','')
//     uniqueChar = {}
//     counted = {}
//     userString = ''
//     userArray = {}
//     phrase.text("")
//     countCh.text('')
//     d3.selectAll('li').data(uniqueChar).exit().remove()
// })