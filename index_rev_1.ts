import { prisma, Equipment } from "./generated/prisma-client";
import * as faker from "faker";
import { create } from "domain";

// A `main` function so that we can use async/await
async function main() {
  //await delete_equipment_exercise();
  // Create a new user called `Alice`
  // const newUser = await prisma.createUser({ name: "Alice" });
  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  // Read all users from the database and print them to the console
  // const allUsers = await prisma.users();
  // console.log(allUsers);
  //const user = await prisma.user({ id: '__USER_ID__' })
  // const usersCalledAlice = await prisma.users({
  //   where: {
  //     name: 'Alice',
  //   },
  // })
  // const updatedUser = await prisma.updateUser({
  //   where: { id: '__USER_ID__' },
  //   data: { name: 'Bob' },
  // })
  // const deletedUser = await prisma.deleteUser({ id: '__USER_ID__' })
}

async function update_equipment_exercise() {
  const updatedEquipment: Equipment = await prisma.updateEquipment({
    data: {
      name: "ADMIN"
    },
    where: {
      id: "ck1ivoddg00fl0748y1y0ae23"
    }
  });
  console.log(updatedEquipment);
}

async function delete_equipment_exercise() {
  const deletedEquipment: Equipment = await prisma.deleteEquipment({
    id: "ck1ivoddg00fl0748y1y0ae23"
  });
  console.log(deletedEquipment);
}

async function get_equipment_exercise() {
  const equipments_classes = await prisma.equipmentClasses({
    where: {
      AND: [
        {
          equipments_some: { code: "Walter" },
          equipmentClassProperties_some: {
            code: "Smith"
          }
        }
      ]
    }
  });
  console.log(equipments_classes);
}

async function save_random_equipments_exercies() {
  //Create New Equipment_Class
  const equipment_classes = await prisma.createEquipmentClass({
    name: faker.name.firstName(),
    code: faker.name.lastName(),
    equipmentClassProperties: {
      create: [
        {
          name: faker.name.firstName(),
          code: faker.name.lastName()
        },
        {
          name: faker.name.firstName(),
          code: faker.name.lastName()
        }
      ]
    },
    equipments: {
      create: [
        {
          name: faker.name.firstName(),
          code: faker.name.lastName(),
          equipmentProperties: {
            create: [
              {
                name: faker.name.firstName(),
                code: faker.name.lastName()
              },
              {
                name: faker.name.firstName(),
                code: faker.name.lastName()
              }
            ]
          }
        }
      ]
    }
  });
  console.log(equipment_classes);
}
main().catch(e => console.error(e));
