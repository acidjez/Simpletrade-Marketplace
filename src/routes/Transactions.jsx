/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import Web3 from "web3";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../utils/load-contract";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Transactions() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
  });

  const [balance, setBalance] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [customer, setCustomer] = useState([]);

  const canConnectToContract = accounts && web3Api.contract;

  const [shouldReload, reload] = useState(false);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (_) => window.location.reload());
  };

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
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const ballance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(ballance, "ether"));
    };

    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  useEffect(() => {
    const getTransactions = async () => {
      const { contract } = web3Api;
      const transactions = await contract.getTransactions(accounts);
      const customer = await contract.getCustomer(accounts);

      setTransactions(transactions);
      setCustomer(customer);
    };
    canConnectToContract && getTransactions();
  }, [canConnectToContract, shouldReload]);

  return (
    <>
      <Typography align="center">
        <div>
          {web3Api.isProviderLoaded ? (
            <div>
              {accounts ? (
                <>
                  <div>
                    <br/>
                    Smart contract balance: <strong>{balance}. </strong>
                  </div>
                  <div>
                    {" "}
                    <strong>Connected account: {accounts}</strong>
                  </div>
                  <div>
                    Customer Transactions:{" "}
                    <strong>{transactions.length}. </strong>
                    <br/>
                    <br/>
                    {customer.name ? (<span>Name : {customer.name} <br/></span> ) : <></> }
                    {customer.addr ? (<span>Address: {customer.addr}<br/></span> ) : <></> }
                    {customer.email ? (<span>Email: {customer.email} <br/> </span> ) : <></> }
                    <br />
                    <strong>Purchased Items:</strong>
                  </div>
                </>
              ) : !web3Api.provider ? (
                <>
                  <div>
                    {" "}
                    Please install MetaMask to make and view transactions{" "}
                  </div>
                </>
              ) : (
                <>
                  <div>Connect to Metamask to view transactions </div>

                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      web3Api.provider.request({
                        method: "eth_requestAccounts",
                      });
                    }}
                  >
                    Connect
                  </button>
                </>
              )}
            </div>
          ) : (
            <div>Looking for web3...</div>
          )}
        </div>
      </Typography>

      <Typography align="center">
        <div>
          <br />
        </div>
    
        <Box sx={{ flexGrow: 10 }}>
          <Grid container spacing={4}>
            {transactions.map((item) => (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 1,
                    margin: "auto",
                    maxWidth: 400,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <div>
                    <br />
                    {item.title}
                    <br />
                    ETH: {item.price} <br />
                    DATE: {item.date}
                    <br />
                    <br />
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Typography>
    </>
  );
}
