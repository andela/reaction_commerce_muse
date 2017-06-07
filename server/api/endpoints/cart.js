import { Cart } from "../../../lib/collections";

export function cart(Api) {
  Api.addCollection(Cart);

  Api.addRoute("cart", { authRequired: false }, {
    get: () => {
      return Cart.find().fetch();
    },
    post: {
      action: () => {
        if (Cart.insert(this.request.body)) {
          return {
            status: "success",
            statusCode: 200,
            data: {
              message: "Item added to cart"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Action unsuccessful"
          }
        };
      }
    }
  });
  Api.addRoute("cart/:id", { authRequired: false }, {
    get: function () {
      return Cart.findOne(this.urlParams._id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Cart.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Item removed from cart" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Item not found" }
        };
      }
    }
  });
}
