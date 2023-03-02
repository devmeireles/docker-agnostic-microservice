from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@postgres:5432/msdatabase'
#postgresql://user:password@host:port/db
db = SQLAlchemy(app)

class Item(db.Model):
  __tablename__ = 'products'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64), unique=False, nullable=False)
  price = db.Column(db.Float(), unique=False, nullable=False)

  def __init__(self, name, price):
    self.name = name
    self.price = price

db.create_all()

@app.route('/items/<id>', methods=['GET'])
def get_item(id):
  item = Item.query.get(id)
  del item.__dict__['_sa_instance_state']

  data = {
    'success': True,
    'data': item.__dict__
  }

  return jsonify(data)

@app.route('/items', methods=['GET'])
def get_items():
  items = []
  for item in db.session.query(Item).all():
    del item.__dict__['_sa_instance_state']
    items.append(item.__dict__)

    data = {
      'success': True,
      'data': items
      }

  return jsonify(data)