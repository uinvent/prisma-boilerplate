import { prisma, Equipment } from "./generated/prisma-client";
import datamodelInfo from "./generated/nexus-prisma";
import * as path from "path";
import { stringArg, idArg } from "nexus";
import { prismaObjectType, makePrismaSchema } from "nexus-prisma";
import { GraphQLServer } from "graphql-yoga";
import { sensor } from "./types/sensor";
import { equal } from "assert";

const Query = prismaObjectType({
  name: "Query",
  definition(t) {
    t.prismaFields(["equipment", "equipments"]);
    // custom fetchEquipment Query
    t.list.field("sensors", {
      type: "Sensor",
      resolve: async (_, args, ctx) => {
        debugger;
        const resp = await ctx.prisma.equipments({
          where: { equipmentClasses_some: { code: "sensor" } }
        });

        resp.forEach(element => {
          element.equipmentClasses = prisma.equipmentClasses({
            where: { equipments_some: { id: element.id } }
          });
        });

        return resp.map((eq: Equipment) => ({
          ...eq,
          flow: 2
        }));
      }
    });

    //   t.list.field("equipmentPropertiesByEquipment", {
    //     type: "EquipmentProperty",
    //     args: { code: stringArg() },
    //     resolve: (_, { id }, ctx) =>
    //       ctx.prisma.equipmentProperties({
    //         where: { equipmentProperties: { id } }
    //       })
    //   });
  }
});

const Mutation = prismaObjectType({
  name: "Mutation",
  definition(t) {
    t.prismaFields(["createEquipment", "deleteEquipmentProperty"]);
    t.field("createSensor", {
      type: "Post",
      args: {
        name: stringArg(),
        code: stringArg()
      },
      resolve: (_, { name, code }, ctx) =>
        ctx.prisma.createEquipment({
          code,
          name
        })
    });
  }
});

const schema = makePrismaSchema({
  types: [Query, Mutation, sensor],

  prisma: {
    datamodelInfo,
    client: prisma
  },

  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  }
});

const server = new GraphQLServer({
  schema,
  context: { prisma }
});
server.start(() => console.log("Server is running on http://localhost:4000"));
