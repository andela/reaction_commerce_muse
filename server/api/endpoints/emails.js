import { Emails } from "../../../lib/collections";

export function emails(Api) {
  Api.addCollection(Emails);

  Api.addRoute("emails", { authRequired: false }, {
    get: () => {
      return Emails.find().fetch();
    },
    post: {
      action: () => {
        if (Emails.insert(this.request.body)) {
          return {
            status: "success",
            data: { message: "Account added" }
          };
        }
        return {
          status: "fail",
          data: {
            message: "Account not found"
          }
        };
      }
    }
  });
  Api.addRoute("emails/:id", { authRequired: false }, {
    get: () => {
      return Emails.findOne().fetch();
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Emails.remove(this.urlParams.id)) {
          return { status: "success", data: { message: "Account deleted" } };
        }
        return { status: "failed", message: "Account not found" };
      }
    }
  });
}

