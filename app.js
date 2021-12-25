d3.select("#reset")
    .on("click", function() {
      d3.selectAll(".letter")
        .remove();

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

      var letters = d3.select("#letters")
                      .selectAll(".letter")
                      .data(getFrequencies(text), function(d) {
                        return d.character;
                      });

      letters
          .classed("new", false)
        .exit()
        .remove();

      letters
        .enter()
        .append("div")
          .classed("letter", true)
          .classed("new", true)
        .merge(letters)
          .style("width", "20px")
          .style("line-height", "20px")
          .style("margin-right", "5px")
          .style("height", function(d) {
            return d.count * 20 + "px";
          })
          .text(function(d) {
            return d.character;
          });

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