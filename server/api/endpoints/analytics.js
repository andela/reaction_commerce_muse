import { AnalyticsEvents } from "../../../lib/collections/";

export function accounts(Api) {
  Api.addCollection(AnalyticsEvents);

  Api.addRoute("analytics", { authRequired: false }, {
    get: () => {
      return AnalyticsEvents.find().fetch();
    }
  });
}
