import { objectType } from "nexus";

export const sensor = objectType({
  name: "Sensor",
  definition: t => {
    t.string("code");
    t.string("name");
    t.id("id");
    t.list.field("children", { type: "Equipment" });
    t.list.field("equipmentClasses", { type: "EquipmentClass" });
    t.list.field("equipmentProperties", { type: "EquipmentProperty" });
    t.int("flow");
  }
});

export const IGNORE = "default";
