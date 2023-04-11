migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kv74mjz7",
    "name": "field1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "yc4i1zvozctqade",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8")

  // remove
  collection.schema.removeField("kv74mjz7")

  return dao.saveCollection(collection)
})
