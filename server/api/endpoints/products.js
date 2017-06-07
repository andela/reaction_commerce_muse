import { Products } from "../../../lib/collections/";

export function products(Api) {
  Api.addCollection(Products);
  Api.addRoute("products", { authRequired: false }, {
    get: () => {
      return Products.find().fetch();
    },
    post: {
      action: () => {
        if (Products.insert(this.request.body)) {
          return { status: "success", message: "Product added succesfully" };
        }
        return {
          status: "fail",
          message: "Product failed to add"
        };
      }
    }
  });
  Api.addRoute("products/:id", { authRequired: false }, {
    get() {
      return Products.findOne(this.urlParams._id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Products.remove(this.urlParams.id)) {
          return { status: "success", message: "Product deleted" };
        }
        return {
          status: "fail",
          message: "Product not found"
        };
      }
    }
  });
}
