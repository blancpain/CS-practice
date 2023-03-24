// UPDATED mergeSort

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const arrLeft = arr.slice(0, mid);
  const arrRight = arr.slice(mid, arr.length);
  const sortedLeft = mergeSort(arrLeft);
  const sortedRight = mergeSort(arrRight);

  const mergedArr = [];
  let i = 0;
  let j = 0;

  while (i < sortedLeft.length && j < sortedRight.length) {
    if (sortedLeft[i] <= sortedRight[j]) {
      mergedArr.push(sortedLeft[i]);
      i++;
    } else {
      mergedArr.push(sortedRight[j]);
      j++;
    }
  }

  while (i < sortedLeft.length) {
    mergedArr.push(sortedLeft[i]);
    i++;
  }

  while (j < sortedRight.length) {
    mergedArr.push(sortedRight[j]);
    j++;
  }

  return mergedArr;
}

console.log(mergeSort([2, 1]));

// OLD MERGE SORT BELOW, keeping for review purposes

// function mergeSort(arr) {
//   if (arr.length === 1) {
//     return arr;
//   }
//   const mid = arr.length / 2;
//   const arrLeft = arr.slice(0, mid);
//   mergeSort(arrLeft);
//   const arrRight = arr.slice(mid, arr.length);
//   mergeSort(arrRight);

//   let i = 0;
//   let j = 0;

//   const mergedArr = [];

//   while (i < arrLeft.length && j < arrRight.length) {
//     if (arrLeft[i] > arrRight[j]) {
//       mergedArr.push(arrRight[j]);
//       j++;
//     } else if (arrLeft[i] < arrRight[j]) {
//       mergedArr.push(arrLeft[i]);
//       i++;
//     }
//   }

//   while (i < arrLeft.length) {
//     mergedArr.push(arrLeft[i]);
//     i++;
//   }

//   while (j < arrRight.length) {
//     mergedArr.push(arrRight[j]);
//     j++;
//   }

//   return mergedArr;
// }
