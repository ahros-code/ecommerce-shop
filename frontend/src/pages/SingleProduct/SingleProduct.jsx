import css from "./SingleProduct.module.css";
import {Link, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import tickIcon from "../../assets/images/tick.svg"
import React from "react";
import {Rating} from "@mui/material";
import shopCartIcon from "../../assets/images/shopCart.svg"
import safe from '../../assets/images/safe.svg'
import world from "../../assets/images/world.svg"
import country from "../../assets/images/country.png"

const SingleProduct = () => {
  const {id} = useParams();
  const {data} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/products/${id}`)
  return (
      <div className={css.wrapper}>
        <div className={css.imageSection}>
          <img src={`${import.meta.env.VITE_BACK_URL}${data?.data?.ImageModel?.link}`}/>
        </div>
        <div className={css.infoSection}>
          <>
            <p>{data?.data?.inStock ? <div className={css.ticked}>
              <img src={tickIcon} alt="tick"/>
              <p className={css.inStockText}>In stock</p>
            </div> : <div className={css.ticked}>
              <img src={tickIcon} alt="tick"/>
              <p className={css.inStockText}> not in stock</p>
            </div>}</p>
          </>
          <h3 className={css.title}>{data?.data?.name}</h3>
          <div className={css.inline}>
            <Rating
                value={Number(data?.data?.rating)}
                readOnly
            />
            <div className={css.sold}>
              <img src={shopCartIcon} alt="cart icon" />
              <p className={css.soldNumber}>{data?.data?.sold} sold</p>
            </div>
          </div>
          <div className={css.price}>
            <h5 className={css.discountPrice}>${data?.data?.discountPrice}</h5>
            <h5 className={css.priceWithNotDiscount}>${data?.data?.price}</h5>
          </div>
          <div className={css.priceInfoSection}>
            <div className={css.info}>
              <p className={css.itemKey}>Price:</p>
              <p className={css.itemValue}>Negotiable</p>
            </div>
          </div>
          <div className={css.materialInfoSection}>
            <div className={css.info}>
              <p className={css.itemKey}>Design:</p>
              <p className={css.itemValue}>{data?.data?.design}</p>
            </div>
            <div className={css.info}>
              <p className={css.itemKey}>Model:</p>
              <p className={css.itemValue}>{data?.data?.model}</p>
            </div>
          </div>
          <div className={css.materialWarrantyInfoSection}>
            <div className={css.info}>
              <p className={css.itemKey}>Warranty:</p>
              <p className={css.itemValue}>{data?.data?.warranty} years full warranty </p>
            </div>
            <div className={css.info}>
              <p className={css.itemKey}>Protection:</p>
              <p className={css.itemValue}>Refund Policy</p>
            </div>
          </div>
        </div>
        <div className={css.shopInfoSection}>
          <div className={css.nameAndImage}>
            <div className={css.shopImage}>
              <img src={`${import.meta.env.VITE_BACK_URL}${data?.data?.ImageModel.link}`} alt={"shop's image"} className={css.image} />
            </div>
            <div className={css.shopName}>{data?.data?.ShopModel.name}</div>
          </div>
          <div className={css.shopItems}>
            <div className={css.items}>
              <div className={css.countryImage}>
                <img src={country} alt="icon"/>
              </div>
              <div className={css.countryName}>{data?.data?.ShopModel?.country}</div>
            </div>
            <div className={css.items}>
              <div className={css.countryImage}>
                <img src={safe} alt="icon"/>
              </div>
              <div className={css.countryName}>Verified Seller</div>
            </div>
            <div className={css.items}>
              <div className={css.countryImage}>
                <img src={world} alt="icon" />
              </div>
              <div className={css.countryName}>Worldwide shipping</div>
            </div>
          </div>
          <div className={css.btns}>
            <Link to={`/inquiry/shop/${data?.data?.ShopModel.id}`} className={css.firstBtn}>
             <p>
               Send inquiry
             </p>
            </Link>
            <Link to={`http://kun.uz`} className={css.secondBtn}>
              <p>
                Seller’s profile
              </p>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default SingleProduct