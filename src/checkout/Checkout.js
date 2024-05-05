/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import AddressForm from "./AddressForm";
import Review from "./Review";
import Web3 from "web3";
import { useEffect, useState, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../utils/load-contract";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";

import { toast } from "react-toastify";

const notifyCartEmpty = () =>
  //toast pop up of attempted checkout with no items in cart
  toast.error(`Nothing in cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  });

const notifyTransactionFail = () =>
  //toast pop up of attempted checkout with no items in cart
  toast.error(`Transaction failed!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  });

  const notifyTransactionSuccess = () =>
  //toast pop up of attempted checkout with no items in cart
  toast.error(`Transaction has been completed successfully!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  });

function Copyright() {
  //footer copyright
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Simple Trade
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Billing address", "Review your order"];

export default function Checkout() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    secondary: "",
    saveAddress: false,
  });

  //console.log(formData);

  function handleChange(event) {
    const { type, name, value, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function getStepContent(step) {
    //return page depending on which step
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return <Review formData={formData} accounts={accounts} />;
      default:
        throw new Error("Unknown step");
    }
  }
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const { clearCart, getCartTotal, cartItems } = useContext(CartContext);
  const [accounts, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (_) => window.location.reload());
  };

  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload]);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("SimpleTrade", provider);
        setAccountListener(provider);
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isProviderLoaded: true }));
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  const addTransaction = useCallback(
    async (addr, nam, em) => {
      const { contract, web3 } = web3Api;
      const date = new Date().toISOString().slice(0, 10);
      var titles = cartItems.reduce(
        (accumulator, item) =>
          accumulator + item.title + " x " + item.quantity + ", ",
        " "
      );

      const total = getCartTotal();

      try {
        await contract.addTransaction(
          titles,
          total.toString(),
          date,
          nam,
          addr,
          em,
          {
            from: accounts,
            value: web3.utils.toWei(getCartTotal(), "ether"),
          }
        );
        notifyTransactionSuccess();
        clearCart(); //clear cart on successful checkout
      } catch (error) {
        notifyTransactionFail();
      }

      reloadEffect();
    },
    [web3Api, accounts, reloadEffect]
  );

  const handleNext = () => {
    if (getCartTotal() !== 0) {
      setActiveStep(activeStep + 1); //move to next page
    } else {
      notifyCartEmpty(); //toast popup if try to checkout with 0 items
    }
    if (activeStep === 1) {
      const addr = `${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.state}, ${formData.zip}, ${formData.country}`;
      const nam = `${formData.firstName} ${formData.lastName}`;
      const em = `${formData.email}`;

      addTransaction(addr, nam, em); //add transaction to blockchain
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1); //go back one page
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, Please complete the transaction in metamask.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  disabled={!accounts}
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1, backgroundColor: "black" }}
                >
                  {/* {activeStep === steps.length - 1 ? "Place order" : "Next"} */}
                  {!accounts ? (
                    <span>Connect to MetaMask to checkout</span>
                  ) : (
                    <>
                      {" "}
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </>
                  )}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
