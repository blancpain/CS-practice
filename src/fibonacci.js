function fibsrecursive(n) {
  if (n <= 2) {
    return [0, 1];
  }
  const arr = fibsrecursive(n - 1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  return arr;
}

console.log(fibsrecursive(5));
