migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f8j5ian9i9hq61")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f8j5ian9i9hq61")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
