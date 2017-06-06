import { Revisions } from "../../../lib/collections/";

export function revisions(Api) {
  Api.addCollection(Revisions);
  Api.addRoute("revisions", { authRequired: false }, {
    get: () => {
      return Revisions.find().fetch();
    },
    post: {
      action: () => {
        if (Revisions.insert(this.request.body)) {
          return { status: "success", message: "Revision added succesfully" };
        }
        return {
          status: "fail",
          message: "Revision failed to add"
        };
      }
    }
  });
  Api.addRoute("revisions/:id", { authRequired: false }, {
    get: () => {
      return Revisions.findOne().fetch();
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Revisions.remove(this.urlParams.id)) {
          return { status: "success", message: "Revision deleted" };
        }
        return {
          status: "fail",
          message: "Revision not found"
        };
      }
    }
  });
}
