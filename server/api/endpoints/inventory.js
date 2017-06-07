import { Inventory } from "../../../lib/collections/";

export function inventory(Api) {
  Api.addCollection(Inventory);
  Api.addRoute("inventory", { authRequired: false }, {
    get: () => {
      return Inventory.find().fetch();
    },
    post: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (inventory.insert(this.request.body)) {
          return { status: "success", message: "Inventory updated" };
        }
        return {
          status: "fail",
          message: "Update failed"
        };
      }
    }
  });

  Api.addRoute("inventory/:id", { authRequired: false }, {
    get: function () {
      return Inventory.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: function () {
        if (Inventory.remove(this.urlParams.id)) {
          return { status: "success", message: "Inventory item deleted" };
        }
        return {
          status: "fail",
          message: "Item not found"
        };
      }
    }
  });
}
