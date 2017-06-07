import { Shops } from "../../../lib/collections/";

export function shops(Api) {
  Api.addCollection(Shops);
  Api.addRoute("shops", { authRequired: false }, {
    get: () => {
      return Shops.find().fetch();
    }
  });

  Api.addRoute("shops/:id", { authRequired: false }, {
    get: function () {
      return Shops.findOne(this.urlParams.id);
    },
    delete: {
      action: function () {
        if (Shops.remove(this.urlParams.id)) {
          return { status: "success", message: "Shop removed" };
        }
        return {
          statusCode: 400,
          body: { status: "fail", message: "Shop not found" }
        };
      }
    }
  });
}
