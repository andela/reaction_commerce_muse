import { Assets } from "../../../lib/collections";

export function assets(Api) {
  Api.addCollection(Assets);

  Api.addRoute("assets", { authRequired: false }, {
    get: () => {
      return Assets.find().fetch();
    },
    post: {
      action: () => {
        if (Assets.insert(this.request.body)) {
          return {
            status: "success",
            statusCode: 200,
            data: {
              message: "Language added"
            }

          };
        }
        return {
          status: "fail",
          data: {
            message: "Language addition unsuccessful"
          }
        };
      }
    }
  });
  Api.addRoute("assets/id", { authRequired: false }, {
    get: () => {
      return Assets.find(this.urlParams.id);
    },
    delete: {
      roleRequire: ["author", "admin"],
      action: () => {
        if (Assets.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Asset removed" } };
        }
        return {
          statusCode: 404,
          body: { status: "fail", message: "Asset not found" }
        };
      }
    }
  });
}
