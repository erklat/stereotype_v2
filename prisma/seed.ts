import db, { Role } from "@/db/db";

const upsertUserData = async () => {
  await db.user.upsert({
    where: { email: "superadmin@dev.com" },
    update: {},
    create: {
      email: "superadmin@dev.com",
      name: "Super Admin",
      role: Role.SUPERADMIN,
      password: "5f4dcc3b5aa765d61d8327deb882cf99", // password
      active: true,
    },
  });

  await db.user.upsert({
    where: { email: "user@dev.com" },
    update: {},
    create: {
      email: "user@dev.com",
      name: "User",
      role: Role.USER,
      password: "5f4dcc3b5aa765d61d8327deb882cf99", // password
      active: true,
    },
  });
};

const upsertProductData = async () => {
  await db.product.create({
    data: {
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      category: "beauty",
      price: 9.99 * 100,
      discountPercentage: 7.17 * 100,
      rating: 4.94,
      stock: 5,
      tags: {
        connectOrCreate: [
          { where: { name: "beauty" }, create: { name: "beauty" } },
          { where: { name: "mascara" }, create: { name: "mascara" } },
        ],
      },
      brand: "Essence",
      sku: "RCH45Q1A",
      weight: 2,
      dimensions: {
        create: {
          width: 23.17,
          height: 14.43,
          depth: 28.01,
        },
      },
      warrantyInformation: "1 month warranty",
      shippingInformation: "Ships in 1 month",
      availabilityStatus: "Low Stock",
      returnPolicy: "30 days return policy",
      minimumOrderQuantity: 24,
      meta: {
        create: {
          barcode: "9164035109868",
          qrCode: "...",
        },
      },
      reviews: {
        create: [
          {
            rating: 2,
            comment: "Very unhappy with my purchase!",
            date: new Date("2024-05-23T08:56:21.618Z"),
            reviewerName: "John Doe",
            reviewerEmail: "john.doe@x.dummyjson.com",
          },
          {
            rating: 2,
            comment: "Not as described!",
            date: new Date("2024-05-23T08:56:21.618Z"),
            reviewerName: "Nolan Gonzalez",
            reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Very satisfied!",
            date: new Date("2024-05-23T08:56:21.618Z"),
            reviewerName: "Scarlett Wright",
            reviewerEmail: "scarlett.wright@x.dummyjson.com",
          },
        ],
      },
      images: {
        create: [
          { url: "image1.jpg" },
          { url: "image2.jpg" },
          { url: "image3.jpg" },
        ],
      },
      thumbnail: "thumbnail.jpg",
    },
  });
};

async function main() {
  await upsertUserData();
  await upsertProductData();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
