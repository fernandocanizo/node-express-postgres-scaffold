const rfr = require('rfr');
const mongoose = require('mongoose');

const toJson = rfr('/src/models/plugins/toJson');

describe('toJson plugin', () => {
  let connection;

  beforeEach(() => {
    connection = mongoose.createConnection();
  });

  it('should replace _id with id', () => {
    const schema = mongoose.Schema();
    schema.plugin(toJson);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    expect(doc.toJson()).not.toHaveProperty('_id');
    expect(doc.toJson()).toHaveProperty('id', doc._id.toString());
  });

  it('should remove __v', () => {
    const schema = mongoose.Schema();
    schema.plugin(toJson);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    expect(doc.toJson()).not.toHaveProperty('__v');
  });

  it('should remove createdAt and updatedAt', () => {
    const schema = mongoose.Schema({}, { timestamps: true });
    schema.plugin(toJson);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    expect(doc.toJson()).not.toHaveProperty('createdAt');
    expect(doc.toJson()).not.toHaveProperty('updatedAt');
  });

  it('should remove any path set as private', () => {
    const schema = mongoose.Schema({
      public: { type: String },
      private: { type: String, private: true },
    });
    schema.plugin(toJson);
    const Model = connection.model('Model', schema);
    const doc = new Model({ public: 'some public value', private: 'some private value' });
    expect(doc.toJson()).not.toHaveProperty('private');
    expect(doc.toJson()).toHaveProperty('public');
  });

  it('should remove any nested paths set as private', () => {
    const schema = mongoose.Schema({
      public: { type: String },
      nested: {
        private: { type: String, private: true },
      },
    });
    schema.plugin(toJson);
    const Model = connection.model('Model', schema);
    const doc = new Model({
      public: 'some public value',
      nested: {
        private: 'some nested private value',
      },
    });
    expect(doc.toJson()).not.toHaveProperty('nested.private');
    expect(doc.toJson()).toHaveProperty('public');
  });

  it('should also call the schema toJson transform function', () => {
    const schema = mongoose.Schema(
      {
        public: { type: String },
        private: { type: String },
      },
      {
        toJson: {
          transform: (doc, ret) => {
            // eslint-disable-next-line no-param-reassign
            delete ret.private;
          },
        },
      }
    );
    schema.plugin(toJson);
    const Model = connection.model('Model', schema);
    const doc = new Model({ public: 'some public value', private: 'some private value' });
    expect(doc.toJson()).not.toHaveProperty('private');
    expect(doc.toJson()).toHaveProperty('public');
  });
});
