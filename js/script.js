function getSubtraction(a, b) {
    let result = a - b;
  
    if(result < 0){
      let multiplier = -1;
      result = result * multiplier;
    }
  
    return result;
  }
  
  console.log( getSubtraction(5, 7) );