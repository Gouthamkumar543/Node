const { log } = require("console");
const path = require("path")
// console.log(path);

//Joins the comple string into path
const Join = path.join("Goutham", "Node", "Day6", "index.js")
console.log(Join);

//Joins these strings with the absolute path or give complete path from c drive
const Resolve = path.resolve("Goutham", "Node", "Day6", "index.js")
console.log(Resolve);

//Returns the file name of the given path
const BaseName = path.basename("../CurdOperations/index.js")
console.log(BaseName);
//If you dont want ext give the ext like .html, .js, .css in second arg
const BaseNameWithoutExt = path.basename("../Day3/index.js", ".js")
console.log(BaseNameWithoutExt);

//Returnd the entire path without file name which given in the arg
const DirName = path.dirname("../../React/product_router_dom/src/App.js")
console.log(DirName);

//Give the name of the ext of the path
const ExtName = path.extname("../Day3/index.js")
console.log(ExtName);
//Want only ext name without dot
const ExtSplit = ExtName.split("")
const ExtSplit2 = ExtName.split(".")
console.log(ExtSplit2);

//Give the details of the path like dir,base,ext, file name
const Parse = path.parse("../CurdOperationsJsonFile/index.js")
console.log(Parse);

//Returns True or False of the path
const IsAbsolute = path.isAbsolute("../../React/forms/src/App.js")
console.log(IsAbsolute);
const IsAbsolute2 = path.isAbsolute("C:/Users/gouth/Desktop/Goutham/Node/Day3/")
console.log(IsAbsolute2);

//Covert the entire sub path to single path
const Format = path.format({
    root: '',
    dir: '../../React/react_bootstrap/src',
    base: 'App.js',
    ext: '.js',
    name: 'App'
})
console.log(Format);

//give the relative path more steps to reach the file
const Relative = path.relative("../Day1/index.js","../../HTML/Day-1/Resume.html")
console.log(Relative);

//Fix the path
const Normalize = path.normalize("../Day1////////Data.js")
console.log((Normalize));
