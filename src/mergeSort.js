function merge(arrLeft, arrRight) {
  const mergedArr = [];

  let i = 0;
  let j = 0;

  while (i < arrLeft.length && j < arrRight.length) {
    if (arrLeft[i] >= arrRight[j]) {
      mergedArr.push(arrRight[j]);
      j++;
    } else {
      mergedArr.push(arrLeft[i]);
      i++;
    }
  }

  while (i < arrLeft.length) {
    mergedArr.push(arrLeft[i]);
    i++;
  }

  while (j < arrRight.length) {
    mergedArr.push(arrRight[j]);
    j++;
  }

  return mergedArr;
}

export default function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const arrLeft = arr.slice(0, mid);
  const arrRight = arr.slice(mid, arr.length);

  return merge(mergeSort(arrLeft), mergeSort(arrRight));
}
