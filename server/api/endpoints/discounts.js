import { Discounts } from "../../../lib/collections";

export function discounts(Api) {
  Api.addCollection(Discounts);

  Api.addRoute("discounts", { authRequired: false }, {
    get: () => {
      return Discounts.find().fetch();
    },
    post: {
      action: () => {
        if (Discounts.insert(this.request.body)) {
          return {
            status: "success",
            data: {
              message: "Item added to cart successfully"
            }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Item not added to cart"
          }
        };
      }
    }
  });
  Api.addRoute("discounts/:id", { authRequired: false }, {
    get: () => {
      return Discounts.findOne().fetch();
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Discounts.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Discounted items deleted" } };
        }
        return {
          statusCode: 400,
          body: {
            status: "fail",
            message: "No items to delete"
          }
        };
      }
    }
  });
}
