def time_conversion(millisecond):
  second = int(millisecond/1000)
  minute = 0
  if second > 60:
    minute += 1
    second -= 60
  if second > 10:
    return f"0{minute}:{second}"
  return f"0{minute}:0{second}"