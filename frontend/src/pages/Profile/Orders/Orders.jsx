import useFetch from "../../../hooks/useFetch.jsx";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import css from "./Orders.module.css"
import OrderCard from "../../../components/OrderCard/OrderCard.jsx";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Orders = () => {
  const {token} = useContext(AuthContext);
  const {data: Orders} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/order/get`, {
    method: "GET",
    headers: {
      token
    }
  });
  return (
      <div className={css.wrapper}>
        {Orders?.data?.map((order, index) => (
            <div key={index} className={css.card}>
              <div className={css.orderNumber}>
                Order ID number is {order.orderNumber}
              </div>
              <div className={css.information}>
                <div className={css.sections}>
                  <div className={css.left}>
                    Date:
                  </div>
                  <div className={css.right}>
                    {order.date}
                  </div>
                </div>
                <div className={css.sections}>
                  <div className={css.left}>
                    Order value:
                  </div>
                  <div className={css.right}>
                    ${order.totalPrice}
                  </div>
                </div>
              </div>
              <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                  <Typography>{order.orders.length > 1 ? `${order.orders.length} products` : `${order.orders.length} product`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OrderCard orders={order.orders} />
                </AccordionDetails>
              </Accordion>
            </div>
        ))}
      </div>
  )
}

export default Orders;