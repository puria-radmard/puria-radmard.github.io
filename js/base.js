const $=s=>document.querySelector(s);
const stage=$('#stage'),field=$('#field'),panel=$('#panel');
const FW=2600,FH=1700,CX=1300,CY=850;
const SECTIONS={substack:"substack",lesswrong:"lesswrong",papers:"papers",contact:"contact"};
let ITEMS={substack:[],lesswrong:[],papers:[],contact:[]},current={sec:null,i:null};
