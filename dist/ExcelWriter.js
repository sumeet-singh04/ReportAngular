/**
 * 
 */



function clickCheck()
{
var file = {
        worksheets: [[]], // worksheets has one empty worksheet (array)
        creator: 'John Smith', created: new Date('8/16/2012'),
        lastModifiedBy: 'Larry Jones', modified: new Date(),
        activeWorksheet: 0
    }, w = file.worksheets[0];
w.name = "check";

w.data = [
          ['a','b'],
          ['c','d'],
          ];
/*var r = w.push([]) - 1;
w[r].push("check");
r = w.push([]) - 1;
w[r].push("check");*/
window.location = xlsx(file).href();
}