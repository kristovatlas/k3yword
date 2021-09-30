//https://gist.github.com/StevenACoffman/a5f6f682d94e38ed804182dc2693ed4b
//https://github.com/codebox/homoglyph/blob/master/raw_data/chars.txt
var homoglyphs_readable = {
  a: ['а'],
  c: ['с'],
  d: ['ԁ'],
  h: ['һ'],
  i: ['і'],
  j: ['ј'],
  n: ['ո'],
  o: ['о','ο','օ'],
  p: ['р'],
  t: ['𝐭'],
  u: ['ս'],
  v: ['ν','ѵ'],
  x: ['х','ҳ'],
  y: ['у'],
  A: ['Α'],
  B: ['Β'],
  E: ['Ε'],
  H: ['Η'],
  I: ['Ι'],
  O: ['Ο'],
  P: ['Ρ'],
  N: ['Ν'],
  X: ['Χ'],
  Z: ['Ζ']
}
var homoglyphs_extended = {
  a: ['а','ạ','ą','ä','à','á','ą'],
  c: ['с','ƈ','ċ'],
  d: ['ԁ','ɗ'],
  e: ['ẹ','ė','é','è','е','ҽ','℮','ℯ','ⅇ'],
  g: ['ġ'],
  h: ['һ'],
  i: ['і','í','ï','1','Ι'], //ІӀ׀וןا١۱ߊᛁℐℑℓⅠⅼ∣⏽Ⲓⵏꓲﺍﺎ１Ｉｌ￨𐊊𐌉𐌠𖼨𝐈𝐥𝐼𝑙𝑰𝒍𝓁𝓘𝓵𝔩𝕀𝕝𝕴𝖑𝖨𝗅𝗜𝗹𝘐𝘭𝙄𝙡𝙸𝚕𝚰𝛪𝜤𝝞𝞘𝟏𝟙𝟣𝟭𝟷𞣇
  j: ['ј','ʝ'],
  k: ['κ'],
  l: ['ӏ','ḷ'],
  n: ['ո'],
  o: ['о','ο','օ','ȯ','ọ','ỏ','ơ','ó','ò','ö','0','σ','߀','०','০','੦','૦'],
//ଠ୦௦ం౦ಂ೦ംഠ൦ං๐໐ဝ၀ჿዐᴏᴑℴⲞⲟⵔ〇ꓳＯｏ𐊒𐊫𐐄𐐬𐓂𐓪𐔖𑓐𑢵𑣈𑣗𑣠𝐎𝐨𝑂𝑜𝑶𝒐𝒪𝓞𝓸𝔒𝔬𝕆𝕠𝕺𝖔𝖮𝗈𝗢𝗼𝘖𝘰𝙊𝙤𝙾𝚘𝚶𝛐𝛔𝛰𝜊𝜎𝜪𝝄𝝈𝝤𝝾𝞂𝞞𝞸𝞼𝟎𝟘𝟢𝟬𝟶
  p: ['р'],
  q: ['զ'],
  s: ['ʂ'],
  t: ['ｔ','𝐭','𝑡','𝒕','𝓉','𝓽','𝔱','𝖙','𝗍','𝘁','𝘵','𝙩','𝚝'],
  u: ['υ','ս','ü','ú','ù'],
  v: ['ν','ѵ'],
  x: ['х','ҳ'],
  y: ['у','ý'],
  z: ['ʐ','ż']
}

//Get random element from this array
function randomElt(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index]
}

function convert(str, readability, all) {
  var new_str = '';
  var replacements = 0;
  var variations = 1;
  var lookup = homoglyphs_readable;
  if (readability == 'low') {
    lookup = homoglyphs_extended;
  }
  for (let char of str) {
    if (lookup[char]) {
      var numHomoglyphs = lookup[char].length;
      variations = variations * numHomoglyphs;
      new_str = new_str + randomElt(lookup[char]);
      replacements = replacements + 1;
    } else {
      new_str = new_str + char;
    }
  }
  return [new_str, replacements, hash(new_str), variations];
}

function hash (str) {
  return str.split("").reduce(function(a, b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function ui_convert() {
  var input = document.getElementById('input').value;

  var readability = 'high'; //default
  if (document.getElementsByName('readability')[1].checked) {
    readability = 'low';
  }

  var all = true;
  /*
  if (document.getElementsByName('convert-which')[1].checked) {
    all = false;
  }*/
  var converted = convert(input, readability, all);
  console.log(converted, readability, all);
  document.getElementById('output').innerHTML = converted[0];
  document.getElementById('replacements').innerHTML = converted[1];
  document.getElementById('hash').innerHTML = converted[2];
  document.getElementById('variations').innerHTML = converted[3];
}

console.log(convert('test'));
