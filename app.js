// write your code here!

var input = d3.select('input')
var phrase = d3.select('#phrase')
var countCh = d3.select('#count')
var reset = d3.select('#reset')
var uniqueChar = {}
var counted = {}
var userString = ''
var userArray = {}


input.on('input', function(){
    d3.event.preventDefault()
    userString = d3.event.target.value;
    userArray =  userString.toLocaleLowerCase()
    userArray = userArray.split('').filter(element => element  !== ' ' );
    var uniqueChar = [...new Set(userArray)]
    console.log(userArray);
    console.log(uniqueChar);

    userArray.forEach(function(x){
        counted[x] = countChar(x, userArray);
 })


    console.log(counted);

    
    
})


d3.select('#submit').on('click', function(){
    d3.event.preventDefault()

    phrase.style('font-weight','bolder')
    .text(`Analisys of "${userString}"`)

    countCh.text(`(New characters: ${uniqueChar.length})`)
    console.log(uniqueChar);

    
    
})

function countChar(chr, arr){
    var count = 0;
    arr.forEach(x => x === chr ? count+=1 : null)
    
    return count
}

reset.on('click', function(){
    input.property('value','')
    uniqueChar = {}
    counted = {}
    userString = ''
    userArray = {}
    phrase.text("")
    countCh.text('')
})