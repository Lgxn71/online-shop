const mongodb = require("mongodb");

const db = require("../database/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // the name of image file
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    } // if new product is added we dont have id so we need to avoid it in such case
  }
  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assest/images/${this.image}`; // check app.js
  }

  //static dont have to create object based on class
  static async findAll() {
    const products = await db.getdb().collection("products").find().toArray();
    //toArray to use it
    return products.map((productDocument) => {
      return new Product(productDocument);
    });
    // this function will be executed on every element of the array
  }
  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      console.log(error);
      throw error;
    }
    const product = await db
      .getdb()
      .collection("products")
      .findOne({ _id: prodId });
    if (!product) {
      const error = new Error("Could not find product with provided id");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }
  // we convert all data from db to object Product based on our blueprint
  // we are doing this to rebuild imagePath and imageUrl for all products
  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getdb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    // if we dont have product it means we want to create it, therefore else will be executed. in other case if will be executes
    // (it means that we already have a product)
    if (this.id) {
      const productId = mongodb.ObjectId(this.id);
      if (!this.image) {
        delete productData.image;
        //delete key pair value from object to dont overwrite it
      }
      await db
        .getdb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getdb().collection("products").insertOne(productData);
    }
  }

  async replaceImage(newImage) {
    this.image = newImage; //name of the image
    this.updateImageData();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getdb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
