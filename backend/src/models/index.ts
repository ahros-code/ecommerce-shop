import {ProductModel} from "./Product.model";
import {CategoryModel} from "./Category.model";
import {BrandModel} from "./Brand.model";
import {UserModel} from "./User.model";
import {ConfirmCodeModel} from "./ConfirmCodeModel";
import {ShopModel} from "./Shop.model";
import {ReviewModel} from "./Review.model";
import {ImageModel} from "./Image.model";
import {CartModel} from "./cart.model";
import {SuppliersModel} from "./suppliers.model";
import {DiscountModel} from "./Discount.model";
import {OrderModel} from "./Order.model";

!async function () {
  CategoryModel.hasMany(ProductModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ProductModel.belongsTo(CategoryModel, {
    foreignKey: {
      allowNull: false
    }
  });

  CategoryModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  })

  ProductModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  })

  ProductModel.belongsTo(BrandModel, {
    foreignKey: {
      allowNull: false
    }
  });
  BrandModel.hasOne(ProductModel, {
    foreignKey: {
      allowNull: false
    }
  });

  BrandModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  });

  ShopModel.hasMany(ProductModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ProductModel.belongsTo(ShopModel, {
    foreignKey: {
      allowNull: false
    }
  });

  ReviewModel.belongsTo(UserModel);

  ProductModel.belongsTo(ReviewModel)

  ShopModel.hasMany(ReviewModel);

  ShopModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  })

  CartModel.belongsTo(ProductModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ProductModel.hasMany(CartModel, {
    foreignKey: {
      allowNull: false
    }
  });

  UserModel.hasOne(CartModel, {
    foreignKey: {
      allowNull: false
    }
  })
  CartModel.belongsTo(UserModel, {
    foreignKey: {
      allowNull: false
    }
  });

  OrderModel.belongsTo(ProductModel, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  });

  ProductModel.hasMany(
      OrderModel,
      {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      }
  );


  UserModel.hasOne(OrderModel, {
    foreignKey: {
      allowNull: false
    }
  });
  OrderModel.belongsTo(UserModel, {
    foreignKey: {
      allowNull: false
    }
  });

  UserModel.hasOne(CartModel, {
    foreignKey: {
      allowNull: false
    }
  });
  CartModel.belongsTo(UserModel, {
    foreignKey: {
      allowNull: false
    }
  });

  SuppliersModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  })

  DiscountModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  })

  UserModel.hasOne(ShopModel);
  ShopModel.belongsTo(UserModel);

  await CartModel.sync({alter: true});
  await OrderModel.sync({alter: true})
  await SuppliersModel.sync({alter: true})
  await ProductModel.sync({alter: true})
  await ShopModel.sync({alter: true})
  await ReviewModel.sync({alter: true})
  await BrandModel.sync({alter: true})
  await CategoryModel.sync({alter: true});
  await UserModel.sync({alter: true})
  await ConfirmCodeModel.sync({alter: true});
  await DiscountModel.sync({alter: true});
  await ImageModel.sync({alter: true})
}()

export {
  ProductModel,
  CategoryModel,
  BrandModel,
  UserModel,
  ConfirmCodeModel,
  ShopModel,
  ImageModel,
  ReviewModel,
  SuppliersModel,
  CartModel,
  DiscountModel,
  OrderModel
}