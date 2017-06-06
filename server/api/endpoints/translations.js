import { Translations } from "../../../lib/collections/";

export function translations(Api) {
  Api.addCollection(Translations);
  Api.addRoute("translations", { authRequired: false }, {
    get: () => {
      return Translations.find().fetch();
    },
    post: {
      action: () => {
        if (Translations.insert(this.request.body)) {
          return { status: "success", message: "Translation added succesfully" };
        }
        return {
          status: "fail",
          message: "Translation failed to add"
        };
      }
    }
  });
  Api.addRoute("translations/:id", { authRequired: false }, {
    get: () => {
      return Tags.findOne().fetch();
    },
    delete: {
      roleRequired: ["author", "admin"],
      action: () => {
        if (Translations.remove(this.urlParams.id)) {
          return { status: "success", message: "Translations deleted" };
        }
        return {
          status: "fail",
          message: "translation not found"
        };
      }
    }
  });
}
