const TimeSort = (a, b) => {
  const aData = new Date(a)
  const bData = new Date(b)
  if (aData.getTime() < bData.getTime()) {
    return -1;
  }
  return 0;
}

export  {TimeSort}