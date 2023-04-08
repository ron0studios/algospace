migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8")

  collection.name = "problem_tag"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8")

  collection.name = "problem_tags"

  return dao.saveCollection(collection)
})
