from datetime import time

def time_conversion(millisecond):
  second = int(millisecond/1000)
  minute = 0
  if second > 60:
    minute += 1
    second -= 60
  stamp = time(minute=minute, second=second)
  return stamp.strftime('%M:%S')