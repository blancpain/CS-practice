function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const mid = arr.length / 2;
  const arrLeft = arr.slice(0, mid);
  mergeSort(arrLeft);
  const arrRight = arr.slice(mid, arr.length);
  mergeSort(arrRight);

  const tempArr = [arrLeft, arrRight];
  const finalArr = [];

  console.log(tempArr[1][0]);

  let i = 0;
  let j = 0;

  while (tempArr.length >= 0) {
    if (tempArr[0][i] > tempArr[1][j]) {
      finalArr.push(tempArr[1][j]);
      tempArr.splice(tempArr.indexOf(tempArr[1][j]), 1);
      j++;
    } else if (tempArr[0][i] < tempArr[1][j]) {
      finalArr.push(tempArr[0][i]);
      tempArr.splice(tempArr.indexOf(tempArr[1][j]), 1);
      i++;
    }
  }

  console.log(tempArr.length);
  // for (let i = 0; i < arrLeft.length; i++) {
  //   for (let j = 0; j < arrRight.length; j++) {
  //     if (arrLeft[i] > arrRight[j]) {
  //       const smaller = arrRight[j];
  //       const bigger = arrLeft[i];
  //       arrLeft[i] = smaller;
  //       arrRight[j] = bigger;
  //     }
  //   }
  // }

  return finalArr;
}

console.log(mergeSort([4, 3, 1, 2]));
