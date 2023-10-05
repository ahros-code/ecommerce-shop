import css from "./Inquiry.module.css";
import {Link} from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Inquiry = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
      <div className={css.wrapper}>
        <div className={css.sections}>
          <div className={css.leftSection}>
            <h2 className={css.leftSectionTitle}>An easy way to send requests to all suppliers</h2>
            <p className={css.leftSectionText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div className={css.rightSection}>
            <h4 className={css.title}>
              Send quote to suppliers
            </h4>
            <div className={css.inputsWrapper}>
              <input type="text" className={css.inpClassic} placeholder={"What item you need?"}/>
              <textarea className={css.inpArea} contentEditable={"false"} placeholder={"Type more details"}/>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <button type={"submit"} onClick={handleClick} className={css.btn}>Send inquiry</button>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Inquiry sent successfully!
                  </Alert>
                </Snackbar>
              </Stack>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Inquiry;