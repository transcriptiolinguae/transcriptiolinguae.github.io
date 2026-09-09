export function validateOrReturnOriginal(originalWord, mappedString) {

  const allowedMappings = {  //  Creates a constant object. Think of it as a dictionary of legal pronunciations. The keys are letter sequences. The values are all IPA symbols those letters are allowed to represent. Example: a: ['a', 'ˈa', 'ˌa'], means The grapheme a may only correspond to a ˈa ˌa If it ever maps to i u ʃ ŋ the validator rejects the word. Example ci: ['tʃ', 'ˈtʃ'], means ci → tʃ is allowed. But ci → k would be rejected.
    ha: ['a', 'ˈa', 'ˌa', 'ˈaː', 'ˌaː', 'aː'],
    a: ['a', 'ˈa', 'ˌa', 'ˈaː', 'ˌaː', 'aː'],
    à: ['a', 'ˈa', 'ˌa', 'ˈaː', 'ˌaː', 'aː'],
    á: ['a', 'ˈa', 'ˌa', 'ˈaː', 'ˌaː', 'aː'],  
    bb: ['ˈbː', 'ˌbː', 'bː'],
    b: ['b', 'ˈb', 'ˌb', 'ˈbː', 'ˌbː', 'bː'],
    cci: ['ˈtʃː', 'ˌtʃː', 'tʃː'],
    cch: ['ˈkː', 'ˌkː', 'kː'],
    cc: ['ˈkː', 'ˌkː', 'kː', 'ˈtʃː', 'ˌtʃː', 'tʃː'],    
    ch: ['k', 'ˈk', 'ˌk', 'ˈkː', 'ˌkː', 'kː'],
    ci: ['tʃ', 'ˈtʃ', 'ˌtʃ', 'ˈtʃː', 'ˌtʃː', 'tʃː'],
    cq: ['ˈkː', 'ˌkː', 'kː'], 
    c: ['k', 'ˈk', 'ˌk', 'ˈkː', 'ˌkː', 'kː', 'tʃ', 'ˈtʃ', 'ˌtʃ', 'ˈtʃː', 'ˌtʃː', 'tʃː'],
    dd: ['ˈdː', 'ˌdː', 'dː'],
    d: ['d', 'ˈd', 'ˌd', 'ˈdː', 'ˌdː', 'dː'],
    e: ['e', 'ˈe', 'ˌe', 'ˈeː', 'ˌeː', 'eː', 'ɛ', 'ˈɛ', 'ˌɛ', 'ˈɛː', 'ˌɛː', 'ɛː'],
    è: ['e', 'ˈe', 'ˌe', 'ˈeː', 'ˌeː', 'eː', 'ɛ', 'ˈɛ', 'ˌɛ', 'ˈɛː', 'ˌɛː', 'ɛː'],
    é: ['e', 'ˈe', 'ˌe', 'ˈeː', 'ˌeː', 'eː', 'ɛ', 'ˈɛ', 'ˌɛ', 'ˈɛː', 'ˌɛː', 'ɛː'],
    ff: ['ˈfː', 'ˌfː', 'fː'],
    f: ['f', 'ˈf', 'ˌf', 'ˈfː', 'ˌfː', 'fː'],
    gli: ['ʎ', 'ˈʎ', 'ˌʎ', 'ˈʎː', 'ˌʎː', 'ʎː'],
    ggi: ['ˈdʒː', 'ˌdʒː', 'dʒː'],
    ggh: ['ˈgː', 'ˌgː', 'gː'],
    gg: ['ˈdʒː', 'ˌdʒː', 'dʒː', 'ˈgː', 'ˌgː', 'gː'],
    gh: ['g', 'ˈg', 'ˌg', 'ˈgː', 'ˌgː', 'gː'],
    gi: ['dʒ', 'ˈdʒ', 'ˌdʒ', 'ˈdʒː', 'ˌdʒː', 'dʒː'],
    gn: ['ɲ', 'ˈɲ', 'ˌɲ', 'ˈɲː', 'ˌɲː', 'ɲː'],
    gl: ['ʎ', 'ˈʎ', 'ˌʎ', 'ˈʎː', 'ˌʎː', 'ʎː'],
    g: ['g', 'ˈg', 'ˌg', 'ˈgː', 'ˌgː', 'gː', 'dʒ', 'ˈdʒ', 'ˌdʒ', 'ˈdʒː', 'ˌdʒː', 'dʒː'],
    i: ['i', 'ˈi', 'ˌi', 'ˈiː', 'ˌiː', 'iː', 'j', 'ˈj', 'ˌj', 'ˈjː', 'ˌjː', 'jː'],
    ì: ['i', 'ˈi', 'ˌi', 'ˈiː', 'ˌiː', 'iː', 'j', 'ˈj', 'ˌj', 'ˈjː', 'ˌjː', 'jː'],
    í: ['i', 'ˈi', 'ˌi', 'ˈiː', 'ˌiː', 'iː', 'j', 'ˈj', 'ˌj', 'ˈjː', 'ˌjː', 'jː'],
    ll: ['ˈlː', 'ˌlː', 'lː'],
    l: ['l', 'ˈl', 'ˌl', 'ˈlː', 'ˌlː', 'lː'],
    mm: ['ˈmː', 'ˌmː', 'mː'],
    m: ['m', 'ˈm', 'ˌm', 'ˈmː', 'ˌmː', 'mː'],
    nn: ['ˈnː', 'ˌnː', 'nː'],
    n: ['n', 'ˈn', 'ˌn', 'ˈnː', 'ˌnː', 'nː', 'ŋ', 'ˈŋ', 'ˌŋ', 'ˈŋː', 'ˌŋː', 'ŋː'],
    ho: ['o', 'ˈo', 'ˌo', 'ˈoː', 'ˌoː', 'oː', 'ɔ', 'ˈɔ', 'ˌɔ', 'ˈɔː', 'ˌɔː', 'ɔː'],
    o: ['o', 'ˈo', 'ˌo', 'ˈoː', 'ˌoː', 'oː', 'ɔ', 'ˈɔ', 'ˌɔ', 'ˈɔː', 'ˌɔː', 'ɔː'],
    ò: ['o', 'ˈo', 'ˌo', 'ˈoː', 'ˌoː', 'oː', 'ɔ', 'ˈɔ', 'ˌɔ', 'ˈɔː', 'ˌɔː', 'ɔː'],
    ó: ['o', 'ˈo', 'ˌo', 'ˈoː', 'ˌoː', 'oː', 'ɔ', 'ˈɔ', 'ˌɔ', 'ˈɔː', 'ˌɔː', 'ɔː'],
    pp: ['ˈpː', 'ˌpː', 'pː'],
    p: ['p', 'ˈp', 'ˌp', 'ˈpː', 'ˌpː', 'pː'],
    q: ['k', 'ˈk', 'ˌk', 'ˈkː', 'ˌkː', 'kː'],
    rr: ['ˈrː', 'ˌrː', 'rː'],
    r: ['r', 'ˈr', 'ˌr', 'ˈrː', 'ˌrː', 'rː'],
    sci: ['ʃ', 'ˈʃ', 'ˌʃ', 'ˈʃː', 'ˌʃː', 'ʃː'],
    sc: ['ʃ', 'ˈʃ', 'ˌʃ', 'ˈʃː', 'ˌʃː', 'ʃː'],
    ss: ['ˈsː', 'ˌsː', 'sː'],
    s: ['s', 'ˈs', 'ˌs', 'ˈsː', 'ˌsː', 'sː', 'z', 'ˈz', 'ˌz', 'ˈzː', 'ˌzː', 'zː'],
    tt: ['ˈtː', 'ˌtː', 'tː'],
    t: ['t', 'ˈt', 'ˌt', 'ˈtː', 'ˌtː', 'tː'],
    u: ['u', 'ˈu', 'ˌu', 'ˈuː', 'ˌuː', 'uː', 'w', 'ˈw', 'ˌw', 'ˈwː', 'ˌwː', 'wː'],
    ù: ['u', 'ˈu', 'ˌu', 'ˈuː', 'ˌuː', 'uː', 'w', 'ˈw', 'ˌw', 'ˈwː', 'ˌwː', 'wː'],
    ú: ['u', 'ˈu', 'ˌu', 'ˈuː', 'ˌuː', 'uː', 'w', 'ˈw', 'ˌw', 'ˈwː', 'ˌwː', 'wː'],
    vv: ['ˈvː', 'ˌvː', 'vː'],
    v: ['v', 'ˈv', 'ˌv', 'ˈvː', 'ˌvː', 'vː'],
    zz: ['ˈdzː', 'ˌdzː', 'dzː', 'ˈtsː', 'ˌtsː', 'tsː'],
    z: ['dz', 'ˈdz', 'ˌdz', 'ˈdzː', 'ˌdzː', 'dzː', 'ts', 'ˈts', 'ˌts', 'ˈtsː', 'ˌtsː', 'tsː']
  };

  const regex = /([\p{L}]+)\(([^()]*)\)/gu;  //  This creates a regular expression. Its job is to find every letters(IPA) pair inside v(v)o(o)l(l)o(o)n(n)t(t)à(ˈa) Let's dissect it. ( Starts capture group 1. [\p{L}] Means any Unicode letter. Not only A-Z but also à é ñ ö č + Means one or more. So g works. gli also works. gn also works. First capture group ([\p{L}]+) captures g gli gn bb sci Everything before the parentheses. \( Matches ( literally. Second capture group ([^()]*) means Match everything except ( ) zero or more times. That becomes the IPA. Example g(ʎ) captures ʎ Example à(ˈa) captures ˈa \) Matches ) Flags g Global. Continue finding every match. u Unicode mode. Necessary because of accented letters.

  let match;  //  Creates a variable. Initially undefined Later it will hold each regex match.

  while ((match = regex.exec(mappedString)) !== null) {  //  This repeatedly searches the string. Suppose mappedString = v(v)o(o)l(l)o(o)n(n)t(t)à(ˈa) Iteration 1 match ↓ v(v) Iteration 2 o(o) Iteration 3 l(l) Iteration 4 o(o) Iteration 5 n(n) Iteration 6 t(t) Iteration 7 à(ˈa) When there are no more matches, regex.exec() returns null and the loop ends.
    const letters = match[1].toLowerCase();  //  Remember capture group 1 contains letters Examples SCI ↓ sci because of toLowerCase() This ensures SCI Sci sci all use the same lookup.
    const ipa = match[2];  //  Gets capture group 2. Examples ˈa tʃ ŋ ʎ dʒ
    
    // NEW: empty mapping
    if (ipa.trim() === '') return originalWord;  //  Suppose mapping produced o() Then ipa = "" or "   " That means the mapper couldn't assign a sound. The function immediately rejects the mapping. Returns originalWord instead.
    
    // letter sequence not in allowed list → return original
    if (!allowedMappings[letters]) return originalWord;  //  letters = xyz There is no allowedMappings["xyz"] Therefore the validator refuses to trust it. Returns originalWord

    // ipa value not allowed → return original
    if (!allowedMappings[letters].includes(ipa)) return originalWord;  //  This is the core of the validator. Suppose letters = ci Allowed list [ tʃ, ˈtʃ ] If ipa = tʃ ✔ accepted. If ipa = k Rejected. Returns originalWord Another example Suppose letters = gn Allowed ɲ ɲː ˈɲ ˈɲː If IPA is n then includes("n") is false The word is rejected.
  }  //  If every grapheme passed all three tests the loop finishes normally. Nothing has been rejected.

  return mappedString;  //  If execution reaches this line, every grapheme-to-IPA pair was considered valid. The function returns the original aligned mapping unchanged. For example: Input: c(tʃ)i(a)a(o)o() ↓ Validated successfully ↓ Returned: c(tʃ)i(a)a(o)o() If any single pair had failed—for example, ci(k) or gn(n)—the function would have exited earlier with: return originalWord; So this final line is only reached when the entire mapping passes validation.



  
}



export function applyG2PMapping(text, ipa) {

   ipa = ipa
    .replace(/rɾ/g, 'rː')
    .replace(/kk/g, 'kː')
    .replace(/ɲɲ/g, 'ɲː')
    .replace(/oo/g, 'oː')
    .replace(/tt/g, 't')
    .replace(/dd/g, 'd')
    .replace(/ɾ/g, 'r')
    .replace(/ɪ/g, 'i')
    .replace(/ʊ/g, 'u')
    .replace(/ɡ/g, 'g');
  
  const result = [];
  let ipaIndex = 0;
  let i = 0;
  const lowerText = text.toLowerCase();

  // Predefined mappings for G2P
  const g2pMappings = {
    "bb": "bː",
    "dd": "dː",
    "ff": "fː",
    "ll": "lː", 
    "mm": "mː",
    "nn": "nː",   
    "pp": "pː",
    "qq": "qq",  
    "rr": "rː",
    "ss": "sː",
    "tt": "tː",
    "vv": "vː", 
  };

 

  // Process the word-by-word logic
  while (i < text.length && ipaIndex < ipa.length) {
    const letter = text[i];
    let ipaChar = ipa[ipaIndex];
  
    // ★ FIX: keep apostrophes exactly as in original text
    if (letter === "'") {
        result.push("'");
        i++;
        continue;
    }


    
 // Check for predefined G2P mapping (e.g., bb -> bː, cc -> kː, etc.)
    const mappedIpa = g2pMappings[lowerText.slice(i, i + 2)];
    if (mappedIpa) {
      result.push(`${text.slice(i, i + 2)}(${mappedIpa})`);
      i += 2;  // Skip the next letter, since we just processed 2 chars
      ipaIndex += mappedIpa.length;  // Move IPA index forward by the length of mapped IPA
      continue;
    }
    

    

    
   // i(ˈiː) 
    
       if (lowerText[i] === 'i') {
     
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'i' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈi)`);
          i += 1; 
          ipaIndex += 3; 
          continue; 
        }
      }
      


  

     // a(ˈaː)
    
       if (lowerText[i] === 'a') {
         
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'a' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈa)`);
          i += 1; 
          ipaIndex += 3; 
          continue; 
        }
      }
  
     // e(ˈeː)
    
       if (lowerText[i] === 'e') {
     
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'e' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈe)`);
          i += 1; 
          ipaIndex += 3; 
          continue; 
        }
      }

     //   é(e)
    
       if (lowerText[i] === "é") {
     
      if (ipa[ipaIndex] === 'e') {
          result.push(`${text[i]}(e)`);
          i += 1; 
          ipaIndex += 1; 
          continue; 
        }
      }

         // e(ˈɛː)
    
       if (lowerText[i] === 'e') {
    
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ɛ' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈɛ)`);
          i += 1;
          ipaIndex += 3; 
          continue; 
        }
      }

    



                 // ' any (ˈɛː)
    
       if (lowerText[i] === "'" && /[a-z\u00C0-\u017F]/i.test(lowerText[i + 1])) {
    
              const ipaRegex = /[a-z\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u1D00-\u1DBF\uA700-\uA71F]/i;

      if (ipa[ipaIndex] === 'ˈ' && ipaRegex.test(ipa[ipaIndex]) && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i+1]}(ˈ${ipa[ipaIndex + 1]})`);
          i += 2; 
          ipaIndex += 3;
          continue;
        }}
    
          if (lowerText[i] === "'" && /[a-z]/i.test(lowerText[i + 1])) {
    
                 const ipaRegex = /[a-z\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u1D00-\u1DBF\uA700-\uA71F]/i;

      if (ipa[ipaIndex] === 'ˈ' && ipaRegex.test(ipa[ipaIndex])) {
          result.push(`${text[i+1]}(ˈ${ipa[ipaIndex + 1]})`);
          i += 2; 
          ipaIndex += 2; 
          continue; 
      }}


             if (lowerText[i] === "'" && /[a-z]/i.test(lowerText[i + 1])) {
     
                 const ipaRegex = /[a-z\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u1D00-\u1DBF\uA700-\uA71F]/i;

      if (ipa[ipaIndex] === 'ˌ' && ipaRegex.test(ipa[ipaIndex])) {
          result.push(`${text[i+1]}(ˌ${ipa[ipaIndex + 1]})`);
          i += 2; 
          ipaIndex += 2;
          continue; 
      }}


  




              if (lowerText[i] === "'" && /[a-z\u00C0-\u017F]/i.test(lowerText[i + 1])) {
      
      const ipaRegex = /[a-z\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u1D00-\u1DBF\uA700-\uA71F]/i;

      if (ipaRegex.test(ipa[ipaIndex])) {
          result.push(`'${text[i+1]}(${ipa[ipaIndex]})`);
          i += 2; 
          ipaIndex += 1; 
          continue; 
      }}
       
       


         // o(ˈoː)
    
       if (lowerText[i] === 'o') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'o' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈo)`);
          i += 1; 
          ipaIndex += 3; 
          continue;
        }
      }


             // o(ˈɔː)
    
       if (lowerText[i] === 'o') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ɔ' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈɔ)`);
          i += 1; 
          ipaIndex += 3;
          continue;
        }
      }


             // u(ˈuː)
    
       if (lowerText[i] === 'u') {
     
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'u' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(ˈu)`);
          i += 1; 
          ipaIndex += 3;
          continue;
        }
      }
  


    

    // gemiantes 2026
const geminates = new Set([
  'b', 'd', 'f', 'l', 'm',
  'n', 'p', 'r', 's', 't', 'v'
]);

if (
  lowerText[i] === lowerText[i + 1] &&
  geminates.has(lowerText[i])
) {

  if (
    ipa[ipaIndex] === 'ˈ' &&
    ipa[ipaIndex + 1] === lowerText[i] &&
    ipa[ipaIndex + 2] === 'ː'
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈ${lowerText[i]}ː)`
    );

    i += 2;
    ipaIndex += 3;
    continue;
  }
}


       


// RESYLLIBIFICATION

const italianConsonants = 'bcdfghlmnpqrstvw';
const italianVowels = 'aeiou';

const italianConsonantsIpa = 'bdfɡklʎmnprstv';
const italianVowelsIpa = 'aeɛijoɔuw';

const italianZIpa = 'tdsz';



if (
  lowerText[i] === "z" &&
  lowerText[i + 1] === "'" &&
  italianVowels.includes(lowerText[i + 2])
) {
  if (
    italianZIpa.includes(ipa[ipaIndex]) &&
    italianZIpa.includes(ipa[ipaIndex + 1]) &&
    ipa[ipaIndex + 2] === 'ˈ' &&
    italianVowelsIpa.includes(ipa[ipaIndex + 3])
  ) {
    result.push(
      `${text[i]}(ˈ${ipa[ipaIndex]}${ipa[ipaIndex + 1]})'${text[i + 2]}(${ipa[ipaIndex + 3]})`
    );

    i += 3;
    ipaIndex += 4;
    continue;
  }
}




if (
  lowerText[i] === "l" &&
  lowerText[i + 1] === "l" &&
  lowerText[i + 2] === "'" &&
  italianVowels.includes(lowerText[i + 3])
) {
  if (
    ipa[ipaIndex] === 'l' &&
    ipa[ipaIndex + 1] === 'ː' &&
    ipa[ipaIndex + 2] === 'ˈ' &&
    italianVowelsIpa.includes(ipa[ipaIndex + 3])
  ) {
    result.push(
      `ll(ˈlː)'${text[i + 3]}(${ipa[ipaIndex + 3]})`
    );

    i += 4;
    ipaIndex += 4;
    continue;
  }
}
    


    
if (
  italianConsonants.includes(lowerText[i]) &&
  lowerText[i + 1] === "'" &&
  italianVowels.includes(lowerText[i + 2])
) {
  if (
    italianConsonantsIpa.includes(ipa[ipaIndex]) &&
    ipa[ipaIndex + 1] === 'ˈ' &&
    italianVowelsIpa.includes(ipa[ipaIndex + 2])
  ) {
    result.push(
      `${text[i]}(ˈ${ipa[ipaIndex]})'${text[i + 2]}(${ipa[ipaIndex + 2]})`
    );

    i += 3;
    ipaIndex += 3;
    continue;
  }
}


// RESYLLIBIFICATION









            // zz dz


               if (lowerText[i] === 'z' && lowerText[i + 1] === 'z') {
     
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'z' && ipa[ipaIndex + 3] === 'ː') {
          result.push(`${text[i]}${text[i + 1]}(ˈdzː)`);
          i += 2; 
          ipaIndex += 4; 
          continue; 
        }
      }



                   if (lowerText[i] === 'z' && lowerText[i + 1] === 'z') {
     
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'z' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}${text[i + 1]}(dzː)`);
          i += 2; 
          ipaIndex += 3; 
          continue; 
        }
      }
    

    // z dz
    
                  if (lowerText[i] === 'z') {
   
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'z' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(dzː)`);
          i += 1; 
          ipaIndex += 3;
          continue;
        }
      }
    
    
             if (lowerText[i] === 'z') {
    
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'z') {
          result.push(`${text[i]}(ˈdz)`);
          i += 1;
          ipaIndex += 3; 
          continue;
        }
      }

  


            if (lowerText[i] === 'z') {

      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'z') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4); 

        if (!/ː/.test(nextIpa)) { 
          
          result.push(`${letter}(dz)`);
          i += 1;
          ipaIndex += 2;
          continue;
        }
      }
    }



    


 // zz ts
    
               if (lowerText[i] === 'z' && lowerText[i + 1] === 'z') {

      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 's' && ipa[ipaIndex + 3] === 'ː') {
          result.push(`${text[i]}${text[i + 1]}(ˈtsː)`);
          i += 2; 
          ipaIndex += 4; 
          continue;
        }
      }


    
               if (lowerText[i] === 'z' && lowerText[i + 1] === 'z') {
  
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 's' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}${text[i + 1]}(tsː)`);
          i += 2; 
          ipaIndex += 3;
          continue;
        }
      }


 // z ts


        if (lowerText[i] === 'z') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 's' && ipa[ipaIndex + 3] === 'ː') {
          result.push(`${text[i]}(ˈtsː)`);
          i += 1;
          ipaIndex += 4;
          continue;
        }
      }


    
        if (lowerText[i] === 'z') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 's') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5); // Check the next two IPA chars

    
          result.push(`${letter}(ˈts)`);
          i += 1; 
          ipaIndex += 3; 
          continue;
        }
    }
    

    


               if (lowerText[i] === 'z') {
     
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 's' && ipa[ipaIndex + 2] === 'ː') {
          result.push(`${text[i]}(tsː)`);
          i += 1;
          ipaIndex += 3; 
          continue;
        }
      }


   



    
        if (lowerText[i] === 'z') {
  
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 's') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4); 

        if (!/ː/.test(nextIpa)) { 
   
          result.push(`${letter}(ts)`);
          i += 1; 
          ipaIndex += 2;
          continue; 
        }
      }
    }




// cci tʃ
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'i') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 'ʃ' && ipa[ipaIndex + 3] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 4, ipaIndex + 6); 

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
       
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈtʃː)`);
          i += 3; 
          ipaIndex += 4; 
          continue; 
        }
    }
 }


           if (lowerText[i] === 'c' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'i') {
      
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 'ʃ' && ipa[ipaIndex + 2] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5); 

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
       
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(tʃː)`);
          i += 3; 
          ipaIndex += 3; 
          continue; 
        }
    }
 }






    
    

    // cch k
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'h') {

      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'k' && ipa[ipaIndex + 2] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈkː)`);
          i += 3;
          ipaIndex += 3; 
          continue; 
        }

    }



            if (lowerText[i] === 'c' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'h') {

      if (ipa[ipaIndex] === 'k' && ipa[ipaIndex + 1] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(kː)`);
          i += 3;
          ipaIndex += 2; 
          continue; 
        }

    }


        // cc tʃ

      if (lowerText[i] === 'c' && lowerText[i + 1] === 'c') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 'ʃ' && ipa[ipaIndex + 3] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(ˈtʃː)`);
          i += 2; 
          ipaIndex += 4; 
          continue; 
        }

    }



          if (lowerText[i] === 'c' && lowerText[i + 1] === 'c') {
      
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 'ʃ' && ipa[ipaIndex + 2] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(tʃː)`);
          i += 2; 
          ipaIndex += 3; 
          continue; 
        }

    }



    


        // cc k
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'c') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'k' && ipa[ipaIndex + 2] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(ˈkː)`);
          i += 2; 
          ipaIndex += 3;
          continue; 
        }
    }


    

        if (lowerText[i] === 'c' && lowerText[i + 1] === 'c') {
      
      if (ipa[ipaIndex] === 'k' && ipa[ipaIndex + 1] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(kː)`);
          i += 2; 
          ipaIndex += 2;
          continue; 
        }
    }



    
   // ch k
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'h') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'k' && ipa[ipaIndex + 2] === 'ː') {
       
          result.push(`${letter}${text[i + 1]}(ˈkː)`);
          i += 2; 
          ipaIndex += 3; 
          continue;
        }
    }
 


 
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'h') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'k') {
       
          result.push(`${letter}${text[i + 1]}(ˈk)`);
          i += 2; 
          ipaIndex += 2; 
          continue;
        }
    }
 

        if (lowerText[i] === 'c' && lowerText[i + 1] === 'h') {
          
      if (ipa[ipaIndex] === 'k' && ipa[ipaIndex + 1] === 'ː') {
       
          result.push(`${letter}${text[i + 1]}(kː)`);
          i += 2; 
          ipaIndex += 2; 
          continue;
        }
    }
 

        if (lowerText[i] === 'c' && lowerText[i + 1] === 'h') {
      
      if (ipa[ipaIndex] === 'k') {
               
          result.push(`${letter}${text[i + 1]}(k)`);
          i += 2;
          ipaIndex += 1; 
          continue; 
        }
      }
    



    


     // cq k
    
    if (lowerText[i] === 'c' && lowerText[i + 1] === 'q') { 
    if (ipa[ipaIndex] === 'k' && ipa[ipaIndex + 1] === 'ː') {
        result.push(`${letter}${text[i + 1]}(kː)`); 
        i += 2; 
        ipaIndex += 2; 
        continue; 
      }
    }


    
  // ci tʃ
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'i') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 'ʃ' && ipa[ipaIndex + 3] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 4, ipaIndex + 6);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
       
          result.push(`${letter}${text[i + 1]}(ˈtʃː)`);
          i += 2; 
          ipaIndex += 4; 
          continue;
        }
    }
 }


 
    
        if (lowerText[i] === 'c' && lowerText[i + 1] === 'i') {
     
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 'ʃ') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
        
          result.push(`${letter}${text[i + 1]}(ˈtʃ)`);
          i += 2; 
          ipaIndex += 3;
          continue; 
        }
      }
    }


            if (lowerText[i] === 'c' && lowerText[i + 1] === 'i') {
     
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 'ʃ' && ipa[ipaIndex + 2] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
        
          result.push(`${letter}${text[i + 1]}(tʃː)`);
          i += 2; 
          ipaIndex += 3;
          continue; 
        }
      }
    }


        if (lowerText[i] === 'c' && lowerText[i + 1] === 'i') {
      
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 'ʃ') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4); 

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
         
          result.push(`${letter}${text[i + 1]}(tʃ)`);
          i += 2;
          ipaIndex += 2; 
          continue; 
        }
      }
    }

    


 // c tʃ

        if (lowerText[i] === 'c') {
   
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 'ʃ' && ipa[ipaIndex + 3] === 'ː') {

          result.push(`${letter}(ˈtʃː)`);
          i += 1; 
          ipaIndex += 4;
          continue;
         
      }
    }

    
        if (lowerText[i] === 'c') {
   
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 't' && ipa[ipaIndex + 2] === 'ʃ') {

          result.push(`${letter}(ˈtʃ)`);
          i += 1; 
          ipaIndex += 3;
          continue;
         
      }
    }

            if (lowerText[i] === 'c') {
   
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 'ʃ' && ipa[ipaIndex + 2] === 'ː') {

          result.push(`${letter}(tʃː)`);
          i += 1; 
          ipaIndex += 3;
          continue;
         
      }
    }



                if (lowerText[i] === 'c') {
   
      if (ipa[ipaIndex] === 't' && ipa[ipaIndex + 1] === 'ʃ') {

          result.push(`${letter}(tʃ)`);
          i += 1; 
          ipaIndex += 2;
          continue;
         
      }
    }





























// ggi dʒ
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'g' && lowerText[i + 2] === 'i') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'ʒ' && ipa[ipaIndex + 3] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 4, ipaIndex + 6); 

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
       
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈdʒː)`);
          i += 3; 
          ipaIndex += 4; 
          continue; 
        }
    }
 }


           if (lowerText[i] === 'g' && lowerText[i + 1] === 'g' && lowerText[i + 2] === 'i') {
      
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'ʒ' && ipa[ipaIndex + 2] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5); 

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
       
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(dʒː)`);
          i += 3; 
          ipaIndex += 3; 
          continue; 
        }
    }
 }






    
    

    // ggh g
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'g' && lowerText[i + 2] === 'h') {

      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'g' && ipa[ipaIndex + 2] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈgː)`);
          i += 3;
          ipaIndex += 3; 
          continue; 
        }

    }



            if (lowerText[i] === 'g' && lowerText[i + 1] === 'g' && lowerText[i + 2] === 'h') {

      if (ipa[ipaIndex] === 'g' && ipa[ipaIndex + 1] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(gː)`);
          i += 3;
          ipaIndex += 2; 
          continue; 
        }

    }


        // gg dʒ

      if (lowerText[i] === 'g' && lowerText[i + 1] === 'g') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'ʒ' && ipa[ipaIndex + 3] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(ˈdʒː)`);
          i += 2; 
          ipaIndex += 4; 
          continue; 
        }

    }



          if (lowerText[i] === 'g' && lowerText[i + 1] === 'g') {
      
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'ʒ' && ipa[ipaIndex + 2] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(dʒː)`);
          i += 2; 
          ipaIndex += 3; 
          continue; 
        }

    }



    


        // gg g
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'g') {
      
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'g' && ipa[ipaIndex + 2] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(ˈgː)`);
          i += 2; 
          ipaIndex += 3;
          continue; 
        }
    }


    

        if (lowerText[i] === 'g' && lowerText[i + 1] === 'g') {
      
      if (ipa[ipaIndex] === 'g' && ipa[ipaIndex + 1] === 'ː') {
      
          result.push(`${letter}${text[i + 1]}(gː)`);
          i += 2; 
          ipaIndex += 2;
          continue; 
        }
    }



    
   // gh k
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'h') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'g' && ipa[ipaIndex + 2] === 'ː') {
       
          result.push(`${letter}${text[i + 1]}(ˈgː)`);
          i += 2; 
          ipaIndex += 3; 
          continue;
        }
    }
 


 
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'h') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'g') {
       
          result.push(`${letter}${text[i + 1]}(ˈg)`);
          i += 2; 
          ipaIndex += 2; 
          continue;
        }
    }
 

        if (lowerText[i] === 'g' && lowerText[i + 1] === 'h') {
          
      if (ipa[ipaIndex] === 'g' && ipa[ipaIndex + 1] === 'ː') {
       
          result.push(`${letter}${text[i + 1]}(gː)`);
          i += 2; 
          ipaIndex += 2; 
          continue;
        }
    }
 

        if (lowerText[i] === 'g' && lowerText[i + 1] === 'h') {
      
      if (ipa[ipaIndex] === 'g') {
               
          result.push(`${letter}${text[i + 1]}(g)`);
          i += 2;
          ipaIndex += 1; 
          continue; 
        }
      }
    


    
  // gi dʒ
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'i') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'ʒ' && ipa[ipaIndex + 3] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 4, ipaIndex + 6);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
       
          result.push(`${letter}${text[i + 1]}(ˈdʒː)`);
          i += 2; 
          ipaIndex += 4; 
          continue;
        }
    }
 }


 
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'i') {
     
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'ʒ') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
        
          result.push(`${letter}${text[i + 1]}(ˈdʒ)`);
          i += 2; 
          ipaIndex += 3;
          continue; 
        }
      }
    }


            if (lowerText[i] === 'g' && lowerText[i + 1] === 'i') {
     
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'ʒ' && ipa[ipaIndex + 2] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
        
          result.push(`${letter}${text[i + 1]}(dʒː)`);
          i += 2; 
          ipaIndex += 3;
          continue; 
        }
      }
    }


        if (lowerText[i] === 'g' && lowerText[i + 1] === 'i') {
      
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'ʒ') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4); 

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
         
          result.push(`${letter}${text[i + 1]}(dʒ)`);
          i += 2;
          ipaIndex += 2; 
          continue; 
        }
      }
    }

    


 // g dʒ

        if (lowerText[i] === 'g') {
   
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'ʒ' && ipa[ipaIndex + 3] === 'ː') {

          result.push(`${letter}(ˈdʒː)`);
          i += 1; 
          ipaIndex += 4;
          continue;
         
      }
    }

    
        if (lowerText[i] === 'g') {
   
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'd' && ipa[ipaIndex + 2] === 'ʒ') {

          result.push(`${letter}(ˈdʒ)`);
          i += 1; 
          ipaIndex += 3;
          continue;
         
      }
    }

            if (lowerText[i] === 'g') {
   
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'ʒ' && ipa[ipaIndex + 2] === 'ː') {

          result.push(`${letter}(dʒː)`);
          i += 1; 
          ipaIndex += 3;
          continue;
         
      }
    }



                if (lowerText[i] === 'g') {
   
      if (ipa[ipaIndex] === 'd' && ipa[ipaIndex + 1] === 'ʒ') {

          result.push(`${letter}(dʒ)`);
          i += 1; 
          ipaIndex += 2;
          continue;
         
      }
    }







 // gli ʎ
    
        if (lowerText[i] === 'g' && lowerText[i + 1] === 'l' && lowerText[i + 2] === 'i') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʎ' && ipa[ipaIndex + 2] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
       
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈʎː)`);
          i += 3; 
          ipaIndex += 3; 
          continue;
        }
    }
 }


      


        if (lowerText[i] === 'g' && lowerText[i + 1] === 'l' && lowerText[i + 2] === 'i') {

      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʎ') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
   
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈʎ)`);
          i += 3;
          ipaIndex += 2;
          continue;
        }
    }
 }




            if (lowerText[i] === 'g' && lowerText[i + 1] === 'l' && lowerText[i + 2] === 'i') {

      if (ipa[ipaIndex] === 'ʎ' && ipa[ipaIndex + 1] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
   
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ʎː)`);
          i += 3;
          ipaIndex += 2;
          continue;
        }
    }
 }




        if (lowerText[i] === 'g' && lowerText[i + 1] === 'l' && lowerText[i + 2] === 'i') {

      if (ipa[ipaIndex] === 'ʎ') {
        const nextIpa = ipa.slice(ipaIndex + 1, ipaIndex + 3);
        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
          
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ʎ)`);
          i += 3;
          ipaIndex += 1; 
          continue; 
        }
      }
    }






    

  // gl ʎ   

    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'l'
) {

  if (
    (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʎ' && ipa[ipaIndex + 2] === 'ː')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈʎː)`
    );

    i += 2;
    ipaIndex += 3;

    continue;
  }
}



   

    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'l'
) {

  if (
    (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʎ')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈʎ)`
    );

    i += 2;
    ipaIndex += 2;

    continue;
  }
} 



    

    
    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'l'
) {

  if (
    (ipa[ipaIndex] === 'ʎ' && ipa[ipaIndex + 1] === 'ː')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ʎː)`
    );

    i += 2;
    ipaIndex += 2;

    continue;
  }
}


 

    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'l'
) {

  if (
    (ipa[ipaIndex] === 'ʎ')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ʎ)`
    );

    i += 2;
    ipaIndex += 1;

    continue;
  }
} 





  // gn ɲ   

    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'n'
) {

  if (
    (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ɲ' && ipa[ipaIndex + 2] === 'ː')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈɲː)`
    );

    i += 2;
    ipaIndex += 3;

    continue;
  }
}



   

    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'n'
) {

  if (
    (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ɲ')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈɲ)`
    );

    i += 2;
    ipaIndex += 2;

    continue;
  }
} 



    

    
    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'n'
) {

  if (
    (ipa[ipaIndex] === 'ɲ' && ipa[ipaIndex + 1] === 'ː')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ɲː)`
    );

    i += 2;
    ipaIndex += 2;

    continue;
  }
}


 

    if (
  lowerText[i] === 'g' &&
  lowerText[i + 1] === 'n'
) {

  if (
    (ipa[ipaIndex] === 'ɲ')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ɲ)`
    );

    i += 2;
    ipaIndex += 1;

    continue;
  }
} 









    


    


    // sci ʃ
    
        if (lowerText[i] === 's' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'i') {
          
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʃ' && ipa[ipaIndex + 2] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 3, ipaIndex + 5);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
       
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈʃː)`);
          i += 3; 
          ipaIndex += 3; 
          continue;
        }
    }
 }


      


        if (lowerText[i] === 's' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'i') {

      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʃ') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
   
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ˈʃ)`);
          i += 3;
          ipaIndex += 2;
          continue;
        }
    }
 }




            if (lowerText[i] === 's' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'i') {

      if (ipa[ipaIndex] === 'ʃ' && ipa[ipaIndex + 1] === 'ː') {
        const nextIpa = ipa.slice(ipaIndex + 2, ipaIndex + 4);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) {
   
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ʃː)`);
          i += 3;
          ipaIndex += 2;
          continue;
        }
    }
 }




        if (lowerText[i] === 's' && lowerText[i + 1] === 'c' && lowerText[i + 2] === 'i') {
  
      if (ipa[ipaIndex] === 'ʃ') {
        const nextIpa = ipa.slice(ipaIndex + 1, ipaIndex + 3);

        if (!/i|ˈi|j|ˈj/.test(nextIpa)) { 
         
          result.push(`${letter}${text[i + 1]}${text[i + 2]}(ʃ)`);
          i += 3; 
          ipaIndex += 1; 
          continue; 
        }
      }
    }






    

  // sc ʃ   

    if (
  lowerText[i] === 's' &&
  lowerText[i + 1] === 'c'
) {

  if (
    (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʃ' && ipa[ipaIndex + 2] === 'ː')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈʃː)`
    );

    i += 2;
    ipaIndex += 3;

    continue;
  }
}



   

    if (
  lowerText[i] === 's' &&
  lowerText[i + 1] === 'c'
) {

  if (
    (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ʃ')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ˈʃ)`
    );

    i += 2;
    ipaIndex += 2;

    continue;
  }
} 



    

    
    if (
  lowerText[i] === 's' &&
  lowerText[i + 1] === 'c'
) {

  if (
    (ipa[ipaIndex] === 'ʃ' && ipa[ipaIndex + 1] === 'ː')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ʃː)`
    );

    i += 2;
    ipaIndex += 2;

    continue;
  }
}


 

    if (
  lowerText[i] === 's' &&
  lowerText[i + 1] === 'c'
) {

  if (
    (ipa[ipaIndex] === 'ʃ')
  ) {

    result.push(
      `${text[i]}${text[i + 1]}(ʃ)`
    );

    i += 2;
    ipaIndex += 1;

    continue;
  }
} 




 
  


   // h


        if (lowerText[i] === 'h' && lowerText[i + 1] === 'a') {
  
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'a') {
          result.push(`${letter}${text[i + 1]}(ˈa)`);
          i += 2;
          ipaIndex += 2; 
          continue;
        }
      }

            if (lowerText[i] === 'h' && lowerText[i + 1] === 'a') {

      if (ipa[ipaIndex] === 'ˌ' && ipa[ipaIndex + 1] === 'a') {
          result.push(`${letter}${text[i + 1]}(ˌa)`);
          i += 2; 
          ipaIndex += 2; 
          continue; 
        }
      }
    
    

            if (lowerText[i] === 'h' && lowerText[i + 1] === 'o') {
 
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'o') {
          result.push(`${letter}${text[i + 1]}(ˈo)`);
          i += 2;
          ipaIndex += 2;
          continue; 
        }
      }

           if (lowerText[i] === 'h' && lowerText[i + 1] === 'a') {
     
      if (ipa[ipaIndex] === 'a') {
          result.push(`${letter}${text[i + 1]}(a)`);
          i += 2;
          ipaIndex += 1; 
          continue;
        }
      }
    
            if (lowerText[i] === 'h' && lowerText[i + 1] === 'o') {
    
      if (ipa[ipaIndex] === 'ˈ' && ipa[ipaIndex + 1] === 'ɔ') {
          result.push(`${letter}${text[i + 1]}(ˈɔ)`);
          i += 2; 
          ipaIndex += 2;
          continue; 
        }
      }

               if (lowerText[i] === 'h' && lowerText[i + 1] === 'o') {
      
      if (ipa[ipaIndex] === 'o') {
          result.push(`${letter}${text[i + 1]}(o)`);
          i += 2; 
          ipaIndex += 1;
          continue; 
        }
      }

                   if (lowerText[i] === 'h' && lowerText[i + 1] === 'o') {

      if (ipa[ipaIndex] === 'ɔ') {
          result.push(`${letter}${text[i + 1]}(ɔ)`);
          i += 2;
          ipaIndex += 1; 
          continue; 
        }
      }



    


    
    
   // Elisione '
 


        if (lowerText[i] === "'" && lowerText[i + 1] === 'a') {
   
      if (ipa[ipaIndex] === 'a') {
          result.push(`${letter}${text[i + 1]}(a)`);
          i += 2; 
          ipaIndex += 1; 
          continue; 
        }
      }
    

             if (lowerText[i] === "'" && lowerText[i + 1] === 'e') {

      if (ipa[ipaIndex] === 'e') {
          result.push(`${letter}${text[i + 1]}(e)`);
          i += 2; 
          ipaIndex += 1; 
          continue;
        }
      }



          if (lowerText[i] === "'" && lowerText[i + 1] === 'e') {

      if (ipa[ipaIndex] === 'ɛ') {
          result.push(`${letter}${text[i + 1]}(ɛ)`);
          i += 2;
          ipaIndex += 1;
          continue;
        }
      }
    

             if (lowerText[i] === "'" && lowerText[i + 1] === 'o') {

      if (ipa[ipaIndex] === 'ɔ') {
          result.push(`${letter}${text[i + 1]}(ɔ)`);
          i += 2; 
          ipaIndex += 1; 
          continue; 
        }
      }


  
             if (lowerText[i] === "'" && lowerText[i + 1] === 'i') {
    
      if (ipa[ipaIndex] === 'i') {
          result.push(`${letter}${text[i + 1]}(i)`);
          i += 2;
          ipaIndex += 1;
          continue;
        }
      }


                if (lowerText[i] === "'" && lowerText[i + 1] === 'u') {
     
      if (ipa[ipaIndex] === 'u') {
          result.push(`${letter}${text[i + 1]}(u)`);
          i += 2; 
          ipaIndex += 1;
          continue; 
        }
      }





    
    









    
        // Default behavior: Process the IPA character normally
    if (ipaChar === 'ˈ' || ipaChar === 'ˌ') {
      ipaIndex++;
      ipaChar = ipa[ipaIndex];
      result.push(`${letter}(ˈ${ipaChar})`);
    } else {
      result.push(`${letter}(${ipaChar})`);
    }

          
    ipaIndex++;
    i++;
  }

  

  // If anything left in text, append with empty IPA
  while (i < text.length) {
    result.push(`${text[i]}()`);
    i++;
  }

  

  // If mapping finished but IPA wasn't fully consumed, or vice versa → stop
  if (ipaIndex < ipa.length - 1 || i < text.length - 1) {
    // delete
    // console.warn(`Partial mapping detected for "${text}" (IPA: "${ipa}")`);
    return null; // indicate failure to map
  }

  return result.join('');

}
