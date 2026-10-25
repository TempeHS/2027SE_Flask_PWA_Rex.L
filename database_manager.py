import sqlite3 as sql


def listExtension():
    with sql.connect("database/data_source.db") as con:
        cur = con.cursor()
        data = cur.execute("SELECT * FROM extension").fetchall()
    return data



def insertContact(email, name):
    with sql.connect("database/data_source.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO contact_list (email,name) VALUES (?,?)", (email, name))
        con.commit()

