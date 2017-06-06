import { Tags } from "../../../lib/collections/";

export function tags(Api) {
  Api.addCollection(Tags);
  Api.addRoute("tags", { authRequired: false }, {
    get: () => {
      return Tags.find().fetch();
    },
    post: {
      action: () => {
        if (Tags.insert(this.request.body)) {
          return { status: "success", message: "Tag added succesfully" };
        }
        return {
          status: "fail",
          message: "Tag failed to add"
        };
      }
    }
  });
  Api.addRoute("tags/:id", { authRequired: false }, {
    get: () => {
      return Tags.findOne().fetch();
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Tags.remove(this.urlParams.id)) {
          return { status: "success", message: "Tag deleted" };
        }
        return {
          status: "fail",
          message: "tag not found"
        };
      }
    }
  });
}
