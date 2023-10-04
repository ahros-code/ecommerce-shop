import {ProductModel} from "./Product.model";
import {CategoryModel} from "./Category.model";
import {BrandModel} from "./Brand.model";
import {UserModel} from "./User.model";
import {ConfirmCodeModel} from "./ConfirmCodeModel";
import {SellerModel} from "./Seller.model";
import {ShopModel} from "./Shop.model";
import {ReviewModel} from "./Review.model";
import {ImageModel} from "./Image.model";
import {CartModel} from "./cart.model";
import {SuppliersModel} from "./suppliers.model";
import {DiscountModel} from "./Discount.model";
import {OrderModel} from "./Order.model";
import OrderRouter from "../routers/order.router";

!async function (){
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

  SellerModel.hasOne(ShopModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ShopModel.belongsTo(SellerModel, {
    foreignKey: {
      allowNull: false
    }
  });

  SellerModel.belongsTo(ImageModel, {
    foreignKey: {
      allowNull: false
    }
  })

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

  UserModel.hasMany(ReviewModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ReviewModel.belongsTo(UserModel, {
    foreignKey: {
      allowNull: false
    }
  });

  ReviewModel.belongsTo(ProductModel, {
    foreignKey: {
      allowNull: false
    }
  });

  ShopModel.hasMany(ReviewModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ReviewModel.belongsTo(ShopModel, {
    foreignKey: {
      allowNull: false
    }
  });

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
  });
  CartModel.belongsTo(UserModel, {
    foreignKey: {
      allowNull: false
    }
  });

  OrderModel.belongsTo(ProductModel, {
    foreignKey: {
      allowNull: false
    }
  });
  ProductModel.hasMany(OrderModel, {
    foreignKey: {
      allowNull: false
    }
  });

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

  await CartModel.sync({alter: true});
  await OrderModel.sync({alter: true})
  await SuppliersModel.sync({alter: true})
  await ProductModel.sync({alter: true})
  await ShopModel.sync({alter: true})
  await SellerModel.sync({alter: true})
  await ReviewModel.sync({alter: true})
  await BrandModel.sync({alter: true})
  await CategoryModel.sync({alter: true});
  await UserModel.sync({alter: true})
  await ConfirmCodeModel.sync({alter: true});
  await DiscountModel.sync({alter: true});
  await ImageModel.sync({alter: true})
}()

export {ProductModel, CategoryModel, BrandModel, UserModel, ConfirmCodeModel, SellerModel, ShopModel, ImageModel, ReviewModel, SuppliersModel, CartModel, DiscountModel, OrderModel}