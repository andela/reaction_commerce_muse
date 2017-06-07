import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import _ from "underscore";

Template.searchFilter.events({
  "change #price-filter": function (event) {
    Session.set("priceFilter", event.target.value);
  }
});

Template.sortProduct.events({
  "change #sort-value": function (event) {
    Session.set("sortValue", event.target.value);
  }
});
