import { Orders } from "../../../lib/collections/";

export function orders(Api) {
  Api.addCollection(Orders);
  Api.addRoute("orders", { authRequired: false }, {
    get: () => {
      return Orders.find().fetch();
    },
    post: {
      action: () => {
        if (Orders.insert(this.request.body)) {
          return { status: "success", message: "Order successful" };
        }
        return {
          status: "fail",
          message: "Order unsuccessful"
        };
      }
    }
  });
  Api.addRoute("orders/:id", { authRequired: false }, {
    get: () => {
      return Orders.findOne().fetch();
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Orders.remove(this.urlParams.id)) {
          return { status: "success", message: "Order deleted" };
        }
        return {
          status: "fail",
          message: "Order not found"
        };
      }
    }
  });
}
