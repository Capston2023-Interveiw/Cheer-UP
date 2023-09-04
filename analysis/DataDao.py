import pymysql

class DataDao:
    
    def insertLog(self, reason, timestamp, analysis_id, video_id):
        db = pymysql.connect(host='localhost', port=3306, user='root', db='cheer', password='1234', charset='utf8')
        curs = db.cursor()

        sql = '''insert into analysis_log (reason, timestamp, analysis_id, video_id) values(%s, %s, %s, %s)'''

        curs.execute(sql,(reason, timestamp, analysis_id, video_id))
        db.commit()
        db.close()
    
    def insertVideo(self, url, user_id):
        db = pymysql.connect(host='localhost', port=3306, user='root', db='cheer', password='1234', charset='utf8')
        curs = db.cursor()

        sql = '''INSERT INTO video (url, member_id) values(%s, %s)'''

        curs.execute(sql,(url, user_id))
        db.commit()
        db.close()

    def selectVideo(self, member_id):
        db = pymysql.connect(host='localhost', port=3306, user='root', db='cheer', password='1234', charset='utf8')
        curs = db.cursor()
        sql='''SELECT MAX(id) from video where member_id=(%s)'''
        curs.execute(sql,(member_id))
        db.commit()
        db.close()
        return curs.fetchone()[0]
    
    def insertScore(self, score, video_id, feedback_id, analysis_id):
        db = pymysql.connect(host='localhost', port=3306, user='root', db='cheer', password='1234', charset='utf8')
        curs = db.cursor()
        sql = '''INSERT INTO score (score, video_id, feedback_id, analysis_id, summary) values(%s, %s, %s, %s, %s)'''
        curs.execute(sql,(score, video_id, feedback_id, analysis_id, summary))
        db.commit()
        db.close()