import Realm from 'realm';

class Cities extends Realm.Object {}
class Users extends Realm.Object {}

Cities.schema = {
  name: 'Cities',
  properties: {
    'name': {
      type: 'string'
    },
    'pincode': {
      type: 'int'
    }
  }
};

Users.schema = {
  name: 'Users',
  primaryKey: 'id',
  properties: {
    'id': 'string',
    'name': {
      type: 'string'
    },
    'city': {
      type: 'list',
      objectType: 'Cities'
    }
  }
};

const schemaList = [Users, Cities];

const RealmInstance = new Realm({schema: schemaList});

export default RealmInstance;