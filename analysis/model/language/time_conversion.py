from datetime import time

def time_conversion(millisecond):
  second = int(millisecond/1000)
  minute = 0
  if second > 60:
    minute += second // 60
    second -= 60 * minute
  stamp = time(minute=minute, second=second)
  return stamp.strftime('%M:%S')